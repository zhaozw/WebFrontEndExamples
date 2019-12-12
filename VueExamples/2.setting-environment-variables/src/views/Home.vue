<template>
  <div class="home">
    <div>当前模式:{{env}}</div>
    <div>当前webapi请求地址:{{VUE_APP_API_URL}}</div>

    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data(){
    return {
      env:process.env.NODE_ENV,
      VUE_APP_API_URL:process.env.VUE_APP_API_URL
    }
  },
}
</script>
