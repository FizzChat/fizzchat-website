import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className={GeistSans.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
