'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { DICTS, detectInitialLang, type Dict, type Lang } from '@/lib/i18n';

/**
 * 站点偏好（语言 + 深浅外观）唯一入口。
 *
 * 语言：沿用既有的 localStorage key 'lang'，老访客的选择不会因为这次改版被清掉。
 * 外观：key 'fizz-theme'；没存过就跟随系统 prefers-color-scheme。
 *
 * 首帧一致性：`<html>` 上的 dark class 与 lang 由 layout.tsx 里的内联脚本在解析阶段
 * 就写好（早于 React 水合），所以不会闪一下白再变黑。React 这边只在挂载后把已生效的
 * 值读回来驱动按钮图标，不参与首帧渲染 —— 因此静态导出的 HTML 与首个客户端渲染
 * 完全一致，不会有 hydration mismatch。
 */
export const LANG_STORAGE_KEY = 'lang';
export const THEME_STORAGE_KEY = 'fizz-theme';

export type Theme = 'light' | 'dark';

interface SitePrefs {
  lang: Lang;
  dict: Dict;
  toggleLang: () => void;
  theme: Theme;
  toggleTheme: () => void;
  /** 挂载完成前为 false：此时按钮只占位不显示图标，避免图标先画错再跳一下 */
  mounted: boolean;
}

const SitePrefsContext = createContext<SitePrefs | null>(null);

function htmlLangOf(lang: Lang): string {
  return lang === 'zh' ? 'zh-CN' : 'en';
}

export function SitePrefsProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('zh');
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLang(detectInitialLang());
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    setMounted(true);
  }, []);

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next: Lang = prev === 'zh' ? 'en' : 'zh';
      try {
        window.localStorage.setItem(LANG_STORAGE_KEY, next);
      } catch {
        // 隐私模式下 localStorage 可能抛异常：切语言本身照常生效，只是不持久化
      }
      document.documentElement.lang = htmlLangOf(next);
      return next;
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'light' ? 'dark' : 'light';
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        // 同上
      }
      const root = document.documentElement;
      root.classList.toggle('dark', next === 'dark');
      root.style.colorScheme = next;
      return next;
    });
  }, []);

  const value = useMemo<SitePrefs>(
    () => ({ lang, dict: DICTS[lang], toggleLang, theme, toggleTheme, mounted }),
    [lang, toggleLang, theme, toggleTheme, mounted],
  );

  return <SitePrefsContext.Provider value={value}>{children}</SitePrefsContext.Provider>;
}

export function useSitePrefs(): SitePrefs {
  const ctx = useContext(SitePrefsContext);
  if (!ctx) {
    throw new Error('useSitePrefs 必须在 <SitePrefsProvider> 内部使用');
  }
  return ctx;
}
