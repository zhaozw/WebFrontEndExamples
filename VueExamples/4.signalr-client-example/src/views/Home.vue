<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import connection from "../utils/message"
export default {
  name: "home",
  components: {
    HelloWorld
  },
  created(){
    connection.start().then(()=>{
      connection.invoke("SendMessage", "允儿", "哈哈");
    })
  }
};
</script>
