import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'font-awesome/css/font-awesome.css'

import {postRequest} from "./utils/api";
import {putRequest} from "./utils/api";
import {getRequest} from "./utils/api";
import {deleteRequest} from "./utils/api";
import {initMenu} from "./utils/menus";

Vue.config.productionTip = false

Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.deleteRequest = deleteRequest;

router.beforeEach((to, from, next) => {
    // console.log(to, form)
    if (window.sessionStorage.getItem("tokenStr")) {
        initMenu(router, store);
        next();
    } else {
        // if (to.path == '/') {
        next();
        // }
    }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
