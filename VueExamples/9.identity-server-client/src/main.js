import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { User } from 'oidc-client'

Vue.config.productionTip = false
export class Data{
  static user = null
}
  
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
