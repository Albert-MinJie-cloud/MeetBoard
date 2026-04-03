// constants/Config.ts
// 接口地址
export const API_CONFIG = {
  MEETING_ROOM_LIST: "http://localhost:3001/api/meeting-rooms", // 会议室列表接口
  MEETING_LIST: "http://localhost:3001/api/meetings", // 会议列表接口
  CURRENT_MEETING: "http://localhost:3001/api/meetings", // 当前会议接口
  TIMEOUT: 10000, // 接口超时时间（10秒）
};

// 本地存储KEY
export const STORAGE_KEYS = {
  ROOM_INFO: "meetboard_room_info", // 会议室信息缓存KEY
};

// 调试触发配置
export const DEBUG_CONFIG = {
  CLICK_COUNT: 5, // 连续点击次数触发重置
  CLICK_INTERVAL: 2000, // 点击有效时间窗口（2秒）
};
