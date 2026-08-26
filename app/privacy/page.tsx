import type { Metadata } from 'next';
import PrivacyClient from './privacy-client';

// next.config.js 开了 trailingSlash: true，站内链接与静态导出产物都是 /privacy/ 形式，
// canonical 与之保持一致。
export const metadata: Metadata = {
  alternates: { canonical: '/privacy/' },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
