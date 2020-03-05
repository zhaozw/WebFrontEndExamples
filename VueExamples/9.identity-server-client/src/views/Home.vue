<template>
  <div>
    <HelloWorld></HelloWorld>
    <button @click="api">调用API</button>
    <button @click="logout">退出登录</button>
    <pre>{{res}}</pre>
  </div>
</template>

<script>
import Oidc from "oidc-client";
import HelloWorld from "../components/HelloWorld"
import {Data} from "../main";
var config = {
  authority: "http://localhost:5000/",
  client_id: "js",
  redirect_uri: "http://localhost:8080/CallBack",
  response_type: "id_token token",
  scope: "openid profile api1",
  post_logout_redirect_uri: "http://localhost:8080/about"
};
var mgr = new Oidc.UserManager(config);
export default {
  name: "Home",
  components:{
    HelloWorld
  },
  data() {
    return {
      res: "My Home"
    };
  },

  methods: {
    api() {
      mgr.getUser().then((user) =>{
        console.log(user);
        var url = "http://localhost:5001/identity";
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = function() {
          console.log(xhr);
           this.res = (xhr.status, JSON.parse(xhr.responseText))
        };
        xhr.setRequestHeader("Authorization", "Bearer " + user.access_token);
        xhr.send();
      });
    },
    logout() {
      mgr.signoutRedirect();
    }
  },
  mounted() {
    mgr.getUser().then((user) =>{
      console.log(user);
      if (user) {
        // this.res = ("User logged in", user.profile);注意闭包
        Data.user = user;
        console.log("User logged in", user.profile);
      } else {
         console.log("User not logged in");
      }
    });
  }
};
</script>
