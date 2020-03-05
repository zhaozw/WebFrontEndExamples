<template>
  <div>HelloWorld</div>
</template>

<script>
import Oidc from "oidc-client";
import { Data } from "../main";
var config = {
  authority: "http://localhost:5000/",
  client_id: "js",
  redirect_uri: "http://localhost:8080/CallBack",
  response_type: "id_token token",
  scope: "openid profile api1",
  post_logout_redirect_uri: "http://localhost:8080/"
};
var mgr = new Oidc.UserManager(config);
export default {
  beforeCreate() {
      mgr.getUser().then((user)=>{
          console.log(user)
          if(!user){
              mgr.signinRedirect();
          }
      })
  }
};
</script>

<style>
</style>