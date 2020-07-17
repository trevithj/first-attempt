# 基于websocket和stomp协议的node-server

## 使用方法

```
const StompServer = require('node-stomp-broker-ws');
new StompServer({
  port: 8125,
  queueMap: {
    '/req/match/ready': {
      path: ['/req/match/ready', '/user/queue/match/ready'],
      message: {ready: 'ok'}
    }
  }
});
```

port 指定socket端口号
queueMap key表示客户端send的path， val里的path表示订阅的需要发送的path，message表示mock数据
