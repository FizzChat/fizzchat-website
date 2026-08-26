/**
 * 站点绝对域名 —— 供 metadataBase / canonical 使用。
 *
 * 托管现状（2026-08-27 用户纠正）：官网托管在 Vercel
 * （https://fizzchat-website.vercel.app/，GitHub FizzChat/fizzchat-website 自动部署），
 * `fizzchat.cc` 是新买的域名，**尚未绑定**，以后大概率会绑。
 *
 * 不能把 `fizzchat.cc` 写死进 metadataBase：绑域名之前，og:image / canonical 会指向
 * 一个根本解析不到的地址（`https://fizzchat.cc/og.png`），分享预览全部失效。
 *
 * 解析优先级：
 *   1. NEXT_PUBLIC_SITE_URL —— 手动指定的正式域名（绑好 fizzchat.cc 后在 Vercel
 *      项目设置的 Environment Variables 里加这一条：NEXT_PUBLIC_SITE_URL=https://fizzchat.cc，
 *      重新部署即可生效，**代码不用改**）。
 *   2. VERCEL_URL —— Vercel 自动注入的当前部署域名（如
 *      fizzchat-website.vercel.app 或某次 preview 部署域名），不需要手动配置。
 *   3. 兜底 https://fizzchat.cc —— 域名以后绑定后即使两个环境变量都没配，取值也是对的；
 *      绑定前只会影响本地无网络环境下的静态兜底值，不影响 Vercel 生产/预览部署
 *      （那两种场景下 VERCEL_URL 总会存在）。
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://fizzchat.cc');
