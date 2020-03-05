<template>
  <div id="callback">
    <h1>call_back</h1>
  </div>
</template>

<script>
import Oidc from "oidc-client";
export default {
    mounted(){
        new Oidc.UserManager()
          .signinRedirectCallback()
          .then(function() {
            window.location = "/";
          })
          .catch(function(e) {
            
          });
    }
}
</script>