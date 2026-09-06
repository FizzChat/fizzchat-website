'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { LegalDoc } from '@/lib/i18n';
import { useSitePrefs } from './prefs';
import { SiteHeader } from './site-header';
import { SiteFooter } from './site-footer';

/**
 * 隐私政策 / 服务条款共用的长文骨架。
 *
 * 两页此前是两个逐字重复的文件（diff 只差变量名），改动一处必漏另一处 —— 合成一个组件，
 * 页面只负责挑哪一份文档。正文一列到底、宽度收在 640（tokens size.layoutContentColumnMax），
 * 这是长文可读行宽的既有档位，不为法务页另造尺寸。
 */
const BACK_LINK_CLASS =
  'inline-flex items-center gap-1.5 rounded-ctl text-body font-semibold text-brand-text ' +
  'underline-offset-4 transition-colors duration-150 hover:underline';

export function LegalPage({ doc }: { doc: LegalDoc }) {
  const { dict, lang } = useSitePrefs();
  // 标点本地化：中文用全角冒号，英文用半角冒号 + 空格（i18n.md 判据 5「格式本地化」）
  const labelSeparator = lang === 'zh' ? '：' : ': ';

  return (
    <>
      <SiteHeader />

      <main id="main" className="bg-canvas">
        <div className="mx-auto max-w-prose px-4 py-12 sm:px-6 sm:py-16">
          <Link href="/" className={BACK_LINK_CLASS}>
            <ArrowLeft className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            {doc.backHome}
          </Link>

          <h1 className="mt-6 text-d4 font-bold text-ink sm:text-d3">{doc.title}</h1>
          <p className="mt-2 text-caption text-ink-2">
            {doc.updatedLabel}
            {labelSeparator}
            {doc.updatedDate}
          </p>

          <p className="mt-6 text-body text-ink-2 sm:text-lead">{doc.intro}</p>

          <div className="mt-10 space-y-8">
            {doc.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-title font-bold text-ink sm:text-section">{section.title}</h2>
                <ul className="mt-3 space-y-2 text-body text-ink-2 sm:text-lead">
                  {section.body.map((line, i) => (
                    <li key={i} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 flex-none rounded-full bg-brand"
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="mt-12 border-t border-line pt-6">
            <Link href="/" className={BACK_LINK_CLASS} aria-label={dict.a11y.homeLink}>
              <ArrowLeft className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              {doc.backHome}
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
