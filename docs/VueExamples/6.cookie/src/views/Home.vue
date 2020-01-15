<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Helper from "../utils/helper"
export default {
  name: 'home',
  components: {
    HelloWorld
  },
  created(){
    Helper.setCookie("username","linyisonger");
    let username = Helper.getCookie("username");
    console.log(username);
    Helper.removeCookie("username");
    username = Helper.getCookie("username");
    console.log(username);
  }
}
</script>
