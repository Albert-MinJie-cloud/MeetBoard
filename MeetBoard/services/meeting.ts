// // services/meeting.ts
// import { request } from "./api";
// import { API_BASE_URL } from "../constants/Api";

// // 获取会议列表
// export const getMeetingList = async () => {
//   const res = await request({
//     url: `${API_BASE_URL}/calendar/events`,
//     method: "GET",
//     params: {
//       calendar_id: "会议室日历ID",
//       start_time: new Date().toISOString(),
//       end_time: new Date(new Date().setHours(23, 59, 59)).toISOString(),
//     },
//   });
//   return res.data;
// };
