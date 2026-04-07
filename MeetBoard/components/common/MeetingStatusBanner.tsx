import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import TextLabel from "./TextLabel";
import { Colors } from "../../constants/Colors";
import { Spacing } from "../../constants/Spacing";
import { FontWeights } from "../../constants/Fonts";

type MeetingStatus = "active" | "idle";

interface MeetingStatusBannerProps {
  status: MeetingStatus;
}

export default function MeetingStatusBanner({
  status,
}: MeetingStatusBannerProps) {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const blinkAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );

    blinkAnimation.start();

    return () => blinkAnimation.stop();
  }, [opacity]);

  const isActive = status === "active";
  const bgColor = isActive ? Colors.redActive : Colors.grayMedium;
  const text = isActive ? "会议进行中" : "无会议";

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Animated.View style={[styles.dot, { opacity }]} />
      <TextLabel
        color={Colors.white}
        fontSize={40}
        fontWeight={FontWeights.bold}
      >
        {text}
      </TextLabel>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    gap: Spacing.md,
    margin: Spacing.lg,
    borderRadius: 8,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.white,
  },
});
