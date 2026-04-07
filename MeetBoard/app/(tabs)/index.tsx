// app/(tabs)/index.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useMeetingRoomLogic } from "../../hooks/useMeetingRoomLogic";
import { GlobalLoading } from "../../components/GlobalState";
import { getRoomInfo } from "../../utils/StorageService";
import { Colors } from "../../constants/Colors";

export default function MeetBoardMain() {
  const router = useRouter();
  const { loading } = useMeetingRoomLogic();

  // 初始化：校验缓存并跳转对应页面
  React.useEffect(() => {
    const initRouter = async () => {
      const cachedRoomInfo = await getRoomInfo();
      if (cachedRoomInfo) {
        // 有缓存：跳转详情页
        router.replace({
          pathname: "/screens/room-detail",
          params: cachedRoomInfo,
        });
      } else {
        // 无缓存：跳转选择页
        router.replace("/screens/room-select");
      }
    };

    if (!loading) {
      initRouter();
    }
  }, [loading, router]);

  // 全局加载中
  if (loading) {
    return <GlobalLoading />;
  }

  // 加载完成后由路由跳转，此处仅占位
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBlue,
  },
});
