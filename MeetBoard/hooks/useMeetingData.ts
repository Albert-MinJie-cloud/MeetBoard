// // hooks/useMeetingData.ts
// import { useState, useEffect } from 'react';
// import { getMeetingList } from '../services/meeting';

// export const useMeetingData = () => {
//   const [meetingData, setMeetingData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // 获取会议数据
//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const data = await getMeetingList();
//       setMeetingData(data);
//     } catch (err) {
//       console.error('获取会议数据失败：', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 初始化+定时刷新（5分钟）
//   useEffect(() => {
//     fetchData();
//     const timer = setInterval(fetchData, 5 * 60 * 1000);
//     return () => clearInterval(timer);
//   }, []);

//   return { meetingData, loading, refresh: fetchData };
// };
