// app/screens/room-select.tsx
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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
import { Fonts, FontWeights } from "../../constants/Fonts";
import { Spacing } from "../../constants/Spacing";

const SCREEN_WIDTH = Dimensions.get("window").width;
const COLUMNS = 4;
const CARD_SPACING = Spacing.lg;
const CONTAINER_PADDING = Spacing.screenPadding;
const CARD_WIDTH =
  (SCREEN_WIDTH - CONTAINER_PADDING * 2 - CARD_SPACING * (COLUMNS - 1)) /
  COLUMNS;

const maskRoomId = (roomId: string) => {
  if (roomId.length <= 10) return roomId;
  return `${roomId.slice(0, 4)}••••••${roomId.slice(-4)}`;
};

export default function RoomSelectScreen() {
  const router = useRouter();
  const {
    loading,
    roomList,
    isEmpty,
    errorMsg,
    fetchRoomList,
    selectRoom: saveRoomInfo,
  } = useMeetingRoomLogic();

  const handleSelectRoom = async (room: MeetingRoomItem) => {
    await saveRoomInfo(room);
    router.push({
      pathname: "/screens/room-detail",
      params: {
        roomId: room.id,
        roomName: room.name,
      },
    });
  };

  if (loading) return <GlobalLoading />;
  if (isEmpty) return <EmptyData onRefresh={fetchRoomList} />;
  if (errorMsg)
    return <ErrorState message={errorMsg} onRefresh={fetchRoomList} />;

  const renderRoomItem = ({
    item,
    index,
  }: {
    item: MeetingRoomItem;
    index: number;
  }) => {
    const isLastInRow = (index + 1) % COLUMNS === 0;
    return (
      <TouchableOpacity
        style={[styles.roomCard, !isLastInRow && styles.roomCardMargin]}
        onPress={() => handleSelectRoom(item)}
        activeOpacity={0.85}
      >
        <View style={styles.iconWrapper}>
          <Ionicons
            name="business-outline"
            size={42}
            color={Colors.primaryBlue}
          />
        </View>
        <View style={styles.cardContent}>
          <TextLabel
            color={Colors.primaryBlue}
            fontSize={Fonts.roomCardTitle}
            fontWeight={FontWeights.bold}
            style={styles.roomName}
          >
            {item.name}
          </TextLabel>
          <TextLabel
            color={Colors.grayLight}
            fontSize={Fonts.content}
            fontWeight={FontWeights.medium}
            style={styles.roomId}
          >
            Room ID: {maskRoomId(item.id)}
          </TextLabel>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TextLabel
        color={Colors.white}
        fontSize={Fonts.screenTitle}
        fontWeight={FontWeights.bold}
        style={styles.title}
      >
        选择会议室
      </TextLabel>
      <View style={styles.listWrapper}>
        <FlatList
          data={roomList}
          renderItem={renderRoomItem}
          keyExtractor={(item) => item.id}
          numColumns={COLUMNS}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.row}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBlue,
    paddingHorizontal: CONTAINER_PADDING,
    paddingTop: Spacing.screenSectionGap,
    paddingBottom: Spacing.screenSectionGap,
  },
  title: {
    textAlign: "center",
    lineHeight: Spacing.screenSectionGap,
    marginBottom: Spacing.screenSectionGap,
  },
  listWrapper: {
    flex: 1,
    justifyContent: "center",
  },
  listContent: {
    justifyContent: "center",
  },
  row: {
    marginBottom: CARD_SPACING,
  },
  roomCard: {
    width: CARD_WIDTH,
    minHeight: 164,
    backgroundColor: Colors.white,
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 22,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 6,
  },
  roomCardMargin: {
    marginRight: CARD_SPACING,
  },
  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(24, 144, 255, 0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 18,
    flexShrink: 0,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
  },
  roomName: {
    lineHeight: 34,
    marginBottom: 10,
  },
  roomId: {
    lineHeight: 22,
  },
});
