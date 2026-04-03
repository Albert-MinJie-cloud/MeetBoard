export type FontWeightType = "bold" | "500" | "400";

export const FontWeights = {
  bold: "bold" as const,
  medium: "500" as const,
  regular: "400" as const,
} satisfies Record<string, FontWeightType>;

// 投屏界面字号（按1080P横屏投屏设备适配）
export const Fonts = {
  title: 28, // 大标题（会议进行中）
  subTitle: 20, // 子标题（会议主题/下一场会议）
  content: 16, // 内容文字（时间/预约人）
  small: 14, // 小文字（会议列表辅助信息）
  screenTitle: 52, // 页面主标题
  roomCardTitle: 26, // 会议室卡片标题
};


