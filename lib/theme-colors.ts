/**
 * 浏览器 UI 用的主题色（<meta name="theme-color">、Telegram Mini App 顶栏底色）。
 *
 * 为什么这里出现十六进制：这两个消费方都是【浏览器/宿主的 chrome】，读不到页面里的
 * CSS 变量，只接受字面色值。除此之外全站颜色一律走 app/globals.css 的 --w-* 变量。
 *
 * 值的出处：
 *   light = specs/design/tokens.json → color.bg.page (#FFFFFF)
 *   dark  = app/globals.css 的 .dark → --w-canvas（派生的暖近黑，推导依据见那里的注释）
 * 改了那两处，这里要跟着改。
 */
export const THEME_COLOR = {
  light: '#FFFFFF',
  dark: '#1A1816',
} as const;
