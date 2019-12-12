# 2.设置环境变量

[官网文档]( https://cli.vuejs.org/zh/guide/mode-and-env.html#%E6%A8%A1%E5%BC%8F)


## 添加环境变量
### 新建

[.env](.env)

[.env.development](.env.development)

```
NODE_ENV=development
VUE_APP_API_URL=http://localhost:5000/api/
```

[.env.production](.env.production)

```
NODE_ENV=production
VUE_APP_API_URL=https://xxxxx.cn/api/
```

### 使用

[Home.vue](./src/views/Home.vue)

```vue
<template>
  <div class="home">
    <div>当前模式:{{env}}</div>
    <div>当前webapi请求地址:{{VUE_APP_API_URL}}</div>
    <!-- ... -->
  </div>
</template>

<script>
// ...
export default {
  // ...
  data(){
    return {
      env:process.env.NODE_ENV,
      VUE_APP_API_URL:process.env.VUE_APP_API_URL
    }
  },
}
</script>
```

### 切换

```vue-cli-service serve --mode production```


## 自定义端口
### 新建

[vue.config.js](vue.config.js)

```js
module.exports = {
    devServer: {
        port: 5002
    }
}
```



