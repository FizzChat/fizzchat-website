import type { Metadata } from 'next';
import HomeClient from './home-client';

// 语言切换是客户端状态（localStorage），中英文共用同一个 URL，不是 /en 这种路径变体，
// 所以这里只需要一个自指向的 canonical，不需要按语言分 alternates。
export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function Home() {
  return <HomeClient />;
}
