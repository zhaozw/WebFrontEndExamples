<template>
  <div class="form">
    <div>
      <h2>登录</h2>
    </div>
    <div class="form-inputs">
      <input v-model="formData.name" type="text" placeholder="请输入用户名" />
      <input v-model="formData.pass" type="password" placeholder="请输入密码" />
    </div>
    <div>
      <button type="submit" @click="submitForm" :disabled="!allowSubmit">登录</button>
    </div>
  </div>
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

<style lang="scss">
.form {
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: auto;
  .form-inputs {
    display: flex;
    flex-direction: column;
  }
}
</style>>
