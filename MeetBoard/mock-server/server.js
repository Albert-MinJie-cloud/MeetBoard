// mock-server/server.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// 启用 CORS
app.use(cors());
app.use(express.json());

// Mock 数据
const mockRooms = [
  { id: 'room_001', name: '会议室A - 10人' },
  { id: 'room_002', name: '会议室B - 20人' },
  { id: 'room_003', name: '会议室C - 6人' },
  { id: 'room_004', name: '大会议室 - 50人' },
  { id: 'room_005', name: '小会议室 - 4人' },
];

const mockMeetings = {
  room_001: [
    {
      id: 'meeting_001',
      title: '产品需求评审',
      startTime: '2026-04-04T09:00:00',
      endTime: '2026-04-04T10:30:00',
      organizer: '张三',
      attendees: ['李四', '王五', '赵六'],
    },
    {
      id: 'meeting_002',
      title: '技术方案讨论',
      startTime: '2026-04-04T14:00:00',
      endTime: '2026-04-04T15:30:00',
      organizer: '李四',
      attendees: ['张三', '王五'],
    },
  ],
  room_002: [
    {
      id: 'meeting_003',
      title: '季度总结会议',
      startTime: '2026-04-04T10:00:00',
      endTime: '2026-04-04T12:00:00',
      organizer: '王五',
      attendees: ['全体员工'],
    },
  ],
};

// 1. 获取会议室列表
app.get('/api/meeting-rooms', (req, res) => {
  console.log('[GET] /api/meeting-rooms');
  setTimeout(() => {
    res.json(mockRooms);
  }, 500); // 模拟网络延迟
});

// 2. 获取指定会议室的会议列表
app.get('/api/meetings/:roomId', (req, res) => {
  const { roomId } = req.params;
  console.log(`[GET] /api/meetings/${roomId}`);

  setTimeout(() => {
    const meetings = mockMeetings[roomId] || [];
    res.json(meetings);
  }, 300);
});

// 3. 获取当前会议（根据时间筛选）
app.get('/api/meetings/:roomId/current', (req, res) => {
  const { roomId } = req.params;
  console.log(`[GET] /api/meetings/${roomId}/current`);

  const now = new Date();
  const meetings = mockMeetings[roomId] || [];
  const currentMeeting = meetings.find(m => {
    const start = new Date(m.startTime);
    const end = new Date(m.endTime);
    return now >= start && now <= end;
  });

  res.json(currentMeeting || null);
});

// 4. 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Mock Server 启动成功！`);
  console.log(`📍 地址: http://localhost:${PORT}`);
  console.log(`\n可用接口:`);
  console.log(`  GET  /api/meeting-rooms           - 获取会议室列表`);
  console.log(`  GET  /api/meetings/:roomId        - 获取会议列表`);
  console.log(`  GET  /api/meetings/:roomId/current - 获取当前会议`);
  console.log(`  GET  /health                       - 健康检查\n`);
});
