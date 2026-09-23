/**
 * 官网文案（zh / en）—— 两种语言各自独立撰写，不是互译。
 *
 * 口径（specs/glossary.md）：
 *   · 品牌名中文一律「气泡」，英文一律「FizzChat」，禁止「FizzChat 气泡」这类中英拼接；
 *     版权行 © 2026 FizzChat 属标识锁定式（logo lockup），两种语言都用英文品牌名。
 *   · 英文一律 Sentence case（只大写首词与专有名词），按钮不写成 Title Case。
 *   · 语域（2026-09-06 重写后的硬标准）：中文＝正式产品书面语，名词化、陈述句，
 *     不用口语句式与口头禅；英文＝英语母语产品写手口吻独立撰写，不是中文的译文。
 *     本次剔除的口语表达已固化成禁用词表，挂在 npm test 的 [1b] 语域门禁里，
 *     再次写回即红灯；改前改后逐句对照见 specs/reports/WEBSITE_COPY_REWRITE_2026-09-06.md。
 *   · 隐私承诺区块的四条与 specs/CLAUDE.md「全局硬约束 5 · 数据私密性」逐条对应，
 *     不许自行增删（要改产品红线，先改 CLAUDE.md）。
 *   · 营销区块只写【已经做到】的事：不出现 E2EE 加密、「开源」这类当前实现支撑不住的说法。
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
    /**
     * 桌面版卡片（T-P1-148，2026-09-08）：不做 Windows/macOS 安装包，桌面端 = PWA。
     * 对标 Telegram Web / WhatsApp Web / Discord 官网下载页的「在浏览器中打开」入口——
     * 卡片始终是可操作态（不套用 pending 占位卡的视觉），文案见 lib/downloads.ts 注释。
     */
    desktopTitle: string;
    desktopSteps: string[];
    desktopCta: string;
    androidSub: string;
    iosSub: string;
  };
  /**
   * Android 安装指引 + Play Protect 说明（T-P2-21，2026-09-08）。
   * 对标 Telegram 官方 APK 页 / Signal Android 页 / F-Droid 的结构：三步安装 →
   * Play Protect 提示怎么办 → 核对签名/校验和 → 如何获取新版本。只在 Android 卡片下方
   * 出现，不影响 Windows/iOS 卡片。
   */
  androidInstall: {
    title: string;
    lead: string;
    steps: FeatureItem[];
    protectTitle: string;
    protectBody: string[];
    verifyTitle: string;
    verifyBody: string;
    updateTitle: string;
    updateBody: string;
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
      skipToContent: '跳至主要内容',
      toggleLang: '切换语言',
      toLight: '切换至浅色外观',
      toDark: '切换至深色外观',
      homeLink: '气泡首页',
      sectionNav: '页面导航',
      footerNav: '页脚导航',
    },
    nav: {
      promise: '隐私承诺',
      download: '下载',
    },
    hero: {
      badge: '邀请制注册 · 多端同步',
      title: '熟人之间的私密通讯',
      lead: '气泡（FizzChat）采用邀请制注册，聊天内容仅在应用内流转，不提供对外分享通道。',
      ctaPrimary: '下载气泡',
      ctaSecondary: '查看隐私承诺',
      platforms: 'Windows · Android · iOS',
    },
    values: {
      title: '核心特性',
      lead: '围绕熟人社交场景构建，功能范围保持克制。',
      items: [
        {
          title: '邀请制注册',
          desc: '注册需凭有效邀请完成，不提供附近的人、好友推荐等陌生人发现功能。',
        },
        {
          title: '自有服务器部署',
          desc: '服务与数据运行在自有服务器，不接入广告业务与第三方统计代码。',
        },
        {
          title: '多端同步',
          desc: '同一账号可在 Windows、Android、iOS 登录，消息、图片与语音实时同步。',
        },
      ],
    },
    promise: {
      title: '四项隐私承诺',
      lead: '以下四项为产品设计约束，不会随版本更新而改变。',
      items: [
        {
          title: '聊天内容不外发',
          desc: '消息仅可在应用内转发，不提供分享至第三方应用的入口。',
        },
        {
          title: '不提供聊天记录导出',
          desc: '不提供将聊天记录导出为文件的功能，也不接入云端备份通道。',
        },
        {
          title: '不生成对外链接',
          desc: '动态与聊天内容不会生成可在应用外访问的链接。',
        },
        {
          title: '无第三方追踪与广告',
          desc: '不集成统计 SDK 与广告组件，不基于使用行为构建用户画像。',
        },
      ],
      more: '查看完整隐私政策',
    },
    download: {
      title: '下载气泡',
      lead: '同一账号可在全部客户端登录。',
      pendingLabel: '即将发布',
      pendingHint: 'iOS 版正在准备中，发布后将在此提供下载地址。',
      testflightHint: '通过 TestFlight 安装',
      desktopTitle: '桌面版（Windows / macOS）',
      desktopSteps: [
        '用 Chrome 或 Edge 打开 app.fizzchat.cc。',
        '点击地址栏右侧的安装图标，安装后即可像普通应用一样从桌面或开始菜单打开。',
      ],
      desktopCta: '打开网页版',
      androidSub: 'Android 8.0 及以上',
      iosSub: 'iPhone · iPad',
    },
    androidInstall: {
      title: 'Android 安装说明',
      lead: '气泡 Android 版由本页直接提供安装包，安装前请阅读以下步骤。',
      steps: [
        {
          title: '下载安装包',
          desc: '点击上方 Android 卡片下载安装包，文件名为 FizzChat.apk。',
        },
        {
          title: '允许安装未知来源应用',
          desc: '系统弹出权限提示时，为负责本次下载的浏览器或文件管理器开启安装未知应用的权限，仅需在首次安装时授权一次。',
        },
        {
          title: '完成安装并登录',
          desc: '安装完成后打开应用，使用已有账号登录，消息与设置会与其他客户端保持同步。',
        },
      ],
      protectTitle: '出现 Google Play Protect 提示怎么办',
      protectBody: [
        '安装过程中若出现 Play Protect 提示，点“仍要安装”即可继续，这是系统对直接下载安装包的通用提示，与安装包本身是否安全无关。',
        '如需进一步核实，可在安装前核对签名证书指纹与本页公布的值是否一致。',
      ],
      verifyTitle: '核对签名与校验和',
      verifyBody:
        '签名证书指纹长期保持固定，见下方；可在系统的应用信息或第三方校验工具中核对，与该值一致后再安装。每个正式发布的安装包上线后，还会在本页同时公布版本号与 SHA-256 校验和。',
      updateTitle: '获取新版本',
      updateBody: '气泡会在应用内提示新版本；也可随时回到本页下载最新安装包，覆盖安装即可完成更新。',
    },
    footer: {
      copyright: '© 2026 FizzChat',
      privacyLink: '隐私政策',
      termsLink: '服务条款',
      contactLabel: '联系我们',
      email: 'privacy@fizzchat.cc',
    },
    privacy: {
      title: '隐私政策',
      updatedLabel: '最后更新',
      updatedDate: '2026 年 9 月 23 日',
      intro:
        'FizzChat（中文名「气泡」，以下简称“本应用”或“我们”）是一款采用邀请制的即时通讯产品。本隐私政策说明我们收集哪些信息、如何使用与存储这些信息、在何种情形下与第三方共享，以及您对自己的信息享有哪些权利。请在使用本应用前完整阅读本政策。',
      backHome: '返回首页',
      sections: [
        {
          title: '一、我们收集的信息',
          body: [
            '账号信息：注册时您提交的用户名、昵称、密码、手机号、密保问题及密保答案，以及您使用的邀请码。手机号仅用于找回账号，注册后不可自行修改；密码经不可逆加密算法处理后存储，我们不保存密码明文。',
            '资料信息：您自愿设置的头像与个人简介。',
            '通讯内容：您收发的文字、图片、语音、视频、文件、名片等消息，用于消息送达与多设备同步。',
            '社交关系：您的好友关系、群组成员关系，以及好友申请与入群申请记录。',
            '动态内容：您发布的动态正文与图片，以及您对动态的点赞与评论。',
            '通话信息：语音与视频通话的参与方、通话类型、起止时间与时长，用于生成通话记录。我们不录制、不存储通话的音视频内容。',
            '资金信息：账户余额、红包与转账流水；您提交的充值申请信息（资产种类、网络、数量，以及您填写的转账凭证）；您保存的数字资产收款地址及其网络与备注。',
            '设备与网络信息：设备型号、操作系统版本、应用版本、语言设置，以及维持服务运行所必需的网络信息。',
            '日志信息：登录时间、常用操作记录等。',
            '本应用不通过短信验证码注册，不收集电子邮箱地址，不读取您设备中的通讯录，也不采集您的精确地理位置。',
          ],
        },
        {
          title: '二、我们如何使用这些信息',
          body: [
            '提供服务：完成账号注册与登录、消息收发与多端同步、好友与群组管理、动态发布、音视频通话及钱包功能。',
            '保障安全：识别异常登录，防范盗号、垃圾信息、欺诈与洗钱等风险行为。',
            '履行合规义务：按照适用法律法规的要求，对平台内容进行必要的审核与追溯。',
            '处理请求：在您联系客服、提交反馈或申请充值、提现时进行核实与处理。',
            '维护与改进：排查故障、修复缺陷、适配不同机型与系统版本。',
            '我们不将您的信息用于广告投放、用户画像或跨应用行为追踪。',
          ],
        },
        {
          title: '三、数据存储与保留',
          body: [
            '存储位置：账号、消息、动态、资金流水等核心数据存储于我们自行部署并运维的服务器，不使用第三方云数据库作为数据持久层。',
            '附件保留期：消息中的图片、语音、视频与文件在服务器保留 365 天，到期后自动清理，此后该附件不可再下载。',
            '账号存续期：账号信息与消息记录在您的账号存续期间持续保留。',
            '注销后的处理：您注销账号后，我们将删除您的账号资料、好友与群组关系、动态内容及相关记录。适用法律法规要求留存的资金流水等信息，将在法定期限内以最小必要范围保留。',
            '日志保留：登录与操作日志仅在实现安全审计目的所必需的期间内保留。',
          ],
        },
        {
          title: '四、信息共享与披露',
          body: [
            '我们不出售、出租或交易您的个人信息。仅在下列情形下共享必要信息：',
            '消息推送：安卓端通过 Google Firebase 云消息服务（FCM）下发通知，浏览器与 PWA 端通过浏览器厂商提供的 Web Push 服务下发通知。通知可能包含发件人昵称与消息摘要，您可在系统设置中关闭通知权限。',
            '网络接入：本应用的公网接入经由 Cloudflare 提供的网络传输服务中转，该服务仅用于网络层传输与接入防护。',
            '实时音视频：通话媒体由我们自行部署的 LiveKit 服务承载，不经第三方音视频云平台。',
            '充值与提现审核：您提交的充值申请信息与您保存的收款地址，仅用于相应申请的审核与款项处理，仅限经授权的人员在必要范围内查看。',
            '依法披露：在适用法律法规要求，或主管机关依法定程序提出要求时，我们可能依法披露必要信息。',
            '本应用不集成任何用于广告投放、数据分析或行为追踪的第三方 SDK。',
          ],
        },
        {
          title: '五、数据安全与访问控制',
          body: [
            '传输安全：客户端与服务器之间的全部通信使用 TLS 加密。',
            '存储安全：密码经不可逆加密算法处理后存储；您保存的提现收款地址加密存储，仅在审核环节解密。',
            '访问控制：服务器数据按最小授权原则访问，相关操作留存记录以备审计。',
            '我们采取合理的技术与管理措施保护您的信息，但任何系统都无法保证绝对安全。',
          ],
        },
        {
          title: '六、您的权利',
          body: [
            '查阅与更正：您可以在应用内查看并修改昵称、头像与个人简介。用户名与手机号在注册后不可自行修改。',
            '找回账号：您可以通过密保问题与手机号找回密码。',
            '删除内容：您可以删除自己发布的动态，也可以删除本地保存的会话记录。',
            '注销账号：您可以在设置中申请注销账号。注销将按第三节所述处理您的数据，且不可撤销。',
            '撤回授权：您可以在系统设置中关闭相册、相机、麦克风与通知权限，相应功能将随之受限。',
            '投诉与咨询：您可以通过第九节的联系方式与我们联系。',
            '基于本应用的隐私定位，我们不提供把会话内容转存至应用之外的功能，也不提供生成外部可访问链接的分享功能。动态仅对您的好友可见，无法通过链接分享至应用之外。',
          ],
        },
        {
          title: '七、未成年人保护',
          body: [
            '本应用不面向 13 周岁以下的儿童提供服务；若您所在地法律规定了更高的最低年龄（例如 14 或 16 周岁），则以该年龄为准。若您未满 18 周岁，请在监护人的同意与指导下使用本应用并提交个人信息。若我们发现在未取得监护人同意的情况下收集了未成年人的个人信息，将尽快删除相关数据。',
          ],
        },
        {
          title: '八、政策更新',
          body: [
            '我们可能因业务调整或适用法律法规变化而更新本政策。更新后的版本将在本页发布，并同步修改生效日期。涉及您权利的重大变更，我们将通过应用内通知等显著方式提前告知。',
          ],
        },
        {
          title: '九、联系我们',
          body: [
            '如对本政策有任何疑问、意见或投诉，请通过以下方式与我们联系：',
            '邮箱：privacy@fizzchat.cc',
            '我们将在收到您的来信后 15 个工作日内答复。',
          ],
        },
      ],
    },
    terms: {
      title: '服务条款',
      updatedLabel: '最后更新',
      updatedDate: '2026 年 9 月 23 日',
      intro:
        '欢迎使用 FizzChat（中文名「气泡」，以下简称“本应用”或“我们”）。本服务条款（以下简称“本条款”）构成您与本应用运营方之间就使用本应用达成的协议。当您注册账号、登录或以任何方式使用本应用时，即表示您已阅读、理解并同意本条款及《隐私政策》的全部内容。如您不同意其中任何内容，请停止使用本应用。',
      backHome: '返回首页',
      sections: [
        {
          title: '一、服务说明',
          body: [
            '本应用提供邀请制的即时通讯服务，包括单聊与群聊、动态、音视频通话，以及充值、红包、转账与提现等钱包功能。本应用面向熟人之间的私密沟通，不提供向应用之外分享、转存或生成外链的功能。',
          ],
        },
        {
          title: '二、账号规则',
          body: [
            '本应用采用邀请制注册，您需持有有效的邀请码方可完成注册。注册项包括用户名、昵称、手机号、密码、密保问题与密保答案。',
            '本应用不使用短信验证码，也不支持以电子邮箱注册。手机号仅用于找回账号，注册后不可自行修改。',
            '您应使用真实、准确的信息完成注册，不得使用虚假信息或冒用他人信息。',
            '一个用户名对应一个账号；同一手机号仅可绑定一个账号。',
            '您应妥善保管账号、密码及密保答案。凡使用您的账号进行的操作均视为您本人所为，因您泄露或保管不善造成的损失由您自行承担。',
            '账号的所有权归本应用运营方所有，您享有使用权，不得转让、出借、出租或出售。',
            '您可以随时在设置中申请注销账号，注销后我们将依据《隐私政策》处理您的数据。注销不可撤销，账户余额应在注销前处理完毕。',
            '我们可能针对长期未使用的账号制定管理规则，届时将另行公告后执行。',
            '若您违反本条款，我们有权视情节采取警告、限制功能、暂停服务或永久封禁等措施；情节严重或依法应当立即处置的，我们有权不经事先通知直接执行。',
          ],
        },
        {
          title: '三、使用规范',
          body: [
            '您应遵守您所在国家或地区适用的法律法规，遵守公序良俗，文明使用本应用的全部功能。您不得利用本应用从事下列行为：',
            '发布危害国家安全、煽动仇恨与歧视、宣扬恐怖主义或极端主义的内容。',
            '发布色情、淫秽、暴力、血腥或其他违背公序良俗的内容。',
            '发布欺诈、传销、赌博、毒品交易、非法集资等违法信息。',
            '对他人实施骚扰、辱骂、人身攻击、威胁、跟踪或其他形式的网络暴力。',
            '发送垃圾信息、广告推广，或未经对方同意的批量私信。',
            '侵犯他人的知识产权、肖像权、名誉权、隐私权或其他合法权益。',
            '冒充他人身份，包括冒充平台工作人员、官方账号或其他用户。',
            '利用红包、转账等资金功能从事洗钱、诈骗、赌博、套现或其他违法资金活动。',
            '使用自动化程序、爬虫、外挂或其他技术手段访问、抓取或操作本应用，或对本应用进行反向工程、反编译与破解。',
            '采取技术手段规避本应用的产品限制，将他人的通讯内容或动态传播至本应用之外。',
          ],
        },
        {
          title: '四、您发布的内容',
          body: [
            '您对自己在本应用内发布、发送或传输的全部内容独立承担法律责任。',
            '您所发布内容的权利仍归您所有。为向您提供服务，您授予我们一项有限的、非独占的技术性许可，允许我们为存储、传输、缓存、备份及按您设定的可见范围展示内容之目的处理这些内容。该许可随您删除内容或注销账号而终止，但已依法留存的记录除外。',
            '动态仅对您的好友可见。本应用不提供把动态或会话内容转存、传播至应用之外的功能。',
            '为维护内容安全并履行法律法规规定的义务，我们有权依照本条款与《隐私政策》对违法违规内容采取必要的处置措施。',
          ],
        },
        {
          title: '五、钱包、红包与转账',
          body: [
            '余额：账户余额因充值、转账、红包收发、提现等操作而变动，可用的资金功能以应用内实际提供的为准。账户余额不计付利息。',
            '红包：红包发出后，金额与份数即行锁定，由系统按随机规则预先拆分，领取先到先得，领取结果不可更改。超过公示时限未被领取的部分，将按规则退回发送方账户。',
            '转账：转账为账号之间的一对一资金转移，一经转出不可单方撤回。',
            '充值：您可通过应用内提供的方式为账户充值。充值时应按应用内的指引选择资产与网络，并将资产转入页面显示的收款地址。若实际转入的网络或资产与您所选的不一致，相关资产可能无法找回。 充值申请须经审核；到账金额按审核时的行情折算为您账户余额所用的计价单位，以实际入账为准。',
            '提现：您需提交并保存有效的数字资产收款地址，并确认其所属网络无误；地址或网络填写有误可能导致资产无法找回。提现申请须经审核。提现金额应达到应用内公示的起提额度，按公示费率收取手续费。审核通过后，款项将发送至您提交的收款地址，到账时间以实际处理为准。',
            '实时参数：红包单笔上限、单次份数上限、红包有效期、可充值的资产与网络、单笔充值上下限、起提额度与提现费率等参数以应用内公示为准，我们可能根据风控与运营需要调整并公示。',
            '风控：对于涉嫌洗钱、诈骗、赌博、套现或异常刷量的账户，我们有权暂停其资金功能、冻结相关款项，并保留追究法律责任的权利。',
            '本应用的钱包功能不构成储蓄、投资、信贷或支付结算服务。',
          ],
        },
        {
          title: '六、服务的变更与终止',
          body: [
            '我们可能因业务发展、技术升级或法律法规要求，对本应用的功能、界面或服务内容进行调整、增加或删减，并在合理时间内告知用户。',
            '出现下列情形时，我们有权暂停或终止向您提供部分或全部服务：您违反本条款；服务器维护或系统升级；不可抗力或第三方原因；适用法律法规的要求。',
            '若我们决定停止运营本应用，将提前不少于 30 日在显著位置公告，并对用户数据与账户余额作出妥善安排。',
            '本条款终止后，您仍应就终止前的行为承担相应责任；本条款中关于内容责任、免责、责任限制与争议解决的条款在终止后继续有效。',
          ],
        },
        {
          title: '七、免责声明与责任限制',
          body: [
            '本应用按“现状”及“现有可用”状态提供，我们不对其稳定性、可用性、准确性或及时性作出任何明示或默示的担保。',
            '因网络故障、设备故障、电力中断、系统维护或不可抗力导致服务中断或数据丢失的，我们不承担责任，但会尽合理努力予以恢复。',
            '用户之间通过本应用进行的交流、转账与红包收发系用户自行行为，其后果由用户自行承担；我们仅按第五节的规则提供相应的技术保障。',
            '我们不对任何第三方服务、第三方内容或第三方链接承担责任。',
            '在适用法律允许的最大范围内，我们对您承担的赔偿责任总额不超过您因使用本应用而直接向我们支付的费用总额。',
          ],
        },
        {
          title: '八、法律适用与争议解决',
          body: [
            '本条款的订立、效力、解释、履行及争议解决，适用您所在地的法律；您所在地法律中的强制性规定不受本条款影响。',
            '因本条款引起或与之相关的争议，双方应首先友好协商解决；协商不成的，任何一方均可向您所在地有管辖权的法院提起诉讼。',
            '本条款任一条款被认定无效或不可执行的，不影响其余条款的效力。',
          ],
        },
        {
          title: '九、条款更新',
          body: [
            '我们可能因业务调整或适用法律法规变化而更新本条款。更新后的版本将在本页发布，并同步修改生效日期。重大变更将通过应用内通知等显著方式提前告知。更新生效后您继续使用本应用的，视为接受更新后的条款。',
          ],
        },
        {
          title: '十、联系我们',
          body: [
            '如对本条款有任何疑问、意见或投诉，请通过以下方式与我们联系：',
            '邮箱：privacy@fizzchat.cc',
            '我们将在收到您的来信后 15 个工作日内答复。',
          ],
        },
      ],
    },  },
  en: {
    brand: 'FizzChat',
    langLabel: '中文',
    a11y: {
      skipToContent: 'Skip to main content',
      toggleLang: 'Change language',
      toLight: 'Switch to light appearance',
      toDark: 'Switch to dark appearance',
      homeLink: 'FizzChat home',
      sectionNav: 'Page navigation',
      footerNav: 'Footer navigation',
    },
    nav: {
      promise: 'Privacy commitments',
      download: 'Download',
    },
    hero: {
      badge: 'Invitation-only · Synced across devices',
      title: 'Private messaging for people you already know',
      lead: 'FizzChat is invitation-only, and conversations stay inside the app. There is no way to share them anywhere else.',
      ctaPrimary: 'Download FizzChat',
      ctaSecondary: 'Read our privacy commitments',
      platforms: 'Windows · Android · iOS',
    },
    values: {
      title: 'The essentials',
      lead: 'Built for a small circle of people you know, with a deliberately narrow feature set.',
      items: [
        {
          title: 'Invitation-only sign-up',
          desc: 'An invitation is required to create an account. There are no discovery features: no people nearby, no suggested contacts, no way for a stranger to find you.',
        },
        {
          title: 'Servers we operate',
          desc: 'The service and its data run on infrastructure we operate. There is no advertising business and no third-party analytics.',
        },
        {
          title: 'Synced across devices',
          desc: 'A single account signs in on Windows, Android and iOS, and messages, photos and voice notes stay in sync.',
        },
      ],
    },
    promise: {
      title: 'Four privacy commitments',
      lead: 'These are product design constraints, not features awaiting a future release.',
      items: [
        {
          title: 'No sharing outside FizzChat',
          desc: 'A message can be forwarded to another FizzChat conversation and nowhere else. There is no share sheet for third-party apps.',
        },
        {
          title: 'No chat export',
          desc: 'Chat history cannot be saved to a file, and there is no backup channel to any cloud storage service.',
        },
        {
          title: 'No external links',
          desc: 'Moments and messages are never given a web address that opens outside the app.',
        },
        {
          title: 'No trackers, no ads',
          desc: 'FizzChat integrates no analytics SDKs and no ad components, and does not build a profile from your activity.',
        },
      ],
      more: 'Read the full Privacy Policy',
    },
    download: {
      title: 'Download FizzChat',
      lead: 'The same account works on every platform.',
      pendingLabel: 'Coming soon',
      pendingHint: 'The iOS app is in preparation. Its download link will appear here once it is released.',
      testflightHint: 'Install through TestFlight',
      desktopTitle: 'Desktop (Windows / macOS)',
      desktopSteps: [
        'Open app.fizzchat.cc in Chrome or Edge.',
        'Click the install icon in the address bar. Once installed, launch FizzChat from your desktop or Start menu like any other app.',
      ],
      desktopCta: 'Open the web app',
      androidSub: 'Android 8.0 and later',
      iosSub: 'iPhone · iPad',
    },
    androidInstall: {
      title: 'Installing on Android',
      lead: 'The FizzChat Android app installs directly from this page. Read the steps below before you install.',
      steps: [
        {
          title: 'Download the package',
          desc: 'Get the installer from the Android card above. The file is named FizzChat.apk.',
        },
        {
          title: 'Allow installs from this source',
          desc: 'When prompted, allow your browser or file manager to install unknown apps. You only need to grant this once, the first time you install.',
        },
        {
          title: 'Finish and sign in',
          desc: 'Open the app once installation completes and sign in with your existing account. Messages and settings stay in sync with your other devices.',
        },
      ],
      protectTitle: 'About the Google Play Protect warning',
      protectBody: [
        'If Android shows a Play Protect warning during installation, choose to install anyway. This is the standard prompt for any app installed directly from a downloaded file, and it does not mean the file is unsafe.',
        'To check further, compare the signing certificate fingerprint against the value published here before you install.',
      ],
      verifyTitle: 'Verify the signature and checksum',
      verifyBody:
        'The signing certificate fingerprint stays fixed and is published below. Check it against your device\'s app info screen or a checksum tool before you install. Once we publish a release, its version number and SHA-256 checksum will appear on this page too.',
      updateTitle: 'Getting updates',
      updateBody:
        'FizzChat checks for new versions from inside the app. You can also come back to this page at any time and install the latest package over the current one.',
    },
    footer: {
      copyright: '© 2026 FizzChat',
      privacyLink: 'Privacy Policy',
      termsLink: 'Terms of Service',
      contactLabel: 'Contact us',
      email: 'privacy@fizzchat.cc',
    },
    privacy: {
      title: 'Privacy Policy',
      updatedLabel: 'Last updated',
      updatedDate: 'September 23, 2026',
      intro:
        'FizzChat is an invitation-only messaging service. This Privacy Policy explains what information we collect, how we use and store it, when we disclose it, and what control you have over it. Please read it in full before you use the app.',
      backHome: 'Back to home',
      sections: [
        {
          title: '1. Information we collect',
          body: [
            'Account information. The username, display name, password, phone number, security question and answer, and invitation code you submit when you register. Your phone number is used only to recover access to your account and cannot be changed once your account is created. Passwords are stored only after one-way cryptographic processing; we never keep them in readable form.',
            'Profile information. The profile photo and bio you choose to add.',
            'Messages. The text, photos, voice notes, videos, files, and contact cards you send and receive, which we process to deliver your messages and keep them in sync across your devices.',
            'Social connections. Your contacts, group memberships, and pending contact and group requests.',
            'Moments. The posts and photos you publish, together with the likes and comments you leave.',
            'Call information. The participants, call type, start and end times, and duration of each voice or video call, which we use to create your call history. We do not record or store the audio or video of your calls.',
            'Wallet information. Your balance and your red packet and transfer history; the deposit requests you submit, including the asset, the network, the amount, and any transfer reference you enter; and the digital-asset withdrawal addresses you save, together with their network and any label you give them.',
            'Device and network information. Device model, operating system version, app version, language setting, and the network information needed to keep the service running.',
            'Log information. Sign-in times, records of routine activity, and similar service logs.',
            'We do not use SMS verification codes, we do not collect email addresses, we do not read the contacts stored on your device, and we do not collect your precise location.',
          ],
        },
        {
          title: '2. How we use this information',
          body: [
            'To run the service — registration and sign-in, message delivery and multi-device sync, contact and group management, Moments, voice and video calls, and wallet features.',
            'To keep accounts secure — detecting unusual sign-ins and guarding against account takeover, spam, fraud, and money laundering.',
            'To meet our legal obligations — reviewing and, where required, tracing content on the platform as applicable law demands.',
            'To respond to you — verifying and handling support requests, feedback, and deposit and withdrawal requests.',
            'To maintain and improve the app — diagnosing faults, fixing defects, and supporting different devices and operating system versions.',
            'We do not use your information for advertising, profiling, or cross-app tracking.',
          ],
        },
        {
          title: '3. Where your data is stored and for how long',
          body: [
            'Where it is stored. Accounts, messages, Moments, and wallet records are held on servers we run and administer ourselves. We do not use a third-party cloud database as our storage layer.',
            'Attachments. Photos, voice notes, videos, and files sent in messages remain on our servers for 365 days and are then deleted automatically. The message itself remains, but the attachment can no longer be downloaded.',
            'While your account is open. Account details and message history are retained for as long as your account exists.',
            'After you delete your account. We erase your profile, contacts, group memberships, Moments, and related records. Where applicable law requires us to keep certain records, such as wallet transactions, we retain only the minimum necessary for the period the law prescribes.',
            'Logs. Sign-in and activity logs are kept only for as long as they are needed for security auditing.',
          ],
        },
        {
          title: '4. When we share information',
          body: [
            'We do not sell, rent, or trade your personal information. We share only what is necessary, and only in these circumstances:',
            "Push notifications. On Android, notifications are delivered through Google Firebase Cloud Messaging (FCM); in browsers and PWAs, through the Web Push service operated by your browser vendor. A notification may include the sender's name and a preview of the message. You can turn notifications off in your system settings.",
            "Network access. Traffic between your device and our servers is routed through Cloudflare's network transport service, which handles transport and access protection only.",
            'Voice and video. Call media is carried by our own LiveKit deployment. It is not routed through a third-party calling platform.',
            'Deposit and withdrawal review. The deposit requests you submit and the withdrawal addresses you save are used only to review and settle those requests, and are visible only to authorized staff on a need-to-know basis.',
            'Legal requests. We may disclose information where applicable law requires it, or where an authority requests it through due legal process.',
            'The app contains no third-party SDK for advertising, analytics, or behavioural tracking.',
          ],
        },
        {
          title: '5. Security and access control',
          body: [
            'In transit. All traffic between the app and our servers is encrypted with TLS.',
            'At rest. Passwords are stored only after one-way cryptographic processing. The withdrawal addresses you save are encrypted and decrypted only during review.',
            'Access control. Server data is accessed on a least-privilege basis, and access is logged for audit.',
            'We take reasonable technical and organisational measures to protect your information, but no system can be guaranteed to be completely secure.',
          ],
        },
        {
          title: '6. Your choices and rights',
          body: [
            'Access and correction. You can view and change your display name, profile photo, and bio in the app. Your username and phone number cannot be changed after registration.',
            'Account recovery. You can reset your password using your security question and phone number.',
            'Deleting content. You can delete the Moments you have posted and clear conversations stored on your device.',
            'Deleting your account. You can request account deletion in Settings. Your data is then handled as described in section 3, and the deletion cannot be reversed.',
            'Withdrawing permissions. You can revoke photo library, camera, microphone, and notification permissions in your system settings. The related features stop working when you do.',
            'Getting in touch. You can contact us using the details in section 9.',
            'Because of how FizzChat is designed, there is no way to save or transfer a conversation outside the app and no way to create a shareable public link. Moments are visible only to your contacts and cannot be shared outside the app.',
          ],
        },
        {
          title: '7. Children',
          body: [
            "FizzChat is not directed to children under 13, or under the higher minimum age that applies where you live (for example 14 or 16 in some regions). If you are under 18, use the app and provide your information only with the consent and guidance of a parent or guardian. If we learn that we have collected a minor's information without that consent, we will delete it promptly.",
          ],
        },
        {
          title: '8. Changes to this policy',
          body: [
            'We may update this policy as the service changes or as the law requires. The current version is always published on this page, with the effective date updated. Where a change materially affects your rights, we will tell you in advance through an in-app notice or another prominent means.',
          ],
        },
        {
          title: '9. Contact us',
          body: [
            'If you have questions, comments, or complaints about this policy, write to us at:',
            'privacy@fizzchat.cc',
            'We reply within 15 business days.',
          ],
        },
      ],
    },
    terms: {
      title: 'Terms of Service',
      updatedLabel: 'Last updated',
      updatedDate: 'September 23, 2026',
      intro:
        'Welcome to FizzChat. These Terms of Service (“Terms”) form the agreement between you and the operator of FizzChat (“we”, “us”) governing your use of the app. By registering an account, signing in, or otherwise using FizzChat, you confirm that you have read, understood, and accepted these Terms and our Privacy Policy. If you do not accept them, please stop using the app.',
      backHome: 'Back to home',
      sections: [
        {
          title: '1. The service',
          body: [
            'FizzChat is an invitation-only messaging service offering one-to-one and group chats, Moments, voice and video calls, and wallet features including deposits, red packets, transfers, and withdrawals. It is built for private conversation between people who already know each other, and it deliberately offers no way to share content outside the app, save it elsewhere, or publish it to a public link.',
          ],
        },
        {
          title: '2. Your account',
          body: [
            'Registration is by invitation. You need a valid invitation code, and you register with a username, display name, phone number, password, and a security question and answer.',
            'We do not use SMS verification codes, and you cannot register with an email address. Your phone number exists solely to recover your account and cannot be changed after registration.',
            'Register with accurate information that is genuinely yours. Do not use false details or impersonate anyone else.',
            'One username corresponds to one account, and a phone number may be linked to only one account.',
            'Keep your account, password, and security answer to yourself. Anything done through your account is treated as done by you, and losses caused by disclosing your credentials or failing to protect them are yours to bear.',
            'The account belongs to the operator of FizzChat; you hold a right to use it. You may not transfer, lend, rent, or sell it.',
            'You may request deletion of your account at any time in Settings. We then handle your data as set out in the Privacy Policy. Deletion cannot be reversed, so settle any remaining balance before you request it.',
            'We may introduce rules for accounts that have gone unused for a long period. If we do, we will announce them before they take effect.',
            'If you breach these Terms, we may warn you, restrict features, suspend the service, or close your account permanently, according to the seriousness of the breach. Where the breach is severe or the law requires immediate action, we may act without notice.',
          ],
        },
        {
          title: '3. Acceptable use',
          body: [
            'You must comply with the laws of the country or region where you are, respect public order and decency, and use FizzChat responsibly. You must not use FizzChat to:',
            'publish content that endangers national security or that incites hatred, discrimination, terrorism, or violent extremism;',
            'publish pornographic, obscene, violent, or gratuitously graphic content, or anything else contrary to public decency;',
            'publish fraudulent material, pyramid schemes, gambling, drug dealing, illegal fundraising, or comparable unlawful information;',
            'harass, abuse, attack, threaten, stalk, or otherwise subject anyone to online abuse;',
            'send spam, advertising, or unsolicited bulk messages;',
            "infringe anyone's intellectual property, image rights, reputation, privacy, or other lawful interests;",
            'impersonate anyone, including our staff, official accounts, or other users;',
            'use red packets, transfers, or any other wallet feature for money laundering, fraud, gambling, cashing out, or other unlawful financial activity;',
            'access, scrape, or operate the app through bots, crawlers, or modified clients, or reverse engineer, decompile, or crack it;',
            "work around the app's product limits in order to move another person's messages or Moments outside FizzChat.",
          ],
        },
        {
          title: '4. Your content',
          body: [
            'You are solely responsible for everything you publish, send, or transmit through FizzChat.',
            'You keep the rights in your content. To operate the service, you grant us a limited, non-exclusive technical licence to store, transmit, cache, back up, and display that content to the audience you have chosen. The licence ends when you delete the content or your account, except for records we are required by law to retain.',
            'Moments are visible only to your contacts. FizzChat provides no way to share a Moment or save a conversation outside the app.',
            'To keep the service safe and to meet our legal obligations, we may take the measures we consider necessary against unlawful or prohibited content, in line with these Terms and the Privacy Policy.',
          ],
        },
        {
          title: '5. Wallet, red packets, and transfers',
          body: [
            'Balance. Your balance changes as you deposit, send and receive transfers and red packets, and withdraw. The wallet features available to you are those offered in the app at the time. Balances do not earn interest.',
            "Red packets. Once a red packet is sent, its total amount and the number of shares are fixed. The system splits it into random shares in advance, and shares are claimed first come, first served. Claims are final. Any share left unclaimed when the red packet expires is returned to the sender's balance.",
            'Transfers. A transfer moves funds from one account to another. Once sent, it cannot be reversed unilaterally.',
            'Deposits. You can add funds to your account using the methods offered in the app. Follow the prompts to pick the asset and the network, then send the asset to the address shown. If the network or the asset you send differs from the one you picked, those funds may be impossible to recover. Every deposit request is reviewed; the amount added to your balance is converted at the rate applying when the request is reviewed, and the amount actually credited governs.',
            'Withdrawals. You must save a valid digital-asset address and confirm that its network is correct. An incorrect address or network may make the funds impossible to recover. Every withdrawal request is reviewed. The amount must meet the published minimum and a fee is charged at the published rate. Once approved, the funds are sent to the address you supplied. Arrival times depend on processing.',
            'Published parameters. The maximum amount and number of shares per red packet, the red packet expiry period, the assets and networks available for deposits, the per-deposit limits, the minimum withdrawal, and the withdrawal fee rate are all published in the app. We may adjust them for risk-control or operational reasons and will publish any change.',
            'Risk control. Where an account is suspected of money laundering, fraud, gambling, cashing out, or artificially inflated activity, we may suspend its wallet features, hold the funds involved, and pursue legal remedies.',
            "FizzChat's wallet features are not a savings, investment, credit, or payment settlement service.",
          ],
        },
        {
          title: '6. Changes to the service and termination',
          body: [
            'We may adjust, add to, or remove features, screens, or parts of the service as the business, the technology, or the law requires, and will give users reasonable notice.',
            'We may suspend or end all or part of the service where you breach these Terms, where servers are being maintained or upgraded, where an event beyond our control or a third party prevents us from operating, or where the law requires it.',
            'If we decide to shut FizzChat down, we will announce it prominently at least 30 days in advance and make appropriate arrangements for user data and account balances.',
            'Ending these Terms does not release you from responsibility for what you did beforehand. The sections on content responsibility, disclaimers, limitation of liability, and dispute resolution survive termination.',
          ],
        },
        {
          title: '7. Disclaimers and limitation of liability',
          body: [
            'FizzChat is provided “as is” and “as available”. We make no express or implied warranty as to its stability, availability, accuracy, or timeliness.',
            'We are not liable for interruptions or data loss caused by network or hardware failure, power outage, maintenance, or events beyond our control, though we will make reasonable efforts to restore service.',
            'Conversations, transfers, and red packets between users are their own dealings and their own responsibility. We provide the technical means under section 5 and nothing more.',
            'We are not responsible for third-party services, third-party content, or third-party links.',
            'To the fullest extent permitted by law, our total liability to you will not exceed the total amount you have paid us directly for using FizzChat.',
          ],
        },
        {
          title: '8. Governing law and disputes',
          body: [
            'These Terms are governed by the laws of the place where you live. Nothing in these Terms limits any rights you have under the mandatory laws of that place.',
            'Any dispute arising out of or relating to these Terms should first be settled through good-faith discussion. Failing that, either party may bring the dispute before a competent court in the place where you live.',
            'If any provision of these Terms is held invalid or unenforceable, the remaining provisions stay in force.',
          ],
        },
        {
          title: '9. Changes to these Terms',
          body: [
            'We may update these Terms as the service changes or as the law requires. The current version is always published on this page, with the effective date updated. We will give advance notice of material changes through an in-app notice or another prominent means. Continuing to use FizzChat after an update takes effect means you accept the updated Terms.',
          ],
        },
        {
          title: '10. Contact us',
          body: [
            'If you have questions, comments, or complaints about these Terms, write to us at:',
            'privacy@fizzchat.cc',
            'We reply within 15 business days.',
          ],
        },
      ],
    },  },
};

export function detectInitialLang(): Lang {
  if (typeof window === 'undefined') return 'zh';
  const stored = window.localStorage.getItem('lang');
  if (stored === 'zh' || stored === 'en') return stored;
  const nav = (window.navigator.language || '').toLowerCase();
  return nav.startsWith('zh') ? 'zh' : 'en';
}
