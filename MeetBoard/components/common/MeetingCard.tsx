import { View, StyleSheet, ViewStyle } from "react-native";
import { Colors } from "../../constants/Colors";
import { Spacing } from "../../constants/Spacing";

// 会议卡片Props
interface MeetingCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function MeetingCard({ children, style }: MeetingCardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: Spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // 安卓阴影
  },
});
