'use client';

import Link from 'next/link';
import {
  Apple,
  ArrowRight,
  Download,
  FileX,
  Link2Off,
  EyeOff,
  MessageCircleOff,
  Monitor,
  MonitorSmartphone,
  Server,
  Smartphone,
  UserRoundCheck,
  type LucideIcon,
} from 'lucide-react';
import { DOWNLOADS, PLATFORM_ORDER, isDownloadable, type DownloadInfo } from '@/lib/downloads';
import type { Dict } from '@/lib/i18n';
import { useSitePrefs } from './_components/prefs';
import { SiteHeader } from './_components/site-header';
import { SiteFooter } from './_components/site-footer';

/**
 * 首页区块顺序（信息目标见 specs/reports/WEBSITE_REDESIGN_2026-09-06.md §1）：
 *   顶栏 → 首屏主张 → 三点价值 → 隐私承诺（我们不做什么）→ 下载 → 页脚
 * 对标 Telegram / Signal 官网的克制结构：一屏一件事，没有轮播、没有客户评价、
 * 没有「立即免费试用」这类 SaaS 话术。
 */

/** 三点价值的图标：全部 lucide 线性、strokeWidth 2、正向语义 */
const VALUE_ICONS: LucideIcon[] = [UserRoundCheck, Server, MonitorSmartphone];

/**
 * 隐私承诺四条的图标：刻意全部选「否定态」字形（带斜杠/叉），成套规则单一 ——
 * 消息出不去 / 没有导出文件 / 没有外链 / 没有人在旁边看着。
 */
const PROMISE_ICONS: LucideIcon[] = [MessageCircleOff, FileX, Link2Off, EyeOff];

const PLATFORM_ICONS: Record<DownloadInfo['platform'], LucideIcon> = {
  windows: Monitor,
  android: Smartphone,
  ios: Apple,
};

const PRIMARY_BUTTON =
  'inline-flex h-12 w-full max-w-xs items-center justify-center gap-2 rounded-ctl bg-brand-solid ' +
  'px-6 text-button font-semibold text-on-brand transition-colors duration-150 ' +
  'hover:bg-brand-solid-hover active:bg-brand-solid-active focus-visible:shadow-focus ' +
  'sm:w-auto sm:max-w-none';

const SECONDARY_BUTTON =
  'inline-flex h-12 w-full max-w-xs items-center justify-center gap-2 rounded-ctl border ' +
  'border-line bg-surface px-6 text-button font-semibold text-ink transition-colors duration-150 ' +
  'hover:border-brand hover:bg-brand-tint hover:text-brand-text focus-visible:shadow-focus ' +
  'sm:w-auto sm:max-w-none';

const ICON_TILE =
  'flex h-10 w-10 items-center justify-center rounded-ctl bg-brand-tint text-brand-text';

function IconTile({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className={ICON_TILE}>
      <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
    </span>
  );
}

function SectionHeading({ title, lead }: { title: string; lead: string }) {
  return (
    <div className="max-w-prose">
      <h2 className="text-d4 font-bold text-ink sm:text-d3">{title}</h2>
      <p className="mt-3 text-body text-ink-2 sm:text-lead">{lead}</p>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-card border border-line bg-surface p-4 sm:p-6">
      <IconTile icon={icon} />
      <h3 className="mt-4 text-title font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-body text-ink-2">{desc}</p>
    </div>
  );
}

