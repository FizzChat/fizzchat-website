import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#08080B',
};

export const metadata: Metadata = {
  // 域名真源 = fizzchat.cc（app./api./adminapi. 全在该域下）。原为 fizzchat.app —— 那不是
  // 本项目的域名，导致 og:image 解析成 https://fizzchat.app/... 的死链，分享出去没有预览图。
  metadataBase: new URL('https://fizzchat.cc'),
  // 品牌名硬规则（specs/glossary.md）：中文一律「气泡」，英文一律「FizzChat」，
  // 禁止「FizzChat 气泡」这类中英拼接。
  title: '气泡 · 私密社交 IM',
  description: '气泡，专为小圈子打造的私密即时通讯。支持 Windows、Android、iOS，点击直接下载。',
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: '气泡',
    description: '私密社交 IM · 三端同步 · 极简设计',
    // 来源：specs/brand/social/og-1200x630.png（品牌资产包，勿手改）
    images: [{ url: '/og.png', width: 1200, height: 630, alt: '气泡 FizzChat' }],
  },
};

const TELEGRAM_INIT = `
(function(){
  function apply(){
    var tg = window.Telegram && window.Telegram.WebApp;
    if(!tg) return;
    try { tg.ready(); } catch(e){}
    try { tg.expand(); } catch(e){}
    try { tg.setHeaderColor('#08080B'); } catch(e){}
    try { tg.setBackgroundColor('#08080B'); } catch(e){}
  }
  if (window.Telegram && window.Telegram.WebApp) apply();
  else window.addEventListener('load', apply);
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className={GeistSans.variable}>
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js" async />
        <script dangerouslySetInnerHTML={{ __html: TELEGRAM_INIT }} />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
