export type Platform = 'windows' | 'android' | 'ios';

export interface DownloadInfo {
  platform: Platform;
  label: string;
  subLabel: string;
  url: string | null;
  filename: string | null;
  version: string;
  available: boolean;
  hint?: string;
  testflight?: boolean;
}

export const DOWNLOADS: Record<Platform, DownloadInfo> = {
  windows: {
    platform: 'windows',
    label: 'Windows',
    subLabel: 'Windows 10 / 11 · 64-bit',
    url: '#',
    filename: 'FizzChat-Setup.exe',
    version: 'V2.0.3',
    available: true,
  },
  android: {
    platform: 'android',
    label: 'Android',
    subLabel: 'Android 8.0+',
    url: '#',
    filename: 'FizzChat.apk',
    version: 'V2.0.3',
    available: true,
  },
  ios: {
    platform: 'ios',
    label: 'iOS',
    subLabel: 'iPhone · iPad',
    url: '#',
    filename: null,
    version: 'V2.0.3',
    available: true,
    testflight: true,
  },
};
