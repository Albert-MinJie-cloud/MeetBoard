# Mock Server 使用说明

## 启动服务器

```bash
cd mock-server
npm start
```

服务器将在 `http://localhost:3001` 启动

## 可用接口

### 1. 获取会议室列表
```
GET http://localhost:3001/api/meeting-rooms
```

返回示例：
```json
[
  { "id": "room_001", "name": "会议室A - 10人" },
  { "id": "room_002", "name": "会议室B - 20人" }
]
```

### 2. 获取指定会议室的会议列表
```
GET http://localhost:3001/api/meetings/:roomId
```

示例：`GET http://localhost:3001/api/meetings/room_001`

### 3. 获取当前进行中的会议
```
GET http://localhost:3001/api/meetings/:roomId/current
```

### 4. 健康检查
```
GET http://localhost:3001/health
```

## 添加更多 Mock 数据

编辑 `server.js` 文件中的 `mockRooms` 和 `mockMeetings` 对象即可。
