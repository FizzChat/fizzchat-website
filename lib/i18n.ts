/**
 * 官网文案（zh / en）—— 两种语言各自独立撰写，不是互译。
 *
 * 口径（specs/glossary.md）：
 *   · 品牌名中文一律「气泡」，英文一律「FizzChat」，禁止「FizzChat 气泡」这类中英拼接；
 *     版权行 © 2026 FizzChat 属标识锁定式（logo lockup），两种语言都用英文品牌名。
 *   · 英文一律 Sentence case（只大写首词与专有名词），按钮不写成 Title Case。
 *   · 隐私承诺区块的四条与 specs/CLAUDE.md「全局硬约束 5 · 数据私密性」逐条对应，
 *     不许自行增删（要改产品红线，先改 CLAUDE.md）。
 *   · 营销区块只写【已经做到】的事：不出现「端到端加密」「开源」这类当前实现支撑不住的说法。
 *     法务两页的正文属另一批次，本次一字未动（含其中的同类表述），见交付报告的待拍板项。
 */
export type Lang = 'zh' | 'en';

export interface LegalSection {
  title: string;
  body: string[];
}

export interface LegalDoc {
  title: string;
  updatedLabel: string;
  updatedDate: string;
  intro: string;
  backHome: string;
  sections: LegalSection[];
}

export interface FeatureItem {
  title: string;
  desc: string;
}

export interface Dict {
  brand: string;
  /** 语言切换按钮上显示的【目标】语言，不是当前语言 */
  langLabel: string;
  a11y: {
    skipToContent: string;
    toggleLang: string;
    toLight: string;
    toDark: string;
    homeLink: string;
    sectionNav: string;
    footerNav: string;
  };
  nav: {
    promise: string;
    download: string;
  };
  hero: {
    badge: string;
    title: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    platforms: string;
  };
  values: {
    title: string;
    lead: string;
    items: FeatureItem[];
  };
  promise: {
    title: string;
    lead: string;
    items: FeatureItem[];
    more: string;
  };
  download: {
    title: string;
    lead: string;
    pendingLabel: string;
    pendingHint: string;
    testflightHint: string;
    windowsSub: string;
    androidSub: string;
    iosSub: string;
  };
  footer: {
    copyright: string;
    privacyLink: string;
    termsLink: string;
    contactLabel: string;
    email: string;
  };
  privacy: LegalDoc;
  terms: LegalDoc;
}