function DownloadCard({ info, dict }: { info: DownloadInfo; dict: Dict }) {
  const Icon = PLATFORM_ICONS[info.platform];
  const subLabel = {
    windows: dict.download.windowsSub,
    android: dict.download.androidSub,
    ios: dict.download.iosSub,
  }[info.platform];

  const head = (
    <>
      <div className="flex items-start justify-between gap-3">
        <IconTile icon={Icon} />
        {!isDownloadable(info) && (
          <span className="rounded-full border border-line bg-surface-hover px-2.5 py-1 text-caption font-semibold text-ink-2">
            {dict.download.pendingLabel}
          </span>
        )}
      </div>
      <div className="mt-4">
        <div className="text-title font-semibold text-ink">{info.label}</div>
        <div className="mt-1 text-sub text-ink-2">{subLabel}</div>
      </div>
    </>
  );

  // 没有安装包地址时渲染成不可点的说明卡，而不是点了没反应的死按钮
  // （frontend-ia-discipline.md 二·5「不许有假入口」）。
  if (!isDownloadable(info)) {
    return (
      <div className="rounded-card border border-line bg-surface p-4 sm:p-6">{head}</div>
    );
  }

  const external = Boolean(info.testflight);

  return (
    <a
      href={info.url ?? undefined}
      download={info.filename ?? undefined}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="rounded-card border border-line bg-surface p-4 transition-colors duration-150 hover:border-brand hover:bg-surface-hover focus-visible:shadow-focus sm:p-6"
    >
      {head}
      <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
        <span className="inline-flex items-center gap-1.5 text-body font-semibold text-brand-text">
          <Download className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          {dict.nav.download}
        </span>
        {info.version && <span className="text-caption text-ink-2">{info.version}</span>}
      </div>
      {external && (
        <p className="mt-2 text-caption text-ink-2">{dict.download.testflightHint}</p>
      )}
    </a>
  );
}

export default function HomeClient() {
  const { dict } = useSitePrefs();
  const anyPending = PLATFORM_ORDER.some((p) => !isDownloadable(DOWNLOADS[p]));

  return (
    <>
      <SiteHeader showSectionNav />

      <main id="main">
        {/* ── 首屏：一句主张 + 一句解释 + 两个动作 ───────────────────────── */}
        <section className="bg-canvas">
          <div className="mx-auto max-w-site px-4 py-12 text-center sm:px-6 sm:py-16">
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-brand-tint px-3 py-1 text-caption font-semibold text-brand-text">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
              {dict.hero.badge}
            </p>

            <h1 className="mx-auto mt-6 max-w-3xl text-d3 font-bold text-ink sm:text-d2 lg:text-d1">
              {dict.hero.title}
            </h1>

            <p className="mx-auto mt-4 max-w-prose text-lead font-normal text-ink-2 sm:mt-6 sm:text-title">
              {dict.hero.lead}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="#download" className={PRIMARY_BUTTON}>
                {dict.hero.ctaPrimary}
                <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              </a>
              <a href="#promise" className={SECONDARY_BUTTON}>
                {dict.hero.ctaSecondary}
              </a>
            </div>

            <p className="mt-6 text-caption text-ink-2">{dict.hero.platforms}</p>
          </div>
        </section>

        {/* ── 三点价值 ──────────────────────────────────────────────── */}
        <section className="border-t border-line bg-raised">
          <div className="mx-auto max-w-site px-4 py-12 sm:px-6 sm:py-16">
            <SectionHeading title={dict.values.title} lead={dict.values.lead} />
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              {dict.values.items.map((item, i) => (
                <FeatureCard
                  key={item.title}
                  icon={VALUE_ICONS[i] ?? UserRoundCheck}
                  title={item.title}
                  desc={item.desc}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── 隐私承诺：我们不做的四件事 ───────────────────────────────── */}
        <section id="promise" className="border-t border-line bg-canvas">
          <div className="mx-auto max-w-site px-4 py-12 sm:px-6 sm:py-16">
            <SectionHeading title={dict.promise.title} lead={dict.promise.lead} />
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {dict.promise.items.map((item, i) => (
                <FeatureCard
                  key={item.title}
                  icon={PROMISE_ICONS[i] ?? MessageCircleOff}
                  title={item.title}
                  desc={item.desc}
                />
              ))}
            </div>
            <p className="mt-6">
              <Link
                href="/privacy/"
                className="inline-flex items-center gap-1.5 rounded-ctl text-body font-semibold text-brand-text underline-offset-4 transition-colors duration-150 hover:underline"
              >
                {dict.promise.more}
                <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              </Link>
            </p>
          </div>
        </section>

        {/* ── 下载 ─────────────────────────────────────────────────── */}
        <section id="download" className="border-t border-line bg-raised">
          <div className="mx-auto max-w-site px-4 py-12 sm:px-6 sm:py-16">
            <SectionHeading title={dict.download.title} lead={dict.download.lead} />
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              {PLATFORM_ORDER.map((platform) => (
                <DownloadCard key={platform} info={DOWNLOADS[platform]} dict={dict} />
              ))}
            </div>
            {anyPending && (
              <p className="mt-4 max-w-prose text-body text-ink-2">
                {dict.download.pendingHint}
              </p>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
