// app/screens/room-select.tsx
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router"; // Expo Router路由Hook
import TextLabel from "../../components/common/TextLabel";
import {
  GlobalLoading,
  EmptyData,
  ErrorState,
} from "../../components/GlobalState";
import {
  useMeetingRoomLogic,
  MeetingRoomItem,
} from "../../hooks/useMeetingRoomLogic";
import { Colors } from "../../constants/Colors";
import { Spacing } from "../../constants/Spacing";
import { Fonts, FontWeights } from "../../constants/Fonts";

export default function RoomSelectScreen() {
  // 1. Expo Router路由实例
  const router = useRouter();
  // 2. 调用核心业务Hook
  const {
    loading,
    roomList,
    isEmpty,
    errorMsg,
    fetchRoomList,
    selectRoom: saveRoomInfo, // 重命名为存储逻辑
  } = useMeetingRoomLogic();

  // 3. 选择会议室：存储+跳转详情页（Expo Router传参）
  const handleSelectRoom = async (room: MeetingRoomItem) => {
    // 存储会议室信息到本地
    await saveRoomInfo(room);
    // Expo Router跳转详情页，并传递参数
    router.push({
      pathname: "/screens/room-detail",
      params: {
        roomId: room.id,
        roomName: room.name,
      },
    });
  };

  // 加载中
  if (loading) return <GlobalLoading />;

  // 空数据
  if (isEmpty) return <EmptyData onRefresh={fetchRoomList} />;

  // 接口异常
  if (errorMsg)
    return <ErrorState message={errorMsg} onRefresh={fetchRoomList} />;

  // 渲染会议室列表
  const renderRoomItem = ({ item }: { item: MeetingRoomItem }) => (
    <TouchableOpacity
      style={styles.roomItem}
      onPress={() => handleSelectRoom(item)}
      activeOpacity={0.9} // Expo触控反馈
    >
      <TextLabel
        color={Colors.bgDark}
        fontSize={Fonts.subTitle}
        fontWeight={FontWeights.medium}
      >
        {item.name}
      </TextLabel>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextLabel
        color={Colors.white}
        fontSize={Fonts.title}
        fontWeight={FontWeights.bold}
        style={styles.title}
      >
        选择会议室
      </TextLabel>
      <FlatList
        data={roomList}
        renderItem={renderRoomItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent} // Expo列表内边距优化
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDark,
    padding: Spacing.lg,
  },
  title: {
    marginBottom: Spacing.lg,
    textAlign: "center",
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: Spacing.xl, // 避免列表底部被遮挡
  },
  roomItem: {
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: 8,
    marginBottom: Spacing.sm,
    elevation: 1, // Expo安卓阴影
  },
});
