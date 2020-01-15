# SignalR

> https://www.npmjs.com/package/@aspnet/signalr 

## 简要概述

### 安装依赖包

```shell
npm i @aspnet/signalr
```

### 新建utils文件夹

### 新建

[chat.js](src/utils/chat.js)

```js
const signalR = require("@aspnet/signalr");
let conneciton = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5000/chatHub").build();
conneciton.on("ReceiveMessage", (user, message) => {
    console.log(`${user}:${message}`);
})
export default conneciton;
```

### 修改

[Home.vue](src/views/Home.vue)

```vue
<script>
// ...
import connection from "../utils/chat"
export default {
  // ...
  created(){
    connection.start().then(()=>{
      connection.invoke("SendMessage", "允儿", "哈哈");
    })
  }
};
</script>
```

### 运行

服务端

客户端

