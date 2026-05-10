import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#08080B',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://fizzchat.app'),
  title: 'FizzChat 气泡 · 私密社交 IM',
  description: 'FizzChat 气泡，专为小圈子打造的私密即时通讯。支持 Windows、Android、iOS，点击直接下载。',
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'FizzChat 气泡',
    description: '私密社交 IM · 三端同步 · 极简设计',
    images: ['/logo.png'],
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
