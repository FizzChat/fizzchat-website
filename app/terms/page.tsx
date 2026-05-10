'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Globe } from 'lucide-react';
import { DICTS, detectInitialLang, type Lang } from '@/lib/i18n';

export default function TermsPage() {
  const [lang, setLang] = useState<Lang>('zh');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLang(detectInitialLang());
    setMounted(true);
  }, []);

  const toggleLang = () => {
    const next: Lang = lang === 'zh' ? 'en' : 'zh';
    setLang(next);
    if (typeof window !== 'undefined') window.localStorage.setItem('lang', next);
  };

  const dict = DICTS[lang];
  const t = dict.terms;

  return (
    <main className="relative min-h-screen bg-bg" lang={mounted ? lang : 'zh'}>
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-line glass">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="text-base font-semibold tracking-tight text-ink transition-opacity hover:opacity-80 sm:text-lg"
          >
            {dict.brand}
          </Link>
          <button
            onClick={toggleLang}
            aria-label="Toggle language"
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg-elevated/60 px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-line-strong hover:text-ink"
          >
            <Globe className="h-3.5 w-3.5" strokeWidth={1.8} />
            <span className="font-mono">{dict.langLabel}</span>
          </button>
        </div>
      </header>

      <section className="relative pt-24 pb-20 sm:pt-32 sm:pb-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center text-xs text-ink-muted transition-colors hover:text-ink sm:text-sm"
          >
            {t.backHome}
          </Link>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            {t.title}
          </h1>
          <p className="mt-3 text-xs text-ink-muted sm:text-sm">
            {t.updatedLabel}: {t.updatedDate}
          </p>

          <p className="mt-8 text-sm leading-relaxed text-ink-soft sm:text-base">{t.intro}</p>

          <div className="mt-12 space-y-10">
            {t.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-lg font-semibold tracking-tight text-ink sm:text-xl">
                  {section.title}
                </h2>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft sm:text-base">
                  {section.body.map((line, i) => (
                    <li key={i} className="flex gap-3">
                      <span aria-hidden className="mt-2 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-ink-muted" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="mt-16 border-t border-line pt-8">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-ink-muted transition-colors hover:text-ink"
            >
              {t.backHome}
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-line py-10 sm:py-12">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4 text-sm text-ink-muted sm:px-6">
          <span>{dict.copyright}</span>
          <span aria-hidden>·</span>
          <Link href="/privacy" className="transition-colors hover:text-ink">
            {dict.privacyLink}
          </Link>
          <span aria-hidden>·</span>
          <Link href="/terms" className="transition-colors hover:text-ink">
            {dict.termsLink}
          </Link>
        </div>
      </footer>
    </main>
  );
}
