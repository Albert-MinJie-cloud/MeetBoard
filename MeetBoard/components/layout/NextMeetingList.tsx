import { View, StyleSheet, FlatList } from "react-native";
import MeetingCard from "../common/MeetingCard";
import TextLabel from "../common/TextLabel";
import { Colors } from "../../constants/Colors";
import { Fonts, FontWeights } from "../../constants/Fonts";
import { Spacing } from "../../constants/Spacing";

// 单场会议数据类型
interface MeetingItemProps {
  id: string; // 唯一标识
  name: string; // 会议名称
  time: string; // 会议时间+负责人（如10:50-12:30 | 美成稗）
}

// 会议列表Props
interface NextMeetingListProps {
  meetings: MeetingItemProps[]; // 会议列表数据
}

// 单条会议项组件
const MeetingItem = ({ item }: { item: MeetingItemProps }) => (
  <View style={styles.meetingItem}>
    <TextLabel
      color={Colors.primaryBlue}
      fontSize={Fonts.content}
      fontWeight={FontWeights.medium}
    >
      {item.name}
    </TextLabel>
    <TextLabel
      color={Colors.grayLight}
      fontSize={Fonts.small}
      style={styles.meetingTime}
    >
      {item.time}
    </TextLabel>
  </View>
);

export default function NextMeetingList({ meetings }: NextMeetingListProps) {
  return (
    <MeetingCard style={styles.wrapper}>
      <TextLabel
        color={Colors.primaryBlue}
        fontSize={Fonts.subTitle}
        fontWeight={FontWeights.bold}
        style={styles.title}
      >
        下一场会议
      </TextLabel>

      {/* 会议列表 */}
      <FlatList
        data={meetings}
        renderItem={(i: { item: MeetingItemProps }) => {
          return <MeetingItem item={i.item} />;
        }}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false} // 隐藏滚动条
        style={styles.list}
      />
    </MeetingCard>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 2,
  },
  title: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayBorder,
    paddingBottom: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  list: {
    flex: 1,
  },
  meetingItem: {
    marginBottom: Spacing.md,
  },
  meetingTime: {
    marginTop: Spacing.xs,
  },
});
