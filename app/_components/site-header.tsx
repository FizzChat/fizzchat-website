'use client';

import Link from 'next/link';
import { Languages, Moon, Sun } from 'lucide-react';
import { useSitePrefs } from './prefs';

/**
 * 顶栏。高度 56（tokens size.barTop），底部一条耳语边框，底色与页面画布同色 ——
 * DESIGN.md §4「静态层级靠背景明度分层，不用投影」，所以这里没有毛玻璃也没有阴影。
 *
 * 触摸目标：图标按钮移动端 48×48（tokens size.touchTargetMin），桌面收到 40（controlMd）。
 */
const ICON_BUTTON_CLASS =
  'inline-flex h-12 w-12 items-center justify-center rounded-ctl text-ink-2 ' +
  'transition-colors duration-150 hover:bg-brand-tint hover:text-brand-text sm:h-10 sm:w-10';

export function SiteHeader({ showSectionNav = false }: { showSectionNav?: boolean }) {
  const { dict, theme, toggleTheme, toggleLang, mounted } = useSitePrefs();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas">
      <div className="mx-auto flex h-14 max-w-site items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          aria-label={dict.a11y.homeLink}
          className="inline-flex items-center rounded-ctl"
        >
          {/* 组合标来自品牌资产包（specs/brand/wordmark/…），本仓不许另画。
              浅色/深色各一份：浅色版是 teal600 标志 + Ink 字标，深色版整体反白。 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.svg"
            alt={dict.brand}
            className="h-6 w-auto object-contain dark:hidden sm:h-7"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-onDark.svg"
            alt=""
            aria-hidden="true"
            className="hidden h-6 w-auto object-contain dark:block sm:h-7"
          />
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          {showSectionNav && (
            <nav aria-label={dict.a11y.sectionNav} className="mr-1 hidden items-center gap-1 sm:flex">
              <a
                href="#promise"
                className="rounded-ctl px-3 py-2 text-body font-medium text-ink-2 transition-colors duration-150 hover:bg-brand-tint hover:text-brand-text"
              >
                {dict.nav.promise}
              </a>
              <a
                href="#download"
                className="rounded-ctl px-3 py-2 text-body font-medium text-ink-2 transition-colors duration-150 hover:bg-brand-tint hover:text-brand-text"
              >
                {dict.nav.download}
              </a>
            </nav>
          )}

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? dict.a11y.toLight : dict.a11y.toDark}
            className={ICON_BUTTON_CLASS}
          >
            {/* 挂载前不画图标：此时还不知道用户实际处在哪套外观，画了会先错一帧 */}
            {mounted ? (
              theme === 'dark' ? (
                <Sun className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
              ) : (
                <Moon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
              )
            ) : (
              <span className="h-5 w-5" aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            onClick={toggleLang}
            aria-label={dict.a11y.toggleLang}
            className="inline-flex h-12 items-center gap-1.5 rounded-ctl px-3 text-body font-medium text-ink-2 transition-colors duration-150 hover:bg-brand-tint hover:text-brand-text sm:h-10"
          >
            <Languages className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
            <span>{dict.langLabel}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
