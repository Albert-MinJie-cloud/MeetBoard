import { View, StyleSheet, Dimensions } from "react-native";
import Container from "../../components/common/Container";
import CurrentMeeting from "../../components/layout/CurrentMeeting";
import NextMeetingList from "../../components/layout/NextMeetingList";
import TextLabel from "../../components/common/TextLabel";

import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";

// 获取投屏设备屏幕尺寸（实时适配）
const { width, height } = Dimensions.get("window");

// 模拟飞书接口返回的会议数据（后续替换为真实接口）
const CURRENT_MEETING = {
  time: "10:00 — 12:00",
  title: "北京分公司2026年第一季度经营分析会 第一次会议",
  organizer: "王阳",
};

const NEXT_MEETINGS = [
  {
    id: "1",
    name: "研发部软件新增功能讲解",
    time: "10:50-12:30 | 美成稗",
  },
  {
    id: "2",
    name: "销售部用业绩汇报会议",
    time: "11:40-12:40 | 周城员",
  },
  {
    id: "3",
    name: "技术部产品破件均训会议",
    time: "14:00-15:30 | 王垾",
  },
  {
    id: "4",
    name: "人事部新人培训会",
    time: "15:50-16:50 | 隋长风",
  },
];

export default function MeetBoardScreen() {
  return (
    <Container bgColor={Colors.primaryBlue}>
      {/* 主状态栏 */}
      <TextLabel style={styles.mainStatus}>
        <TextLabel fontSize={Fonts.title}>三楼大会议室</TextLabel>

        <TextLabel style={styles.timeInfo}>
          <TextLabel fontSize={Fonts.title}>10:30</TextLabel>
          <TextLabel style={styles.currentDay}>04月03日</TextLabel>
          <TextLabel style={styles.currentWeek}>星期四</TextLabel>
        </TextLabel>
      </TextLabel>

      {/* 横屏左右布局：当前会议 + 下一场会议 */}
      <View style={styles.mainLayout}>
        {/* 左侧：当前会议 */}
        <CurrentMeeting
          time={CURRENT_MEETING.time}
          title={CURRENT_MEETING.title}
          organizer={CURRENT_MEETING.organizer}
        />

        {/* 右侧：下一场会议列表 */}
        <NextMeetingList meetings={NEXT_MEETINGS} />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  mainLayout: {
    flex: 1,
    flexDirection: "row", // 横屏左右分栏
    width: width - 80, // 减去Container的水平padding
    height: height,
  },
  mainStatus: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    width: width - 80, // 减去Container的水平padding
  },
  timeInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  currentDay: {
    marginLeft: 20,
  },
  currentWeek: {
    marginLeft: 20,
  },
});
