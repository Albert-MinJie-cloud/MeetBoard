// hooks/useMeetingRoomLogic.ts
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { API_CONFIG } from "../constants/Config";
import {
  getRoomInfo,
  saveRoomInfo,
  clearRoomInfo,
  RoomInfo,
} from "../utils/StorageService";

// 会议室列表项类型
export type MeetingRoomItem = {
  id: string;
  name: string;
};

// Hook返回类型
type UseMeetingRoomLogicReturn = {
  // 核心状态
  roomInfo: RoomInfo | null; // 已选中的会议室信息
  roomList: MeetingRoomItem[]; // 会议室列表数据
  loading: boolean; // 全局加载状态
  isEmpty: boolean; // 空数据标识
  errorMsg: string | null; // 错误信息
  // 操作方法
  fetchRoomList: () => Promise<void>; // 请求会议室列表
  selectRoom: (room: MeetingRoomItem) => Promise<void>; // 选择会议室
  resetRoomConfig: () => Promise<void>; // 重置会议室配置
};

/**
 * 会议室核心业务逻辑Hook
 */
export const useMeetingRoomLogic = (): UseMeetingRoomLogicReturn => {
  const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(null);
  const [roomList, setRoomList] = useState<MeetingRoomItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 1. 请求会议室列表接口
  const fetchRoomList = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);
    setIsEmpty(false);

    try {
      const response = await axios.get<MeetingRoomItem[]>(
        API_CONFIG.MEETING_ROOM_LIST,
        {
          timeout: API_CONFIG.TIMEOUT,
        },
      );

      const data = response.data || [];
      setRoomList(data);
      setIsEmpty(data.length === 0);
    } catch (err: any) {
      setErrorMsg(err.message || "网络异常，无法获取会议室列表");
      setRoomList([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. 选择会议室（存储+更新状态）
  const selectRoom = useCallback(async (room: MeetingRoomItem) => {
    const roomInfoData: RoomInfo = {
      roomId: room.id,
      roomName: room.name,
    };
    await saveRoomInfo(roomInfoData);
    setRoomInfo(roomInfoData);
  }, []);

  // 3. 重置会议室配置（清除缓存+重置状态）
  const resetRoomConfig = useCallback(async () => {
    await clearRoomInfo();
    setRoomInfo(null);
    // 重置后重新请求列表
    await fetchRoomList();
  }, [fetchRoomList]);

  // 4. 初始化逻辑（启动时校验缓存）
  useEffect(() => {
    const initApp = async () => {
      // 优先读取本地缓存
      const cachedRoomInfo = await getRoomInfo();

      if (cachedRoomInfo) {
        // 有缓存：直接进入详情页
        setRoomInfo(cachedRoomInfo);
        setLoading(false);
      } else {
        // 无缓存：请求会议室列表
        await fetchRoomList();
      }
    };

    initApp();
  }, [fetchRoomList]);

  return {
    roomInfo,
    roomList,
    loading,
    isEmpty,
    errorMsg,
    fetchRoomList,
    selectRoom,
    resetRoomConfig,
  };
};
