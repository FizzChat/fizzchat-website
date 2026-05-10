'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Apple,
  Smartphone,
  Monitor,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  Lock,
  Zap,
  Download,
  Globe,
} from 'lucide-react';
import { DOWNLOADS, type DownloadInfo, type Platform } from '@/lib/downloads';
import { DICTS, detectInitialLang, type Dict, type Lang } from '@/lib/i18n';

const PLATFORM_ICONS = {
  windows: Monitor,
  android: Smartphone,
  ios: Apple,
};

function DownloadCard({
  info,
  dict,
}: {
  info: DownloadInfo;
  dict: Dict;
}) {
  const Icon = PLATFORM_ICONS[info.platform];
  const disabled = !info.available;

  const subLabelMap: Record<Platform, string> = {
    windows: dict.windowsSub,
    android: dict.androidSub,
    ios: dict.iosSub,
  };
  const subLabel = subLabelMap[info.platform];

  if (disabled) {
    return (
      <div
        aria-disabled="true"
        className="group relative overflow-hidden rounded-2xl border border-line/60 bg-bg-elevated/40 p-6 text-left opacity-60"
        style={{ cursor: 'default' }}
      >
        <div className="relative flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-line/60 bg-bg-subtle/60">
            <Icon className="h-5 w-5 text-ink-muted" strokeWidth={1.6} />
          </div>
          <span className="rounded-full border border-line/60 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-ink-muted">
            {dict.soon}
          </span>
        </div>

        <div className="relative mt-6">
          <div className="text-lg font-semibold tracking-tight text-ink-soft">{info.label}</div>
          <div className="mt-1 text-xs text-ink-muted">{subLabel}</div>
        </div>

        <div className="relative mt-6 flex items-center justify-between border-t border-line/60 pt-4">
          <span className="text-xs font-medium text-amber-400/80">{dict.comingSoon}</span>
        </div>
      </div>
    );
  }

  const isTestflight = !!info.testflight;

  return (
    <a
      href={info.url ?? '#'}
      download={info.filename ?? undefined}
      target={isTestflight ? '_blank' : undefined}
      rel={isTestflight ? 'noopener noreferrer' : undefined}
      className="group relative overflow-hidden rounded-2xl border border-line bg-bg-elevated p-6 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:bg-bg-subtle"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-12 -top-24 h-32 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(91,108,255,0.35), transparent 70%)',
        }}
      />

      <div className="relative flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-bg-subtle">
          <Icon className="h-5 w-5 text-ink" strokeWidth={1.6} />
        </div>
        <ArrowUpRight
          className="h-5 w-5 text-ink-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
          strokeWidth={1.8}
        />
      </div>

      <div className="relative mt-6">
        <div className="text-lg font-semibold tracking-tight text-ink">{info.label}</div>
        <div className="mt-1 text-xs text-ink-muted">{subLabel}</div>
      </div>

      <div className="relative mt-6 border-t border-line pt-4">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-soft">
            <Download className="h-3.5 w-3.5" strokeWidth={2} />
            {dict.downloadNow}
          </span>
          <span className="text-xs font-mono text-ink-muted">{info.version}</span>
        </div>
        {isTestflight && (
          <div className="mt-1.5 text-[11px] text-ink-muted">{dict.testflightHint}</div>
        )}
      </div>
    </a>
  );
}

const FEATURE_ICONS = [Lock, ShieldCheck, Zap, Sparkles];

export default function Home() {
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

  return (
    <main className="relative min-h-screen bg-bg" lang={mounted ? lang : 'zh'}>
      {/* Top Nav */}
      <header
        className="fixed top-0 left-0 right-0 z-40 border-b border-line glass"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <span className="text-base font-semibold tracking-tight text-ink sm:text-lg">
            {dict.brand}
          </span>
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

      {/* Hero - rhythm: tight group → mid gap → section gap */}
      <section id="download" className="relative pt-20 pb-24 sm:pt-24 sm:pb-32">
        <div aria-hidden className="absolute inset-0 -z-10 grid-bg" />

        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
          {/* Hero Logo */}
          <div className="animate-fade-up flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt={dict.brand}
              className="h-auto w-[220px] sm:w-[300px]"
              style={{ objectFit: 'contain' }}
            />
          </div>

          {/* negative mt to absorb PNG bottom whitespace; visual gap matches badge↔title */}
          <div className="-mt-4 sm:-mt-6">
            {/* Badge */}
            <div className="flex justify-center">
              <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-line bg-bg-elevated/60 px-3.5 py-1.5 text-[11px] text-ink-soft backdrop-blur sm:text-xs">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-blue opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-blue" />
                </span>
                <span className="hidden sm:inline">{dict.badge}</span>
                <span className="sm:hidden">{dict.badgeShort}</span>
              </div>
            </div>

            {/* Title: 32px gap from badge, 16px gap between lines */}
            <h1 className="animate-fade-up mt-8 text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
              <span className="block text-gradient">{dict.titleLine1}</span>
              <span className="mt-4 block text-ink">{dict.titleLine2}</span>
            </h1>

            {/* Subtitle: gap matches subtitle↔cards (32/40px) */}
            <p className="animate-fade-up mx-auto mt-8 max-w-xl text-sm leading-relaxed text-ink-soft sm:mt-10 sm:text-base">
              {dict.subtitle}
            </p>
          </div>

          {/* gap between subtitle and downloads (matches title↔subtitle) */}
          <div
            id="download-cards"
            className="animate-fade-up mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-3"
          >
            <DownloadCard info={DOWNLOADS.windows} dict={dict} />
            <DownloadCard info={DOWNLOADS.android} dict={dict} />
            <DownloadCard info={DOWNLOADS.ios} dict={dict} />
          </div>

          {/* 32px gap from cards */}
          <p className="mt-8 text-[11px] text-ink-muted sm:text-xs">{dict.bottomNote}</p>
        </div>
      </section>

      {/* Features - top gap (divider→h2) == bottom gap (subtitle→cards) */}
      <section id="features" className="relative border-t border-line py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <div className="mx-auto mb-16 max-w-2xl sm:mb-20">
            <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
              {dict.featuresTitle.plain1}
              <span className="text-gradient-brand">{dict.featuresTitle.gradient}</span>
            </h2>
            <p className="mt-3 text-sm text-ink-soft sm:mt-4 sm:text-base">
              {dict.featuresSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
            {dict.features.map(({ title, desc }, i) => {
              const Icon = FEATURE_ICONS[i];
              return (
                <div
                  key={title}
                  className="group relative flex flex-col items-center bg-bg-elevated p-6 text-center transition-colors hover:bg-bg-subtle sm:p-8"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-bg">
                    <Icon className="h-5 w-5 text-ink" strokeWidth={1.6} />
                  </div>
                  <h3 className="mt-5 text-base font-semibold tracking-tight text-ink sm:text-lg">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
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
