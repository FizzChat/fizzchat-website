'use client';

import { useSitePrefs } from './prefs';

/**
 * 键盘用户的「跳到正文」链接（WCAG 2.4.1 Bypass Blocks）。
 * 平时用 sr-only 藏起来，拿到焦点才出现在左上角。
 */
export function SkipLink() {
  const { dict } = useSitePrefs();

  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:inline-flex focus:h-12 focus:items-center focus:rounded-ctl focus:bg-brand-solid focus:px-6 focus:text-button focus:font-semibold focus:text-on-brand"
    >
      {dict.a11y.skipToContent}
    </a>
  );
}
