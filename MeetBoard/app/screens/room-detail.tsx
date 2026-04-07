// app/screens/room-detail.tsx
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router"; // Expo Router核心Hook
import TextLabel from "../../components/common/TextLabel";
import MeetingStatusBanner from "../../components/common/MeetingStatusBanner";
import InfoRow from "../../components/common/InfoRow";
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
  const handleScreenClick = () => {
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
    <View style={styles.container}>
      {/* 顶部标题栏 */}
      <View style={styles.header}>
        <TextLabel
          color={Colors.white}
          fontSize={Fonts.screenTitle}
          fontWeight={FontWeights.bold}
          style={styles.meetingName}
        >
          {roomInfo.roomName}
        </TextLabel>

        <View style={styles.meetingTimeInfo}>
          <TextLabel color={Colors.white} fontSize={24}>
            10:30
          </TextLabel>
          <TextLabel color={Colors.white} fontSize={24}>
            04月03日
          </TextLabel>
          <TextLabel color={Colors.white} fontSize={24}>
            星期四
          </TextLabel>
        </View>
      </View>

      {/* 会议信息展示区域 */}
      <View style={styles.meetingContainer} onTouchEnd={handleScreenClick}>
        <ScrollView
          style={styles.scrollContent}
          contentContainerStyle={styles.scrollInner}
          showsVerticalScrollIndicator={false}
        >
        {/* 左侧：当前会议 */}
        <View style={styles.currentMeeting}>
          <MeetingStatusBanner status="active" />

          <View style={styles.meetingInfo}>
            <InfoRow title="会议时间" description="10:00—12:00" />
            <InfoRow
              title="会议主题"
              description="北京分公司2026年第一季度经营分析会 第一次会议"
            />
            <InfoRow title="预约人" description="王阳" />
          </View>
        </View>

        {/* 右侧：下一场会议列表 */}
        <View style={styles.upcomingMeetings}>
          <TextLabel
            color={Colors.textDark}
            fontSize={28}
            fontWeight={FontWeights.bold}
            style={styles.upcomingTitle}
          >
            下一场会议
          </TextLabel>

          <View style={styles.meetingList}>
            <View style={styles.meetingItem}>
              <TextLabel
                color={Colors.textDark}
                fontSize={20}
                style={styles.itemTitle}
              >
                研发部软件新增功能讲解...
              </TextLabel>
              <TextLabel color={Colors.grayMedium} fontSize={18}>
                10:50-12:30 | 美成锴
              </TextLabel>
            </View>

            <View style={styles.meetingItem}>
              <TextLabel
                color={Colors.textDark}
                fontSize={20}
                style={styles.itemTitle}
              >
                销售部用业绩汇报会议
              </TextLabel>
              <TextLabel color={Colors.grayMedium} fontSize={18}>
                11:40-12:40 | 周城员
              </TextLabel>
            </View>

            <View style={styles.meetingItem}>
              <TextLabel
                color={Colors.textDark}
                fontSize={20}
                style={styles.itemTitle}
              >
                技术部产品破件培训会议
              </TextLabel>
              <TextLabel color={Colors.grayMedium} fontSize={18}>
                14:00-15:30 | 王炜
              </TextLabel>
            </View>

            <View style={styles.meetingItem}>
              <TextLabel
                color={Colors.textDark}
                fontSize={20}
                style={styles.itemTitle}
              >
                人事部新人培训会
              </TextLabel>
              <TextLabel color={Colors.grayMedium} fontSize={18}>
                15:50-16:50 | 情长凤
              </TextLabel>
            </View>
          </View>
        </View>
        </ScrollView>
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
    backgroundColor: Colors.primaryBlue,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
    fontSize: Fonts.screenTitle,
    lineHeight: Spacing.screenSectionGap,
  },
  meetingName: {
    lineHeight: Spacing.screenSectionGap,
  },
  meetingTimeInfo: {
    display: "flex",
    flexDirection: "row",
    gap: Spacing.md,
  },
  meetingContainer: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  scrollContent: {
    flex: 1,
  },
  scrollInner: {
    flexDirection: "row",
    gap: Spacing.lg,
    flexGrow: 1,
  },
  currentMeeting: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 8,
    overflow: "hidden",
  },
  meetingInfo: {
    padding: Spacing.lg,
    gap: Spacing.lg,
  },
  upcomingMeetings: {
    width: 320,
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: Spacing.lg,
  },
  upcomingTitle: {
    marginBottom: Spacing.md,
  },
  meetingList: {
    gap: Spacing.md,
  },
  meetingItem: {
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayLight,
    gap: Spacing.xs,
  },
  itemTitle: {
    fontWeight: FontWeights.medium,
  },
  resetBtn: {
    position: "absolute",
    bottom: Spacing.xxl,
    right: Spacing.xxl,
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
    backgroundColor: Colors.primaryBlue,
  },
  backBtn: {
    marginTop: Spacing.lg,
    backgroundColor: Colors.primaryBlue,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: 4,
  },
});
