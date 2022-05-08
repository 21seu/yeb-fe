import {getRequest} from "./api";
import router from "../router";


export const initMenu = (router, store) => {
    if (store.state.routes.length > 0) {
        return;
    }


    getRequest('/system/config/menus').then(data => {
        if (data) {
            //格式化router
            let routers = formatRouters(data);
            //添加到router
            router.addRoutes(routers);

            //将数据存入vuex
            store.commit('initRouters', routers);
        }
    })
}


export const formatRouters = (data) => {
    let fmtRouters = [];
    routes.forEach(router => {
        let {
            path,
            name,
            iconCls,
            children
        } = router;
        if (children && children instanceof Array) {
            //递归
            children = formatRouters(children)
        }

        let fmtRoute = {
            path: path,
            name: name,
            iconCls: iconCls,
            children: children,
            component(resolve) {
                require(['../views' + component + '.Vue'], resolve);
            }
        }
        fmtRouters.push(fmtRoute);
    });
    return fmtRouters;
}