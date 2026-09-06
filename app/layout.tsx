import type { Metadata, Viewport } from 'next';
import { SITE_URL } from '@/lib/site-url';
import { THEME_COLOR } from '@/lib/theme-colors';
import { SitePrefsProvider } from './_components/prefs';
import { SkipLink } from './_components/skip-link';
import './globals.css';

export const viewport: Viewport = {
  // 跟随系统外观给浏览器 UI 上色。手动切换外观时不改这个 meta —— 它影响的是
  // 浏览器地址栏/状态栏，跟着系统走比跟着站内开关走更不容易与系统 UI 打架。
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: THEME_COLOR.light },
    { media: '(prefers-color-scheme: dark)', color: THEME_COLOR.dark },
  ],
};

export const metadata: Metadata = {
  // 托管现状：Vercel 自动部署，fizzchat.cc 尚未绑定（见 lib/site-url.ts 顶部说明）。
  // 不能写死 'https://fizzchat.cc' —— 绑定前 og:image/canonical 会指向解析不到的死链。
  // 绑好域名后只需在 Vercel 项目设置加 NEXT_PUBLIC_SITE_URL=https://fizzchat.cc，代码不用改。
  metadataBase: new URL(SITE_URL),
  // 品牌名硬规则（specs/glossary.md）：中文一律「气泡」，英文一律「FizzChat」，
  // 禁止「FizzChat 气泡」这类中英拼接。静态导出只有一份 HTML，默认语言取中文。
  title: '气泡 · 和熟人说话的地方',
  description:
    '气泡是给熟人用的私密社交软件：邀请才进得来，消息不外传，Windows、Android、iOS 三端同步。',
  icons: {
    icon: [{ url: '/icon.png', type: 'image/png', sizes: '512x512' }],
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: '气泡',
    description: '和熟人说话的地方 · 邀请制 · 三端同步',
    // 来源：specs/brand/social/og-1200x630.png（品牌资产包，勿手改）
    images: [{ url: '/og.png', width: 1200, height: 630, alt: '气泡 FizzChat' }],
  },
};

/**
 * 在解析阶段（早于任何绘制、早于 React 水合）就把外观与语言写到 <html> 上：
 *   · 外观：读 localStorage['fizz-theme']，没存过就跟随系统 prefers-color-scheme。
 *     不这么做就会先闪一帧浅色再变深色。
 *   · 语言：读 localStorage['lang']，没存过就看浏览器语言，只为把 lang 属性摆对
 *     （屏幕阅读器发音、CJK 字形选择都靠它）；文案本身仍由 React 渲染。
 * 整段包在 try 里：隐私模式下 localStorage 可能直接抛异常，抛了就用默认值，页面照常。
 */
const BOOT_SCRIPT = `
(function () {
  try {
    var root = document.documentElement;
    var theme = null;
    try { theme = window.localStorage.getItem('fizz-theme'); } catch (e) {}
    if (theme !== 'light' && theme !== 'dark') {
      theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark' : 'light';
    }
    if (theme === 'dark') root.classList.add('dark');
    root.style.colorScheme = theme;

    var lang = null;
    try { lang = window.localStorage.getItem('lang'); } catch (e) {}
    if (lang !== 'zh' && lang !== 'en') {
      lang = (navigator.language || '').toLowerCase().indexOf('zh') === 0 ? 'zh' : 'en';
    }
    root.lang = lang === 'zh' ? 'zh-CN' : 'en';
  } catch (e) {}
})();
`;

/**
 * Telegram 站内浏览器（Mini App 容器）会给页面注入自己的主题色，顶栏与页面底色对不上。
 * 这里把顶栏/底色设成本站当前实际生效的画布色 —— 值从 CSS 变量读，不在脚本里写死颜色。
 */
const TELEGRAM_INIT = `
(function () {
  function apply() {
    var tg = window.Telegram && window.Telegram.WebApp;
    if (!tg) return;
    var canvas = getComputedStyle(document.documentElement)
      .getPropertyValue('--w-canvas').trim();
    try { tg.ready(); } catch (e) {}
    try { tg.expand(); } catch (e) {}
    if (canvas) {
      try { tg.setHeaderColor(canvas); } catch (e) {}
      try { tg.setBackgroundColor(canvas); } catch (e) {}
    }
  }
  if (window.Telegram && window.Telegram.WebApp) apply();
  else window.addEventListener('load', apply);
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
        <script src="https://telegram.org/js/telegram-web-app.js" async />
        <script dangerouslySetInnerHTML={{ __html: TELEGRAM_INIT }} />
      </head>
      <body className="min-h-screen bg-canvas font-sans text-ink antialiased">
        <SitePrefsProvider>
          <SkipLink />
          {children}
        </SitePrefsProvider>
      </body>
    </html>
  );
}
