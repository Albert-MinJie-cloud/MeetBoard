import React from "react";
import { View, StyleSheet } from "react-native";
import TextLabel from "./TextLabel";
import { Colors } from "../../constants/Colors";
import { Spacing } from "../../constants/Spacing";
import { FontWeights } from "../../constants/Fonts";

interface InfoRowProps {
  title: string;
  description: string;
}

export default function InfoRow({ title, description }: InfoRowProps) {
  return (
    <View style={styles.container}>
      <TextLabel
        color={Colors.textDark}
        fontSize={20}
        fontWeight={FontWeights.medium}
      >
        {title}
      </TextLabel>
      <TextLabel color={Colors.textDark} fontSize={24}>
        {description}
      </TextLabel>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.sm,
  },
});
