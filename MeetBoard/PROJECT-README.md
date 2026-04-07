---

MeetBoard/
├── app/ # Expo Router核心目录（路由/页面，Expo 49+推荐）
│ ├── (tabs)/ # 分组路由（无tab可保留空壳，便于后续扩展）
│ │ └── index.tsx # 会议看板首页（核心页面）
│ ├── \_layout.tsx # 全局布局（配置横屏、主题、全局状态）
│ └── error.tsx # 全局错误页面（投屏异常兜底）
├── assets/ # 静态资源（Expo默认目录）
│ ├── fonts/ # 自定义字体（投屏界面统一字体）
│ ├── images/ # 图片资源（如公司logo、会议状态图标）
│ └── splash.png # 启动页（投屏设备启动时展示）
├── components/ # 通用组件（复用性强的UI组件）
│ ├── common/ # 基础组件
│ │ ├── MeetingCard.tsx # 会议卡片组件（当前/下一场会议通用）
│ │ ├── TextLabel.tsx # 统一文字组件（适配投屏字号）
│ │ └── Container.tsx # 通用容器（横屏/竖屏适配）
│ └── layout/ # 布局组件
│ ├── CurrentMeeting.tsx # 左侧当前会议模块
│ └── NextMeetingList.tsx # 右侧下一场会议列表
├── constants/ # 常量配置（替代零散的变量文件）
│ ├── Colors.ts # 颜色常量（投屏主题色）
│ ├── Fonts.ts # 字体常量（字号/字重）
│ ├── Spacing.ts # 间距常量
│ └── Api.ts # 接口常量（飞书API地址/配置）
├── hooks/ # 自定义Hooks（逻辑复用）
│ ├── useMeetingRoomLogic.ts # 获取会议室信息
├── utils/ # 工具函数
│ ├── dateFormat.ts # 日期时间格式化（适配会议时间展示）
│ ├── storage.ts # 本地缓存（AsyncStorage封装）
│ └── errorHandler.ts # 异常处理（接口报错/投屏适配异常）
├── app.json # Expo核心配置（名称、权限、横屏等）
├── app.config.js # 环境配置（区分开发/生产环境）
├── babel.config.js # Babel配置（Expo默认）
├── metro.config.js # Metro打包配置（如需扩展）
└── package.json # 依赖配置

---
