// app/screens/room-detail.tsx
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router"; // Expo Router核心Hook
import TextLabel from "../../components/common/TextLabel";
import { RoomInfo, clearRoomInfo } from "../../utils/StorageService";
import { DEBUG_CONFIG } from "../../constants/Config";
import { Colors } from "../../constants/Colors";
import { Spacing } from "../../constants/Spacing";
import { Fonts, FontWeights } from "../../constants/Fonts";

// Expo Router页面，通过searchParams接收会议室信息
export default function RoomDetailScreen() {
  // 1. Expo Router路由实例
  const router = useRouter();
  // 2. 获取路由参数（从选择页传递的会议室信息）
  const params = useLocalSearchParams<RoomInfo>();
  const roomInfo: RoomInfo = {
    roomId: params.roomId || "",
    roomName: params.roomName || "",
  };

  // 3. 调试重置：连续点击计数逻辑
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  // 4. 核心重置逻辑（清除缓存+跳转选择页）
  const handleResetRoom = async () => {
    // 清除本地缓存
    await clearRoomInfo();
    // Expo Router跳转至选择页（替换历史记录，避免返回）
    router.replace("/screens/room-select");
  };

  // 5. 连续点击屏幕触发重置（调试用）
  const handleScreenClick = (e: GestureResponderEvent) => {
    const now = Date.now();
    // 超出2秒时间窗口，重置计数
    if (now - lastClickTime > DEBUG_CONFIG.CLICK_INTERVAL) {
      setClickCount(1);
      setLastClickTime(now);
      return;
    }

    // 累计点击次数
    const newCount = clickCount + 1;
    setClickCount(newCount);
    setLastClickTime(now);

    // 达到5次点击，触发重置
    if (newCount >= DEBUG_CONFIG.CLICK_COUNT) {
      handleResetRoom();
      setClickCount(0); // 重置计数
    }
  };

  // 6. 空参数兜底（防止异常）
  if (!roomInfo.roomId || !roomInfo.roomName) {
    return (
      <View style={styles.errorWrapper}>
        <TextLabel
          color={Colors.redActive}
          fontSize={Fonts.subTitle}
          fontWeight={FontWeights.medium}
        >
          会议室信息异常，请重新选择
        </TextLabel>
        <TouchableOpacity style={styles.backBtn} onPress={handleResetRoom}>
          <TextLabel color={Colors.white} fontSize={Fonts.content}>
            返回选择页
          </TextLabel>
        </TouchableOpacity>
      </View>
    );
  }

  // 7. 正常渲染详情页
  return (
    <View style={styles.container} onPress={handleScreenClick}>
      {/* 会议室核心信息展示 */}
      <View style={styles.infoWrapper}>
        <TextLabel
          color={Colors.white}
          fontSize={Fonts.title}
          fontWeight={FontWeights.bold}
          style={styles.roomName}
        >
          {roomInfo.roomName}
        </TextLabel>
        <TextLabel
          color={Colors.grayLight}
          fontSize={Fonts.content}
          style={styles.roomId}
        >
          会议室ID：{roomInfo.roomId}
        </TextLabel>

        {/* 可选：添加会议室实时状态、预约信息等扩展内容 */}
        <View style={styles.statusWrapper}>
          <TextLabel
            color={Colors.redActive}
            fontSize={Fonts.content}
            style={styles.statusText}
          >
            设备在线
          </TextLabel>
        </View>
      </View>

      {/* 常规重置按钮（固定底部右侧，Expo Router适配） */}
      <TouchableOpacity
        style={styles.resetBtn}
        onPress={handleResetRoom}
        activeOpacity={0.8} // Expo触控反馈优化
      >
        <TextLabel
          color={Colors.white}
          fontSize={Fonts.content}
          fontWeight={FontWeights.medium}
        >
          重置会议室
        </TextLabel>
      </TouchableOpacity>
    </View>
  );
}

// 样式适配Expo设备展示
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDark,
    padding: Spacing.lg,
    justifyContent: "center",
  },
  infoWrapper: {
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  roomName: {
    marginBottom: Spacing.sm,
    textAlign: "center",
  },
  roomId: {
    fontSize: Fonts.content,
    marginBottom: Spacing.lg,
  },
  statusWrapper: {
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: "rgba(0, 180, 0, 0.2)",
    borderRadius: 4,
  },
  statusText: {
    fontWeight: FontWeights.medium,
  },
  resetBtn: {
    position: "absolute",
    bottom: Spacing.lg,
    right: Spacing.lg,
    backgroundColor: Colors.primaryBlue,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 4,
    elevation: 2, // Expo安卓阴影优化
  },
  errorWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.lg,
    backgroundColor: Colors.bgDark,
  },
  backBtn: {
    marginTop: Spacing.lg,
    backgroundColor: Colors.primaryBlue,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: 4,
  },
});
