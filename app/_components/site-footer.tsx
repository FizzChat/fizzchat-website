'use client';

import Link from 'next/link';
import { useSitePrefs } from './prefs';

const LINK_CLASS =
  'rounded-ctl text-body text-ink-2 underline-offset-4 transition-colors duration-150 ' +
  'hover:text-brand-text hover:underline';

export function SiteFooter() {
  const { dict } = useSitePrefs();
  const f = dict.footer;

  return (
    <footer className="border-t border-line bg-canvas">
      <div className="mx-auto max-w-site px-4 py-8 sm:px-6 sm:py-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-body text-ink-2">{f.copyright}</p>

          <nav
            aria-label={dict.a11y.footerNav}
            className="flex flex-wrap items-center gap-x-6 gap-y-2"
          >
            <Link href="/privacy/" className={LINK_CLASS}>
              {f.privacyLink}
            </Link>
            <Link href="/terms/" className={LINK_CLASS}>
              {f.termsLink}
            </Link>
            <span className="text-body text-ink-2">
              {f.contactLabel}{' '}
              <a href={`mailto:${f.email}`} className={LINK_CLASS}>
                {f.email}
              </a>
            </span>
          </nav>
        </div>
      </div>
    </footer>
  );
}
