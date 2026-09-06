import type { Config } from 'tailwindcss';

/**
 * 官网主题 —— 数值真源是 specs/design/tokens.json（v1.8.1），本文件只做「取用与映射」。
 *
 * 为什么是手写而不是 gen_tokens.py 生成：`specs/scripts/gen_tokens.py` 目前只有
 * `--target tailwind`（openim-electron-demo 的 fizz.* 别名）与 `--target flutter` 两个目标，
 * 没有 website 目标；官网又是独立仓、跑不到那条产物链上。所以这里逐项手抄 token 值并注明
 * 来源键名，改 token 时按 CLAUDE.md「设计 token 单一真源」三步流程改完真源后，回到本文件
 * 同步对应行（差异一眼可查，因为每行都写了 token 键）。
 *
 * 颜色一律走 CSS 变量（app/globals.css 的 :root / .dark 两套），这样同一套工具类在
 * 浅色/深色两个主题下都成立，不需要满屏 dark: 前缀，也满足 DESIGN.md §2「禁硬编码十六进制」。
 */
const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // ── 圆角：DESIGN.md §3 二元制写死，只有 8px 小元件 / 16px 大容器 / 胶囊。
    //    这里【整体替换】而不是 extend —— Tailwind 默认的 rounded-md(6)/xl(12)/3xl(24)
    //    一旦留着，写页面时随手一个 rounded-xl 就脱档了。删掉就写不出来。
    borderRadius: {
      none: '0px',
      ctl: '8px', // radius.sm —— 按钮/输入框/小标签/图标按钮
      card: '16px', // radius.lg —— 卡片/面板/图片容器（红线：不得 >16）
      full: '9999px', // radius.full —— 仅徽标/胶囊标签/头像
    },
    // ── 字阶：App 的 11 档（typography.scale）+ 官网专用 display 四档。
    //    App 字阶最大只到 sectionTitle 20/700，那是 IM 列表页的尺度，官网首屏撑不起来；
    //    d1–d4 是官网专用扩展档，沿用同一套构造规则（行高走 8px 网格、字重仍只在
    //    400/500/600/700 四档内、letterSpacing 一律 normal —— DESIGN.md §6
    //    「不模仿参考的极端负字距」，所以本文件不提供 tracking 工具类的自定义值）。
    fontSize: {
      d1: ['52px', { lineHeight: '60px' }], // 官网扩展：桌面首屏主标题
      d2: ['40px', { lineHeight: '48px' }], // 官网扩展：平板首屏 / 桌面分区标题
      d3: ['32px', { lineHeight: '40px' }], // 官网扩展：移动首屏 / 平板分区标题
      d4: ['24px', { lineHeight: '32px' }], // 官网扩展：移动分区标题
      section: ['20px', { lineHeight: '28px' }], // typography.scale.sectionTitle
      title: ['16px', { lineHeight: '24px' }], // typography.scale.listTitle / blockTitle
      lead: ['15px', { lineHeight: '23px' }], // typography.scale.messageBody
      button: ['15px', { lineHeight: '20px' }], // typography.scale.buttonLabel
      body: ['14px', { lineHeight: '22px' }], // typography.scale.bodyText
      sub: ['13px', { lineHeight: '18px' }], // typography.scale.listSubtitle
      caption: ['12px', { lineHeight: '16px' }], // typography.scale.timestamp / badge
    },
    extend: {
      colors: {
        // 值见 app/globals.css；括号内是 tokens.json 里的来源键。
        canvas: 'var(--w-canvas)', // color.bg.page
        raised: 'var(--w-raised)', // color.bg.warm —— 交替分区底
        surface: 'var(--w-surface)', // color.bg.page —— 卡片面
        'surface-hover': 'var(--w-surface-hover)', // color.bg.hover
        line: 'var(--w-line)', // color.border.default（耳语边框）
        'line-strong': 'var(--w-line-strong)', // color.border.strong
        ink: 'var(--w-ink)', // color.text.primary
        'ink-2': 'var(--w-ink-2)', // color.text.secondary
        'ink-3': 'var(--w-ink-3)', // color.text.tertiary（仅装饰，不承载正文）
        brand: 'var(--w-brand)', // color.brand.teal500 —— 点睛/焦点/非文本
        'brand-text': 'var(--w-brand-text)', // color.brand.teal700 —— 白底上的绿松石文字
        'brand-solid': 'var(--w-brand-solid)', // color.brand.teal600 —— 承载白字的面
        'brand-solid-hover': 'var(--w-brand-solid-hover)', // color.brand.teal700
        'brand-solid-active': 'var(--w-brand-solid-active)', // color.brand.teal800
        'brand-tint': 'var(--w-brand-tint)', // color.brand.teal050 —— 徽标底/图标底
        'on-brand': 'var(--w-on-brand)', // color.text.onBrand
      },
      fontFamily: {
        // typography.fontFamily.base —— DESIGN.md §17 明确禁止引入 Inter/Roboto 类
        // 网络字体做主字体，用系统字体栈保证 CJK 字形亲切与零字体请求。
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'PingFang SC',
          'Helvetica Neue',
          'Microsoft YaHei',
          'sans-serif',
        ],
      },
      maxWidth: {
        // 官网专用布局常量：tokens.json 的 size.layout* 描述的是 IM 三栏壳层，
        // 没有「营销页内容列宽」这一档，故在此登记，不回灌 tokens.json（那是三端 App 真源）。
        site: '1024px', // 首页/页脚内容列上限
        prose: '640px', // size.layoutContentColumnMax —— 长文正文列（法务页、段落引文）
      },
      transitionDuration: {
        DEFAULT: '150ms', // motion.duration.default
      },
      boxShadow: {
        // DESIGN.md §4：静态层级一律靠背景明度分层，不用投影；投影只留给焦点环。
        focus: '0 0 0 3px var(--w-focus-ring)', // elevation.focusRing
      },
    },
  },
  plugins: [],
};

export default config;
