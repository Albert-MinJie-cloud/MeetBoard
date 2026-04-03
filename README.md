# MeetBoard

MeetBoard 是一个基于 Expo + React Native 的会议室投屏应用，用于在会议室大屏上展示会议信息。

核心架构

技术栈：

- Expo SDK 54 + React Native 0.81
- Expo Router 6（文件路由）
- TypeScript
- AsyncStorage（本地缓存）
- Axios（网络请求）

路由结构：
app/(tabs)/index.tsx → 启动页（检查缓存并路由分发）
app/screens/room-select.tsx → 会议室选择页
app/screens/room-detail.tsx → 会议室详情页（投屏主界面）

业务流程

1. 启动逻辑（index.tsx）：
   - 检查本地是否有缓存的会议室信息
   - 有缓存 → 直接进入详情页
   - 无缓存 → 跳转到选择页

2. 选择会议室（room-select.tsx）：
   - 从后端获取会议室列表
   - 用户选择后存储到 AsyncStorage
   - 跳转到详情页

3. 详情页（room-detail.tsx）：
   - 展示当前会议室信息
   - 支持重置功能（清除缓存，返回选择页）
   - 隐藏调试功能：连续点击屏幕5次触发重置

核心模块

useMeetingRoomLogic Hook（hooks/useMeetingRoomLogic.ts）：

- 统一管理会议室状态（loading、列表、错误）
- 封装接口请求、缓存读写、重置逻辑
- 初始化时自动检查缓存

StorageService（utils/StorageService.ts）：

- 基于 AsyncStorage 的会议室信息持久化
- 提供 save/get/clear 三个方法

GlobalState 组件（components/GlobalState/index.tsx）：

- 全局 Loading、空数据、错误状态的统一 UI

配置文件

Config.ts：

- API 接口地址（目前是占位符）
- 本地存储 KEY
- 调试配置（连续点击次数/时间窗口）

app.config.js：

- 飞书 API 地址配置（生产/开发环境）

当前状态

已完成：

- ✅ 基础路由架构
- ✅ 会议室选择/详情页面
- ✅ 本地缓存机制
- ✅ 全局状态管理
- ✅ 调试重置功能

待完成：

- ⚠️ 后端接口对接（API_CONFIG.MEETING_ROOM_LIST 是占位符）
- ⚠️ 会议数据展示（详情页目前只显示会议室名称）
- ⚠️ 飞书日历集成（services/meeting.ts 已注释）
- ⚠️ 定时刷新逻辑
- ⚠️ 横屏适配优化

设计亮点

1. 单一职责：Hook 负责业务逻辑，组件只负责 UI
2. 缓存优先：启动时优先读缓存，减少不必要的网络请求
3. 调试友好：隐藏的连续点击重置功能，方便现场调试
4. 类型安全：全面使用 TypeScript
