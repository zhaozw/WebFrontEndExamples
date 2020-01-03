<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import WebApi from "../utils/webapi"
export default {
  name: 'home',
  components: {
    HelloWorld
  },
  created(){
    WebApi.get().then((res)=>{
      console.log(res.status);
      console.log(res.data)
    })
  }
}
</script>
