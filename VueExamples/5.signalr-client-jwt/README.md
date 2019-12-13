# Signal R 带Token连接

## 依赖包

``` shell
npm install axios
npm i @aspnet/signalr
```

## 主要代码

[chat.js](src/utils/chat.js)

``` js
const signalR = require("@aspnet/signalr");
let config = {
    token:""
};
let conneciton = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5000/chatHub", { accessTokenFactory: () => config.token }).build();
conneciton.on("ReceiveMessage", (user, message) => {
    console.log(`${user}:${message}`);
})
export {
    conneciton,
    config
};
```

[Home.vue](src/views/Home.vue) 摘要

```vue
<script>
//..
const axios = require("axios").default;
axios.defaults.baseURL = "http://localhost:5000/api/";
import { conneciton, config } from "../utils/chat";
export default {
  //...
  created() {
    axios
      .post("user/login", {
        username: "linyisonger",
        password: "123456"
      })
      .then(res => {
        console.log(res);
        if (res.data.token) {
          console.log("登录成功,开始连接");
          config.token = res.data.token;
          conneciton.start();
        }
      });
  }
};
</script>


```




