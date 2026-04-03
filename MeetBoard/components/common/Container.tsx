import { View, StyleSheet, ViewStyle } from "react-native";
import { Colors } from "../../constants/Colors";

// 通用容器Props
interface ContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  bgColor?: string;
}

export default function Container({
  children,
  style,
  bgColor = Colors.white,
}: ContainerProps) {
  return (
    <View style={[styles.container, { backgroundColor: bgColor }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
});
