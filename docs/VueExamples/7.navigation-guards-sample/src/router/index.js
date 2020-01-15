import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Helper from "../utils/helper"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: "/Login",
    name: "Login",
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

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
export default router
