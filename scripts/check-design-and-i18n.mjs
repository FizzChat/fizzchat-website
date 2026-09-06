/**
 * 官网核心逻辑自检（`npm test`）—— 不需要浏览器、不需要 next build，几秒钟跑完。
 *
 * 管三件在这个站上最容易悄悄坏掉的事：
 *   ① i18n 键树：zh / en 结构必须完全对齐，不许缺键、空串、英文里混 CJK、
 *      也不许出现「FizzChat 气泡」这种被 glossary 明令禁止的中英拼接。
 *   ② 组件引用的字典路径：tsx 里每一个 dict.x.y 都必须在两种语言里真的存在
 *      （TS 已经查过类型，但 i18n 是数据，键写错了类型层不一定拦得住）。
 *   ③ 设计系统对比度：把 globals.css 里两套主题的 CSS 变量取出来，
 *      按页面【实际用到的】前景/背景配对算 WCAG 2.1 对比度，低于阈值直接失败。
 *      深色主题的值是派生的，没有这道闸就只能靠人眼看。
 *
 * 退出码 0 = 全绿；任何一条不过都会打印具体哪一条并以 1 退出。
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, readdirSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const failures = [];

function check(name, ok, detail) {
  if (ok) {
    console.log(`  ok   ${name}`);
  } else {
    console.log(`  FAIL ${name}${detail ? ' — ' + detail : ''}`);
    failures.push(name);
  }
}

// ── 把 lib/i18n.ts 编成 JS 再 import：不引入任何运行时依赖 ────────────────────
const outDir = mkdtempSync(join(tmpdir(), 'fizz-i18n-'));
execFileSync(
  process.execPath,
  [
    join(ROOT, 'node_modules', 'typescript', 'bin', 'tsc'),
    join(ROOT, 'lib', 'i18n.ts'),
    '--outDir',
    outDir,
    '--module',
    'esnext',
    '--target',
    'es2020',
    '--moduleResolution',
    'bundler',
  ],
  { stdio: 'inherit' },
);
const { DICTS } = await import(pathToFileURL(join(outDir, 'i18n.js')).href);
rmSync(outDir, { recursive: true, force: true });

// ── ① i18n 键树 ─────────────────────────────────────────────────────────────
console.log('\n[1] i18n 键树');

function keyPaths(node, prefix = '') {
  if (Array.isArray(node)) {
    return node.flatMap((item, i) => keyPaths(item, `${prefix}[${i}]`));
  }
  if (node && typeof node === 'object') {
    return Object.entries(node).flatMap(([k, v]) => keyPaths(v, prefix ? `${prefix}.${k}` : k));
  }
  return [prefix];
}

const zhPaths = keyPaths(DICTS.zh);
const enPaths = keyPaths(DICTS.en);
const onlyZh = zhPaths.filter((p) => !enPaths.includes(p));
const onlyEn = enPaths.filter((p) => !zhPaths.includes(p));
check('zh / en 键树完全对齐', onlyZh.length === 0 && onlyEn.length === 0,
  `只在 zh: ${onlyZh.slice(0, 5)} / 只在 en: ${onlyEn.slice(0, 5)}`);

function readPath(dict, path) {
  return path.split(/\.|\[|\]/).filter(Boolean).reduce((acc, k) => (acc == null ? acc : acc[k]), dict);
}

const emptyValues = ['zh', 'en'].flatMap((lang) =>
  keyPaths(DICTS[lang])
    .filter((p) => {
      const v = readPath(DICTS[lang], p);
      return typeof v !== 'string' || v.trim() === '';
    })
    .map((p) => `${lang}.${p}`),
);
check('没有空文案 / 非字符串值', emptyValues.length === 0, emptyValues.slice(0, 5).join(', '));

const CJK = /[　-〿一-鿿＀-￯]/;
const cjkInEn = enPaths.filter((p) => CJK.test(String(readPath(DICTS.en, p))) && p !== 'langLabel');
check('英文文案里没有 CJK 残留（langLabel 除外，它显示的是目标语言名）',
  cjkInEn.length === 0, cjkInEn.slice(0, 5).join(', '));

const allText = ['zh', 'en'].flatMap((l) => keyPaths(DICTS[l]).map((p) => String(readPath(DICTS[l], p))));
check('无「FizzChat 气泡」中英拼接（glossary 硬规则）',
  !allText.some((t) => /FizzChat\s*气泡/.test(t)));
check('无裸 key 泄漏到文案里', !allText.some((t) => /^[a-z]+\.[a-z]+\.[a-z]/i.test(t)));

check('三点价值两种语言都是 3 条',
  DICTS.zh.values.items.length === 3 && DICTS.en.values.items.length === 3);
check('隐私承诺两种语言都是 4 条（对应 CLAUDE.md 硬约束 5）',
  DICTS.zh.promise.items.length === 4 && DICTS.en.promise.items.length === 4);
check('法务邮箱两种语言一致且未被改动',
  DICTS.zh.footer.email === 'privacy@fizzchat.app' &&
  DICTS.en.footer.email === 'privacy@fizzchat.app');

// ── ② 组件里引用的字典路径都存在 ───────────────────────────────────────────
console.log('\n[2] 组件引用的字典路径');

function walkFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walkFiles(full) : [full];
  });
}
const tsxFiles = walkFiles(join(ROOT, 'app')).filter((f) => f.endsWith('.tsx'));

const referenced = new Set();
for (const file of tsxFiles) {
  const src = readFileSync(file, 'utf8');
  for (const m of src.matchAll(/\bdict\.([A-Za-z0-9_.]+)/g)) {
    const path = m[1].replace(/\.$/, '');
    // 只校验落到叶子字符串的引用；map/length 这类是对容器本身取值
    if (!/\.(map|length|items|filter|slice|join)$/.test(path)) referenced.add(path);
  }
}
const badRefs = [...referenced].filter((p) => {
  const zv = readPath(DICTS.zh, p);
  const ev = readPath(DICTS.en, p);
  return zv === undefined || ev === undefined;
});
check(`tsx 里 ${referenced.size} 个 dict 路径在两种语言里都存在`,
  badRefs.length === 0, badRefs.join(', '));

// ── ③ 设计系统对比度 ────────────────────────────────────────────────────────
console.log('\n[3] 设计系统对比度（WCAG 2.1）');

const css = readFileSync(join(ROOT, 'app', 'globals.css'), 'utf8');
function themeVars(selector) {
  const block = css.slice(css.indexOf(selector + ' {'));
  const body = block.slice(0, block.indexOf('}'));
  const vars = {};
  for (const m of body.matchAll(/--(w-[a-z0-9-]+):\s*([^;]+);/g)) vars[m[1]] = m[2].trim();
  return vars;
}
const THEMES = { light: themeVars(':root'), dark: themeVars('.dark') };

function parseColor(v) {
  const hex = v.match(/^#([0-9a-f]{6})$/i);
  if (hex) {
    const n = parseInt(hex[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255, 1];
  }
  const rgba = v.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)/);
  if (rgba) return [+rgba[1], +rgba[2], +rgba[3], rgba[4] === undefined ? 1 : +rgba[4]];
  throw new Error('无法解析颜色: ' + v);
}
/** 半透明色先合成到底色上再算 —— 深色主题的 brand-tint 就是半透明的 */
function flatten(fg, bg) {
  const a = fg[3];
  return [0, 1, 2].map((i) => Math.round(fg[i] * a + bg[i] * (1 - a))).concat(1);
}
function luminance([r, g, b]) {
  const s = [r, g, b].map((c) => {
    const x = c / 255;
    return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * s[0] + 0.7152 * s[1] + 0.0722 * s[2];
}
function contrast(theme, fgVar, bgVar, baseVar = 'w-canvas') {
  const base = parseColor(THEMES[theme][baseVar]);
  const bg = flatten(parseColor(THEMES[theme][bgVar]), base);
  const fg = flatten(parseColor(THEMES[theme][fgVar]), bg);
  const [l1, l2] = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
  return Math.round(((l1 + 0.05) / (l2 + 0.05)) * 100) / 100;
}

// 配对表 = 页面里【真的这么用】的组合；阈值：正文 4.5、非文本 UI（焦点边/圆点）3
const PAIRS = [
  ['w-ink', 'w-canvas', 4.5, '标题/正文 在画布上'],
  ['w-ink', 'w-raised', 4.5, '标题/正文 在交替分区上'],
  ['w-ink', 'w-surface', 4.5, '卡片标题'],
  ['w-ink-2', 'w-canvas', 4.5, '说明文字 在画布上'],
  ['w-ink-2', 'w-raised', 4.5, '说明文字 在交替分区上'],
  ['w-ink-2', 'w-surface', 4.5, '卡片正文'],
  ['w-ink-2', 'w-surface-hover', 4.5, '「暂未开放」徽标文字'],
  ['w-brand-text', 'w-canvas', 4.5, '链接/绿松石文字 在画布上'],
  ['w-brand-text', 'w-raised', 4.5, '链接 在交替分区上'],
  ['w-brand-text', 'w-surface', 4.5, '卡片内动作文字'],
  ['w-brand-text', 'w-brand-tint', 4.5, '徽标文字 / 图标块里的图标'],
  ['w-on-brand', 'w-brand-solid', 4.5, '主按钮文字（默认）'],
  ['w-on-brand', 'w-brand-solid-hover', 4.5, '主按钮文字（hover）'],
  ['w-on-brand', 'w-brand-solid-active', 4.5, '主按钮文字（active）'],
  ['w-brand', 'w-canvas', 3, '焦点边 / 点睛圆点（非文本，WCAG 1.4.11）'],
  ['w-brand', 'w-raised', 3, '点睛圆点 在交替分区上'],
  ['w-focus', 'w-canvas', 3, '焦点边框'],
];

for (const theme of ['light', 'dark']) {
  for (const [fg, bg, min, label] of PAIRS) {
    const ratio = contrast(theme, fg, bg);
    check(`${theme.padEnd(5)} ${label} = ${ratio}:1 (≥${min})`, ratio >= min);
  }
}

// ── 结论 ────────────────────────────────────────────────────────────────────
console.log('');
if (failures.length) {
  console.error(`✗ ${failures.length} 项未通过`);
  process.exit(1);
}
console.log('✓ 全部通过');
