<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
const axios = require("axios").default;
axios.defaults.baseURL = "http://localhost:5000/api/";
import { conneciton, config } from "../utils/chat";
export default {
  name: "home",
  components: {
    HelloWorld
  },
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
