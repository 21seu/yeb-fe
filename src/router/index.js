import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Home from "../views/Home";
import FriendChat from "../views/chat/FriendChat";

Vue.use(VueRouter)
Vue.use(ElementUI);

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
        hidden: true
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        children: [{
            path: '/chat',
            name: '在线聊天',
            component: FriendChat
        }]
    }
    /*{
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/!* webpackChunkName: "about" *!/ '../views/About.vue')
    }*/
]

const router = new VueRouter({
    routes
})

export default router