export const DICTS: Record<Lang, Dict> = {
  zh: {
    brand: '气泡',
    langLabel: 'EN',
    a11y: {
      skipToContent: '跳到正文',
      toggleLang: '切换语言',
      toLight: '切换到浅色外观',
      toDark: '切换到深色外观',
      homeLink: '气泡首页',
      sectionNav: '本页分区',
      footerNav: '页脚',
    },
    nav: {
      promise: '我们不做什么',
      download: '下载',
    },
    hero: {
      badge: '邀请制 · 手机和电脑同步',
      title: '和熟人说话的地方',
      lead: '气泡靠邀请加入，进来的都是你认得的人。说过的话留在这儿，不会被带去别处。',
      ctaPrimary: '下载气泡',
      ctaSecondary: '看看我们不做什么',
      platforms: 'Windows · Android · iOS',
    },
    values: {
      title: '气泡的三件事',
      lead: '不复杂，就这些。',
      items: [
        {
          title: '邀请才进得来',
          desc: '注册需要一个邀请。没有「附近的人」，也没有陌生人按号码搜到你。',
        },
        {
          title: '跑在自己的服务器上',
          desc: '服务和数据都在我们自己的机器里。不做广告生意，也没有别人的统计代码。',
        },
        {
          title: '手机和电脑一起用',
          desc: 'Windows、Android、iOS 各登各的，消息、图片和语音都同步。',
        },
      ],
    },
    promise: {
      title: '我们不做的四件事',
      lead: '不是暂时没做，是不会做。',
      items: [
        {
          title: '不把聊天发到气泡之外',
          desc: '消息只能转发给气泡里的人，没有「分享到其它应用」这一步。',
        },
        {
          title: '不提供聊天记录导出',
          desc: '没有把记录导成文件的按钮，也没有备份到网盘的通道。',
        },
        {
          title: '不生成对外链接',
          desc: '动态和聊天内容都不会有一条外面能打开的网址。',
        },
        {
          title: '不接第三方追踪和广告',
          desc: '没有统计 SDK，没有广告位，不拿你的行为去做画像。',
        },
      ],
      more: '完整说明见隐私政策',
    },
    download: {
      title: '下载气泡',
      lead: '一个账号，三端通用。',
      pendingLabel: '暂未开放',
      pendingHint: '安装包还在准备，开放后这里直接给出下载地址。',
      testflightHint: '通过 TestFlight 安装',
      windowsSub: 'Windows 10 / 11 · 64 位',
      androidSub: 'Android 8.0 及以上',
      iosSub: 'iPhone · iPad',
    },
    footer: {
      copyright: '© 2026 FizzChat',
      privacyLink: '隐私政策',
      termsLink: '服务条款',
      contactLabel: '联系我们',
      email: 'privacy@fizzchat.app',
    },
    privacy: {
      title: '隐私政策',
      updatedLabel: '最后更新',
      updatedDate: '2026 年 5 月 10 日',
      intro:
        '气泡（以下简称"我们"或"本应用"）尊重并保护所有用户的个人隐私。本隐私政策说明我们如何收集、使用、存储、共享您的信息，以及您对自己信息的权利。在使用本应用前，请仔细阅读本政策。',
      backHome: '返回首页',
      sections: [
        {
          title: '一、我们收集的信息',
          body: [
            '账号信息：注册时您提供的手机号或邮箱、用户名、头像、个人简介。',
            '聊天内容：您与他人发送和接收的消息、图片、语音、文件等内容（仅用于消息送达，不会用于任何其他目的）。',
            '设备信息：设备型号、操作系统版本、应用版本、语言设置，用于兼容性适配和故障排查。',
            '日志信息：登录时间、IP 地址、访问时间，用于账号安全保护和异常行为检测（仅管理员可见）。',
            '联系人信息：仅在您明确授权后，用于在 FizzChat 上发现已经使用本应用的好友。',
          ],
        },
        {
          title: '二、信息使用目的',
          body: [
            '提供核心即时通讯服务，包括账号注册、消息收发、好友与群组管理。',
            '保障账号与服务安全，识别异常登录、防止滥用和欺诈行为。',
            '改进产品体验，分析功能使用情况（统计数据均为聚合匿名形式，无法识别到个人）。',
            '在您主动联系客服或反馈问题时，提供必要的支持。',
          ],
        },
        {
          title: '三、数据存储',
          body: [
            '我们采用独立部署的服务器存储您的数据，不依赖任何第三方云服务作为数据持久层。',
            '聊天内容在传输过程中采用端到端加密；服务端仅在必要时间内中转消息，确保送达后即可清理。',
            '账号信息存储在我们位于受信任地区的安全服务器，采用行业标准的加密方式存储敏感字段（如密码采用 bcrypt 加密）。',
            '我们仅在为您提供服务所必需的期间内保留您的个人信息；账号注销后，相关信息将在合理期限内被删除。',
          ],
        },
        {
          title: '四、第三方共享',
          body: [
            '我们不会向任何第三方出售、出租或交易您的个人信息。',
            '为提供基础推送服务，我们可能使用 Apple 推送通知服务（APNs），仅传递必要的通知元数据，不包含消息正文内容。',
            '在法律法规要求或政府主管部门依法要求的情况下，我们可能依法披露必要信息。',
            '本应用不集成任何用于广告投放、用户画像或行为追踪的第三方 SDK。',
          ],
        },
        {
          title: '五、您的权利',
          body: [
            '访问与导出：您有权随时查看和导出与您账号相关的个人信息。',
            '更正：您可以在应用内随时修改您的资料、头像、简介等信息。',
            '删除：您可以在应用设置中注销账号；账号注销后，您的个人数据将在合理期限内被永久删除。',
            '撤回授权：您可以随时关闭通讯录、相册、麦克风、相机等权限，部分功能可能因此受限。',
            '投诉与反馈：您可通过本页底部联系方式向我们反馈隐私相关问题。',
          ],
        },
        {
          title: '六、未成年人保护',
          body: [
            '本应用不面向 13 岁以下儿童提供服务。',
            '若您是未成年人，请在监护人指导下使用本应用，并在监护人同意下提供个人信息。',
            '若我们发现误收集了未成年人信息，将尽快删除相关数据。',
          ],
        },
        {
          title: '七、政策更新',
          body: [
            '我们可能根据业务变化或法律法规要求适时更新本政策，更新后会在本页发布并修改"最后更新"日期。',
            '重大变更将通过应用内通知或其他显著方式提前告知您。',
          ],
        },
        {
          title: '八、联系我们',
          body: [
            '如您对本隐私政策有任何疑问、意见或投诉，欢迎通过以下方式与我们联系：',
            '邮箱：privacy@fizzchat.app',
            '我们将在收到您的反馈后 15 个工作日内予以回复。',
          ],
        },
      ],
    },
    terms: {
      title: '服务条款',
      updatedLabel: '最后更新',
      updatedDate: '2026 年 5 月 10 日',
      intro:
        '欢迎使用气泡（以下简称"本应用"或"我们"）。本服务条款（以下简称"本条款"）是您与我们之间就使用本应用所订立的协议。请您在使用本应用前仔细阅读本条款；当您注册账号、登录或以任何方式使用本应用，即表示您已充分理解并同意本条款的全部内容。',
      backHome: '返回首页',
      sections: [
        {
          title: '一、用户行为规范',
          body: [
            '您应遵守中华人民共和国及您所在地的法律法规，遵守公序良俗，文明使用本应用提供的所有功能。',
            '您应妥善保管自己的账号与密码，因您主动泄露或保管不善造成的损失由您自行承担。',
            '您不得利用本应用从事任何危害国家安全、破坏社会稳定、侵犯他人合法权益的行为。',
            '您不得使用任何自动化程序、爬虫、外挂等手段访问或操作本应用，不得对本应用进行反向工程、反编译或破解。',
            '您应对自己在本应用内发布的所有内容（文字、图片、语音、文件等）独立承担相应法律责任。',
          ],
        },
        {
          title: '二、禁止内容',
          body: [
            '严禁发布任何违反法律法规的内容，包括但不限于：危害国家安全、煽动民族仇恨、宣扬恐怖主义或极端主义的信息。',
            '严禁发布色情、淫秽、暴力、血腥等违反公序良俗的内容。',
            '严禁发布欺诈、传销、赌博、毒品、非法集资等违法信息。',
            '严禁实施任何形式的骚扰、辱骂、人身攻击、威胁、跟踪或网络暴力行为。',
            '严禁发送垃圾信息、广告、营销推广，以及未经对方同意的批量私信。',
            '严禁侵犯他人知识产权、肖像权、名誉权、隐私权等合法权益。',
            '严禁冒充他人身份，包括冒充工作人员、平台官方或其他用户。',
          ],
        },
        {
          title: '三、账号管理规则',
          body: [
            '本应用采用邀请制注册，您应使用真实有效的信息完成注册，不得使用虚假信息或他人信息。',
            '一个手机号或邮箱仅可注册一个账号；账号归属本应用所有，您仅享有使用权，不得转让、出借或出售。',
            '若您 180 天内未登录，我们有权将其标记为不活跃账号；超过 360 天未登录的账号，我们有权回收。',
            '您可随时在应用内申请注销账号，注销后账号信息将依据隐私政策进行处理。',
            '若您违反本条款，我们有权视情节轻重采取警告、限制功能、暂停服务、永久封禁等措施，且无需事先通知。',
          ],
        },
        {
          title: '四、服务变更与终止',
          body: [
            '我们可能根据业务发展、技术升级、法律法规要求等原因，对本应用的功能、界面或服务内容进行调整、增加或删减，并在合理时间内告知用户。',
            '在以下情形下，我们有权暂停或终止向您提供部分或全部服务：您违反本条款；服务器维护或升级；遭遇不可抗力或第三方原因；法律法规要求。',
            '若我们决定停止运营本应用，将提前不少于 30 日在显著位置公告，并妥善处理用户数据。',
            '本条款终止后，您仍应对终止前的行为承担相应责任。',
          ],
        },
        {
          title: '五、免责声明',
          body: [
            '本应用按"现状"提供，我们不对服务的稳定性、可用性、准确性、及时性作出任何明示或暗示的担保。',
            '因网络故障、设备故障、电力中断、系统维护、不可抗力等原因导致服务中断或数据丢失，我们不承担责任，但会尽合理努力予以恢复。',
            '用户之间通过本应用进行的交流和交易（如有）系用户自行行为，我们不对其后果承担责任。',
            '我们不对第三方链接、第三方服务或第三方内容承担任何责任。',
            '在法律允许的最大范围内，我们对用户的赔偿责任不超过您因使用本应用直接支付给我们的费用总额。',
          ],
        },
        {
          title: '六、争议解决',
          body: [
            '本条款的订立、效力、解释、履行及争议解决均适用中华人民共和国法律（不包括冲突法规则）。',
            '因本条款引起或与本条款有关的任何争议，双方应首先通过友好协商解决；协商不成的，任何一方均有权向本应用运营方所在地有管辖权的人民法院提起诉讼。',
            '若本条款的任何条款被认定无效或不可执行，不影响其他条款的效力。',
          ],
        },
        {
          title: '七、联系我们',
          body: [
            '如您对本服务条款有任何疑问、意见或投诉，欢迎通过以下方式与我们联系：',
            '邮箱：privacy@fizzchat.app',
            '我们将在收到您的反馈后 15 个工作日内予以回复。',
          ],
        },
      ],
    },
  },
  en: {
    brand: 'FizzChat',
    langLabel: '中文',
    a11y: {
      skipToContent: 'Skip to content',
      toggleLang: 'Change language',
      toLight: 'Switch to light appearance',
      toDark: 'Switch to dark appearance',
      homeLink: 'FizzChat home',
      sectionNav: 'Page sections',
      footerNav: 'Footer',
    },
    nav: {
      promise: 'What we don’t do',
      download: 'Download',
    },
    hero: {
      badge: 'Invite-only · Phone and desktop',
      title: 'A place to talk with people you already know',
      lead: 'FizzChat runs on invites, so everyone here is someone you recognise. What gets said stays here — it doesn’t travel anywhere else.',
      ctaPrimary: 'Download FizzChat',
      ctaSecondary: 'See what we don’t do',
      platforms: 'Windows · Android · iOS',
    },
    values: {
      title: 'Three things to know',
      lead: 'That’s the whole idea.',
      items: [
        {
          title: 'Invite-only',
          desc: 'You need an invite to sign up. There is no people nearby, no friend suggestions, and no way for a stranger to look you up.',
        },
        {
          title: 'Servers we run ourselves',
          desc: 'The service and its data sit on machines we operate. No ad business, and no analytics code from anyone else.',
        },
        {
          title: 'Phone and desktop together',
          desc: 'Sign in on Windows, Android and iOS. Messages, photos and voice notes stay in sync.',
        },
      ],
    },
    promise: {
      title: 'Four things we don’t do',
      lead: 'Not “not yet” — these are off the table.',
      items: [
        {
          title: 'No sharing outside FizzChat',
          desc: 'A message can be forwarded to another FizzChat chat, and nowhere else.',
        },
        {
          title: 'No chat export',
          desc: 'There is no button that turns your history into a file, and no backup to anyone’s drive.',
        },
        {
          title: 'No public links',
          desc: 'Nothing you post gets a web address that opens outside the app.',
        },
        {
          title: 'No trackers, no ads',
          desc: 'No analytics SDKs, no ad slots, and no profile built out of what you do.',
        },
      ],
      more: 'The full wording lives in our privacy policy',
    },
    download: {
      title: 'Download FizzChat',
      lead: 'One account across all three platforms.',
      pendingLabel: 'Not yet',
      pendingHint: 'Builds are still being prepared. Links will show up here once they are out.',
      testflightHint: 'Install through TestFlight',
      windowsSub: 'Windows 10 / 11 · 64-bit',
      androidSub: 'Android 8.0 and above',
      iosSub: 'iPhone · iPad',
    },
    footer: {
      copyright: '© 2026 FizzChat',
      privacyLink: 'Privacy policy',
      termsLink: 'Terms of service',
      contactLabel: 'Contact us',
      email: 'privacy@fizzchat.app',
    },
    privacy: {
      title: 'Privacy Policy',
      updatedLabel: 'Last updated',
      updatedDate: 'May 10, 2026',
      intro:
        'FizzChat ("we", "us", or "the app") respects and protects the privacy of every user. This Privacy Policy explains how we collect, use, store, and share your information, and what rights you have over your data. Please read it carefully before using the app.',
      backHome: 'Back to home',
      sections: [
        {
          title: '1. Information We Collect',
          body: [
            'Account information: phone number or email, username, avatar, and bio you provide at registration.',
            'Conversation content: messages, images, voice clips, and files you send or receive (used only for delivery, never for any other purpose).',
            'Device information: device model, operating system version, app version, and language settings, used for compatibility and troubleshooting.',
            'Log information: login time, IP address, and access time, used for account security and abuse detection (visible only to administrators).',
            'Contact information: used solely to discover friends already on FizzChat, and only after you have explicitly granted permission.',
          ],
        },
        {
          title: '2. How We Use Information',
          body: [
            'Provide core messaging services, including registration, message delivery, and friend or group management.',
            'Protect account and service security, detect suspicious logins, and prevent abuse or fraud.',
            'Improve the product by analyzing aggregated, anonymized usage data that cannot identify any individual.',
            'Provide support when you contact us with questions or feedback.',
          ],
        },
        {
          title: '3. Data Storage',
          body: [
            'Your data is stored on servers we operate ourselves; we do not rely on third-party cloud services as the persistence layer.',
            'Messages are end-to-end encrypted in transit. The server only relays messages briefly and clears them after delivery.',
            'Account information is stored on secure servers in trusted regions, with sensitive fields encrypted using industry-standard methods (passwords are hashed with bcrypt).',
            'We retain personal information only as long as necessary to provide the service. After account deletion, related data is removed within a reasonable period.',
          ],
        },
        {
          title: '4. Third-Party Sharing',
          body: [
            'We do not sell, rent, or trade your personal information to any third party.',
            'To deliver basic notifications, we may use Apple Push Notification service (APNs), passing only the necessary metadata — never the message body.',
            'We may disclose information when required by applicable laws or by lawful requests from competent authorities.',
            'The app does not embed any third-party SDK for advertising, profiling, or behavioral tracking.',
          ],
        },
        {
          title: '5. Your Rights',
          body: [
            'Access and export: you may view and export the personal data associated with your account at any time.',
            'Correction: you may update your profile, avatar, and bio inside the app at any time.',
            'Deletion: you may delete your account from the app settings; your personal data will be permanently removed within a reasonable period.',
            'Withdraw consent: you may revoke contacts, photos, microphone, or camera permissions at any time. Some features may stop working as a result.',
            'Complaints: you may reach us through the contact details at the bottom of this page for any privacy-related concerns.',
          ],
        },
        {
          title: '6. Children’s Privacy',
          body: [
            'The app is not directed to children under 13.',
            'If you are a minor, please use the app under the guidance of a guardian and provide personal information only with their consent.',
            'If we become aware that we have inadvertently collected information from a minor, we will delete it as soon as possible.',
          ],
        },
        {
          title: '7. Policy Updates',
          body: [
            'We may update this policy from time to time to reflect business or legal changes. Updates are published on this page and the "Last updated" date is revised accordingly.',
            'Material changes will be communicated in advance through in-app notification or another prominent channel.',
          ],
        },
        {
          title: '8. Contact Us',
          body: [
            'If you have any questions, comments, or complaints about this Privacy Policy, please contact us:',
            'Email: privacy@fizzchat.app',
            'We aim to respond within 15 business days of receiving your message.',
          ],
        },
      ],
    },
    terms: {
      title: 'Terms of Service',
      updatedLabel: 'Last updated',
      updatedDate: 'May 10, 2026',
      intro:
        'Welcome to FizzChat ("the app", "we", or "us"). These Terms of Service ("Terms") form the agreement between you and us regarding your use of the app. Please read them carefully before using the app. By registering an account, signing in, or using the app in any way, you confirm that you have fully understood and agreed to all of these Terms.',
      backHome: 'Back to home',
      sections: [
        {
          title: '1. User Conduct',
          body: [
            'You agree to comply with the laws and regulations of your jurisdiction and to use the app in a lawful and respectful manner.',
            'You are responsible for safeguarding your account and password. Any loss caused by your disclosure or negligence is your sole responsibility.',
            'You may not use the app to engage in any activity that endangers public safety, undermines social order, or infringes the legitimate rights of others.',
            'You may not use any automated tools, crawlers, plug-ins, or hacks to access or operate the app, nor reverse engineer, decompile, or crack it.',
            'You are solely responsible for any content you publish in the app (text, images, voice clips, files, etc.) and for the legal consequences thereof.',
          ],
        },
        {
          title: '2. Prohibited Content',
          body: [
            'Any content that violates applicable laws is strictly prohibited, including content that endangers national security, incites hatred, or promotes terrorism or extremism.',
            'Pornographic, obscene, violent, or otherwise indecent content is strictly prohibited.',
            'Fraud, pyramid schemes, gambling, drugs, illegal fundraising, and other illegal information are strictly prohibited.',
            'Harassment, abuse, personal attacks, threats, stalking, and any form of cyber-violence are strictly prohibited.',
            'Spam, advertising, marketing solicitations, and unsolicited bulk messages are strictly prohibited.',
            'Infringement of others’ intellectual property, portrait, reputation, privacy, or other lawful rights is strictly prohibited.',
            'Impersonation of any individual, staff member, official representative, or other user is strictly prohibited.',
          ],
        },
        {
          title: '3. Account Rules',
          body: [
            'The app is invite-only. You must register with truthful and valid information; false information or another person’s information is not allowed.',
            'Each phone number or email may register only one account. The account belongs to us and you have a right to use it only — you may not transfer, lend, or sell it.',
            'If you do not log in for 180 consecutive days, your account may be marked as inactive. Accounts inactive for over 360 days may be reclaimed.',
            'You may request account deletion in the app at any time. After deletion, your data will be handled in accordance with our Privacy Policy.',
            'If you violate these Terms, we may, depending on the severity, issue a warning, restrict features, suspend service, or permanently ban your account, without prior notice.',
          ],
        },
        {
          title: '4. Service Changes and Termination',
          body: [
            'We may adjust, add, or remove features and content of the app due to business, technical, or legal reasons, and will notify users within a reasonable period.',
            'We may suspend or terminate part or all of the service in the following cases: violation of these Terms; server maintenance or upgrades; force majeure or third-party causes; legal or regulatory requirements.',
            'If we decide to discontinue the app, we will publish a prominent announcement at least 30 days in advance and handle user data appropriately.',
            'After termination of these Terms, you remain liable for actions taken before termination.',
          ],
        },
        {
          title: '5. Disclaimer',
          body: [
            'The app is provided on an "AS IS" basis. We make no express or implied warranty as to the stability, availability, accuracy, or timeliness of the service.',
            'We are not liable for service interruptions or data loss caused by network failure, device failure, power outage, system maintenance, force majeure, or other reasons beyond our control, but we will use reasonable efforts to restore service.',
            'Communications and any transactions between users via the app are conducted at users’ own risk; we are not liable for the consequences.',
            'We are not responsible for any third-party links, services, or content.',
            'To the maximum extent permitted by law, our total liability to you shall not exceed the fees you have paid to us directly for using the app.',
          ],
        },
        {
          title: '6. Dispute Resolution',
          body: [
            'These Terms are governed by the laws of the operator’s jurisdiction (excluding conflict-of-laws rules).',
            'Any dispute arising from or related to these Terms shall first be resolved through friendly negotiation. If negotiation fails, either party may bring the dispute before a competent court located where the operator of the app is based.',
            'If any provision of these Terms is held invalid or unenforceable, the remaining provisions shall remain in full force and effect.',
          ],
        },
        {
          title: '7. Contact Us',
          body: [
            'If you have any questions, comments, or complaints about these Terms of Service, please contact us:',
            'Email: privacy@fizzchat.app',
            'We aim to respond within 15 business days of receiving your message.',
          ],
        },
      ],
    },
  },
};

export function detectInitialLang(): Lang {
  if (typeof window === 'undefined') return 'zh';
  const stored = window.localStorage.getItem('lang');
  if (stored === 'zh' || stored === 'en') return stored;
  const nav = (window.navigator.language || '').toLowerCase();
  return nav.startsWith('zh') ? 'zh' : 'en';
}
