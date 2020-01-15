# 导航守卫样例-登录

## 主要代码

新建utils文件夹

新建[helper.js](src/utils/helper.js)

```js
/**
 * 获取cookie
 * @param {string} name cookie 名称
 */
static getCookie(name) {
    name += "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return null;
}
/**
 * 设置cookie
 * @param {string} name cookie 名称
 * @param {string} value cookie 值
 * @param {number} expire s 默认2592000s = 30 天
 */
static setCookie(name, value, expire = 2592000) {
    let date = new Date()
    date.setSeconds(date.getSeconds() + expire)
    document.cookie = name + "=" + value + "; expires=" + date.toGMTString()
}
/**
 * 移除cookie
 * @param {string} name cookie 名称
 */
static removeCookie(name) {
    this.setCookie(name, "", -1)
}
```

新建[Login.vue](src/views/Login.vue)页面

``` vue
<template>
  <!-- -->
    <div class="form-inputs">
      <input v-model="formData.name" type="text" placeholder="请输入用户名" />
      <input v-model="formData.pass" type="password" placeholder="请输入密码" />
    </div>
    <div>
      <button type="submit" @click="submitForm" :disabled="!allowSubmit">登录</button>
    </div>
  <!-- -->
</template>

<script>
import Helper from "../utils/helper";
export default {
  data() {
    return {
      allowSubmit: true,
      formData: {
        name: "",
        pass: ""
      }
    };
  },
  methods: {
    submitForm() {
      let name = this.formData.name;
      let pass = this.formData.pass;
      if (!name) alert("用户名不能为空");
      if (!pass) alert("密码不能为空");

      this.allowSubmit = false;
      // TODO 请求服务器

      // 获取Token  (这里用name+pass表示)
      Helper.setCookie("token", name + pass);
      let redirectUrl = this.$route.query.redirectUrl;
      this.$router.push({ path: redirectUrl || "/" });
    }
  }
};
</script>
```

设置导航守卫 [router.js](src/router/index.js)

``` js
// 添加登陆路由
{
    path: "/Login",
    name: "Login",
    component: () => import('../views/Login.vue')
}
```

```js
// 判断需不需要Login
router.beforeEach((to, from, next) => {
  let token = Helper.getCookie("token");
  if (to.name === 'Login') {
    next();
  } else if (token) {
    next();
  } else {
    next({
      path: '/Login',
      query: {
        redirectUrl: to.fullPath
      }
    });
  }
});
```

