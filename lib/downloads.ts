import assetlinks from '@/public/.well-known/assetlinks.json';

export type Platform = 'windows' | 'android' | 'ios';

/**
 * Android 发布签名证书的 SHA-256 指纹，直接读自 `public/.well-known/assetlinks.json`
 * （App Links 域名校验文件，D-C3 已产出），不重复抄一份数值到别处，避免两处校验值日后走偏。
 * 该文件登记 debug + release 两条指纹（数组末位是 release，对应 `fizzchat-release.jks`，
 * 见 specs/reports/PRE_LAUNCH_CHECKLIST.md:80-82）；Android 安装指引「核对签名与校验和」
 * 一节用的就是这个常量。release 密钥若日后轮换，改 assetlinks.json 即可同步到本页，
 * 这里不需要跟着改。
 */
const RELEASE_FINGERPRINTS = assetlinks[0]?.target?.sha256_cert_fingerprints ?? [];
export const ANDROID_SIGNING_SHA256_FINGERPRINT: string | null =
  RELEASE_FINGERPRINTS[RELEASE_FINGERPRINTS.length - 1] ?? null;

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
  /** 安装包大小，展示用短标签（如 "45 MB"）；与 url 同步填写，未发布时为 null 不展示 */
  sizeLabel: string | null;
  /**
   * SHA-256 校验和（十六进制小写）。仅 Android 安装指引会用到——微软/苹果商店分发的
   * Windows/iOS 包不需要用户手动核对校验和，这两端保留字段但始终为 null。
   * 2026-09-08 起随 T-P2-21 安装指引一起建的字段：部署专员在 OPS_applinks_apk_hosting
   * 报告产出真实签名 APK 与 latest.json 后，把 url/version/sizeLabel/sha256 一起填上，
   * 页面（下载卡片 + Android 安装指引的“核对签名与校验和”一节）自动从占位态变为真实态，
   * 不需要再改代码。在此之前一律为 null，不展示编造的校验和。
   */
  sha256: string | null;
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
    sizeLabel: null,
    sha256: null,
  },
  android: {
    platform: 'android',
    label: 'Android',
    // T-P2-21（2026-09-08）：真实签名 APK 已发布，见
    // specs/reports/OPS_applinks_apk_hosting_2026-09-08.md。url 指向版本号那份
    // （downloads/fizzchat-3.8.3.apk，Cache-Control: public, max-age=31536000,
    // immutable），不指向 fizzchat-latest.apk ——后者会被下次发布覆盖，指向它
    // 的话，用户点开下载链接时若正好撞上新版本发布会拿到错误内容。
    url: 'https://minio.fizzchat.cc/downloads/fizzchat-3.8.3.apk',
    filename: 'FizzChat.apk',
    version: '3.8.3',
    sizeLabel: '216.8 MB',
    sha256: 'a5e804a4dc96dc942244b82c264a9383f2378a72bd2cd848001067c5c90168e7',
  },
  ios: {
    platform: 'ios',
    label: 'iOS',
    url: null,
    filename: null,
    version: null,
    sizeLabel: null,
    sha256: null,
    testflight: true,
  },
};

/** 展示顺序：桌面 → 安卓 → iOS，与 specs/CLAUDE.md 里三端的惯用书写顺序一致 */
export const PLATFORM_ORDER: Platform[] = ['windows', 'android', 'ios'];

/** '#' 也算没有地址 —— 历史上就是它把死按钮伪装成了可用入口 */
export function isDownloadable(info: DownloadInfo): boolean {
  return typeof info.url === 'string' && info.url.length > 0 && info.url !== '#';
}
