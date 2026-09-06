export type Platform = 'windows' | 'android' | 'ios';

export interface DownloadInfo {
  platform: Platform;
  /** 平台名是专有名词，两种语言都不翻译，所以不进 i18n 字典 */
  label: string;
  /**
   * 安装包地址。`null` = 还没有可下载的包。
   *
   * 2026-09-06 改动：原来三端都写着 `url: '#'` + `available: true`，页面把它渲染成
   * 可点的下载按钮 —— 点下去什么也不会发生。这正是 frontend-ia-discipline.md
   * 第二节第 5 条禁止的「假入口（点了没反应的死按钮）」，一律不许交付。
   * 现在改成 `null`，卡片自动渲染成明确的「暂未开放」态；等真实地址到位，
   * 把 url（和 version）填上，卡片自动变回可下载态，页面代码不用动。
   */
  url: string | null;
  /** 直链下载时给 <a download> 用的文件名；走跳转（如 TestFlight）时为 null */
  filename: string | null;
  /** 与 url 同步填写；没有可下载的包时不展示版本号，免得让人以为已经能装 */
  version: string | null;
  /** iOS 走 TestFlight 外链，不是直链下载，需要新标签页打开 */
  testflight?: boolean;
}

export const DOWNLOADS: Record<Platform, DownloadInfo> = {
  windows: {
    platform: 'windows',
    label: 'Windows',
    url: null,
    filename: 'FizzChat-Setup.exe',
    version: null,
  },
  android: {
    platform: 'android',
    label: 'Android',
    url: null,
    filename: 'FizzChat.apk',
    version: null,
  },
  ios: {
    platform: 'ios',
    label: 'iOS',
    url: null,
    filename: null,
    version: null,
    testflight: true,
  },
};

/** 展示顺序：桌面 → 安卓 → iOS，与 specs/CLAUDE.md 里三端的惯用书写顺序一致 */
export const PLATFORM_ORDER: Platform[] = ['windows', 'android', 'ios'];

/** '#' 也算没有地址 —— 历史上就是它把死按钮伪装成了可用入口 */
export function isDownloadable(info: DownloadInfo): boolean {
  return typeof info.url === 'string' && info.url.length > 0 && info.url !== '#';
}
