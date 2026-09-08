'use client';

import Link from 'next/link';
import {
  Apple,
  ArrowRight,
  Download,
  ExternalLink,
  FileX,
  Link2Off,
  EyeOff,
  MessageCircleOff,
  Monitor,
  MonitorSmartphone,
  RefreshCw,
  Server,
  ShieldCheck,
  Smartphone,
  UserRoundCheck,
  type LucideIcon,
} from 'lucide-react';
import {
  ANDROID_SIGNING_SHA256_FINGERPRINT,
  DESKTOP_WEBAPP_URL,
  DOWNLOADS,
  PLATFORM_ORDER,
  isDownloadable,
  type DownloadInfo,
} from '@/lib/downloads';
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
  // windows 走独立的 DesktopWebAppCard（见下方），这里只服务 android / ios 两张真实安装包卡。
  const Icon = PLATFORM_ICONS[info.platform];
  const subLabel =
    info.platform === 'android' ? dict.download.androidSub : dict.download.iosSub;

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
        {(info.version || info.sizeLabel) && (
          <span className="text-caption text-ink-2">
            {[info.version, info.sizeLabel].filter(Boolean).join(' · ')}
          </span>
        )}
      </div>
      {info.sha256 && (
        <p className="mt-2 break-all font-mono text-caption text-ink-2">SHA-256 {info.sha256}</p>
      )}
      {external && (
        <p className="mt-2 text-caption text-ink-2">{dict.download.testflightHint}</p>
      )}
    </a>
  );
}

/**
 * 桌面版卡片（Windows / macOS，T-P1-148）。没有原生安装包——桌面端是 PWA，
 * 对标 Telegram Web / WhatsApp Web / Discord 官网下载页的「在浏览器中打开」入口：
 * 卡片本身始终是可操作态（不套用 DownloadCard 的 pending 占位视觉），
 * 两步说明 + 一个跳转网页版的主按钮，复用页面已有的 rounded-card / IconTile 视觉语言。
 */
function DesktopWebAppCard({ dict }: { dict: Dict }) {
  const d = dict.download;
  return (
    <div className="flex flex-col rounded-card border border-line bg-surface p-4 sm:p-6">
      <IconTile icon={Monitor} />
      <div className="mt-4 text-title font-semibold text-ink">{d.desktopTitle}</div>
      <ol className="mt-3 flex-1 list-none space-y-1.5">
        {d.desktopSteps.map((step, i) => (
          <li key={step} className="flex gap-2 text-caption text-ink-2">
            <span aria-hidden="true" className="shrink-0 font-semibold text-brand-text">
              {i + 1}.
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
      <a
        href={DESKTOP_WEBAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-ctl bg-brand-solid text-body font-semibold text-on-brand transition-colors duration-150 hover:bg-brand-solid-hover active:bg-brand-solid-active focus-visible:shadow-focus"
      >
        <ExternalLink className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        {d.desktopCta}
      </a>
    </div>
  );
}

/**
 * Android 安装指引 + Play Protect 说明（T-P2-21）。
 * 结构对标 Telegram 官方 APK 页 / Signal Android 页 / F-Droid 的既有惯例：
 * 三步安装 → Play Protect 提示怎么办 → 核对签名/校验和 → 如何获取新版本。
 * 复用页面已有的 rounded-card / IconTile 排版组件，不引入新的视觉语言。
 * 常驻展示（不依赖 Android 卡片是否已可下载）：安装包上线前，这里先把流程讲清楚；
 * 上线后 DownloadCard 会自动显示版本号/大小/SHA-256，两处内容天然对上。
 */
function AndroidInstallGuide({ dict }: { dict: Dict }) {
  const a = dict.androidInstall;
  return (
    <div className="mt-10 border-t border-line pt-10">
      <h3 className="text-title font-bold text-ink sm:text-d4">{a.title}</h3>
      <p className="mt-2 max-w-prose text-body text-ink-2">{a.lead}</p>

      <ol className="mt-6 grid list-none grid-cols-1 gap-4 md:grid-cols-3">
        {a.steps.map((step, i) => (
          <li key={step.title} className="rounded-card border border-line bg-surface p-4 sm:p-6">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-tint text-body font-semibold text-brand-text"
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <h4 className="mt-4 text-body font-semibold text-ink">{step.title}</h4>
            <p className="mt-1 text-caption text-ink-2">{step.desc}</p>
          </li>
        ))}
      </ol>

      <div className="mt-4 rounded-card border border-line bg-surface p-4 sm:p-6">
        <div className="flex items-start gap-3">
          <IconTile icon={ShieldCheck} />
          <div>
            <h4 className="text-body font-semibold text-ink">{a.protectTitle}</h4>
            {a.protectBody.map((p) => (
              <p key={p} className="mt-2 text-caption text-ink-2">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-card border border-line bg-surface p-4 sm:p-6">
          <h4 className="text-body font-semibold text-ink">{a.verifyTitle}</h4>
          <p className="mt-2 text-caption text-ink-2">{a.verifyBody}</p>
          {ANDROID_SIGNING_SHA256_FINGERPRINT && (
            <p className="mt-2 break-all font-mono text-caption text-ink-2">
              SHA-256 {ANDROID_SIGNING_SHA256_FINGERPRINT}
            </p>
          )}
        </div>
        <div className="rounded-card border border-line bg-surface p-4 sm:p-6">
          <div className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 text-brand-text" strokeWidth={2} aria-hidden="true" />
            <h4 className="text-body font-semibold text-ink">{a.updateTitle}</h4>
          </div>
          <p className="mt-2 text-caption text-ink-2">{a.updateBody}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomeClient() {
  const { dict } = useSitePrefs();
  // windows 不再是「等待中的安装包」，它是始终可操作的桌面网页版卡片（DesktopWebAppCard），
  // 不计入「还有安装包在准备中」的提示判断。
  const anyPending = PLATFORM_ORDER.some((p) => p !== 'windows' && !isDownloadable(DOWNLOADS[p]));

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
              {PLATFORM_ORDER.map((platform) =>
                platform === 'windows' ? (
                  <DesktopWebAppCard key={platform} dict={dict} />
                ) : (
                  <DownloadCard key={platform} info={DOWNLOADS[platform]} dict={dict} />
                ),
              )}
            </div>
            {anyPending && (
              <p className="mt-4 max-w-prose text-body text-ink-2">
                {dict.download.pendingHint}
              </p>
            )}
            <AndroidInstallGuide dict={dict} />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
