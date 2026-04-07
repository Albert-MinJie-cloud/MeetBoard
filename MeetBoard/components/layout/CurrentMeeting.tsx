import { View, StyleSheet } from "react-native";
import MeetingCard from "../common/MeetingCard";
import TextLabel from "../common/TextLabel";
import { Colors } from "../../constants/Colors";
import { Fonts, FontWeights } from "../../constants/Fonts";
import { Spacing } from "../../constants/Spacing";

// 当前会议数据类型
interface CurrentMeetingProps {
  time: string; // 会议时间（如10:00-12:00）
  title: string; // 会议主题
  organizer: string; // 预约人
}

export default function CurrentMeeting({
  time,
  title,
  organizer,
}: CurrentMeetingProps) {
  return (
    <MeetingCard style={styles.wrapper}>
      {/* 会议进行中标签 */}
      <TextLabel style={styles.activeTag}>
        <TextLabel
          fontSize={Fonts.title}
          fontWeight={FontWeights.bold}
          color={Colors.white}
        >
          会议进行中
        </TextLabel>
      </TextLabel>

      {/* 会议信息 */}
      <View style={styles.infoWrapper}>
        <TextLabel
          color={Colors.grayLight}
          fontSize={Fonts.content}
          style={styles.meetingTime}
        >
          {time}
        </TextLabel>

        <TextLabel
          color={Colors.primaryBlue}
          fontSize={Fonts.subTitle}
          fontWeight={FontWeights.medium}
          style={styles.meetingTitle}
        >
          {title}
        </TextLabel>

        <TextLabel color={Colors.grayLight} fontSize={Fonts.content}>
          预约人：{organizer}
        </TextLabel>
      </View>
    </MeetingCard>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 3,
    marginRight: Spacing.md,
  },
  activeTag: {
    backgroundColor: Colors.redActive,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  infoWrapper: {
    paddingHorizontal: Spacing.sm,
  },
  meetingTime: {
    marginBottom: Spacing.sm,
  },
  meetingTitle: {
    marginBottom: Spacing.md,
    lineHeight: 28,
  },
});
