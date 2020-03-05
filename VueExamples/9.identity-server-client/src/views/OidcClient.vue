<template>
   <div id="oidc">
    <h1>oidc-client</h1>
    <button @click="login">login</button>
    <button @click="logout">logout</button>
    <button @click="api">api</button>
    <ul v-for="(item,key) in profile" :key="key">
      <li :key="key" >{{item}}</li>
    </ul>
  </div>
</template>

<script>
import Oidc from "oidc-client";
  var config = {
    implicit: {
      authority: "http://localhost:5000/",
      client_id: "Implicit",
      redirect_uri: "http://localhost:8080/oidc_callback/", 
      response_type: "id_token token",
      scope: "openid profile Api",
      post_logout_redirect_uri: "http://localhost:8080/oidc_client",
      automaticSilentRenew: true
    }
  };
  var oidc_manage = new Oidc.UserManager(config.implicit);
  export default {
    name: "OidcClient",
    data() {
      return {
        profile: [],
        msg: "123"
      }
    },
    methods: {
      login() {
        oidc_manage.clearStaleState();
        oidc_manage.signinRedirect();
        console.log("login");
      },
      logout() {
        oidc_manage.signoutRedirect();
        console.log("logout");
      },
      api() {
        oidc_manage.getUser().then((user) => {
          var url = "http://localhost:5001/identity";
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url);
          xhr.onload = function () {
            console.log(xhr.status, JSON.parse(xhr.responseText));
          }
          xhr.setRequestHeader("Authorization", "Bearer " + user.access_token);
          xhr.send();
        }).catch((err) => {
          console.log(err);
        });
        console.log("api");
      }
    },
    mounted() {
      oidc_manage.getUser().then((rest) => {
        if (rest) {
          this.profile=rest.profile;
          console.log("User logged in", rest.profile);
        } else {
          console.log("User not logged in");
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  }
</script>

<style>

</style>