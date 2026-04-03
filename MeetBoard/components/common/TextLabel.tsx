import { Text, StyleSheet, TextStyle } from "react-native";
import { Colors } from "../../constants/Colors";
import { Fonts, FontWeights } from "../../constants/Fonts";

// 文字组件Props
interface TextLabelProps {
  children: React.ReactNode;
  style?: TextStyle;
  color?: string;
  fontSize?: number;
  fontWeight?: "bold" | "500" | "400";
}

export default function TextLabel({
  children,
  style,
  color = Colors.white,
  fontSize = Fonts.content,
  fontWeight = FontWeights.regular,
}: TextLabelProps) {
  return (
    <Text style={[styles.text, { color, fontSize, fontWeight }, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    lineHeight: 22, // 统一行高，避免文字错位
  },
});
