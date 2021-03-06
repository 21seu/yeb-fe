import axios from "axios";
import {Message} from 'element-ui';
import router from "../router";
import el from "element-ui/src/locale/lang/el";


// 请求拦截器
axios.interceptors.request.use(config => {
    if (window.sessionStorage.getItem('tokenStr')) {
        //请求携带自定义token
        config.headers['Authorization'] =
            window.sessionStorage.getItem('tokenStr');
    }
    return config
}, error => {
    console.log(error);
})

/**
 * 配置响应拦截器
 */
axios.interceptors.response.use(success => {

    //业务逻辑错误
    if (success.status && success.status == 200) {
        //401未登录 403权限禁止
        if (success.data.code == 500 || success.data.code == 401 || success.data.code == 403) {
            Message.error({message: success.data.message});
            return;
        }
        if (success.data.message) {
            Message.success({message: success.data.message});
        }
    }
    return success.data;
}, error => {
    if (error.response.code == 504 || error.response.code == 404) {
        Message.error({message: '服务器请求异常( ╯□╰ )'});
    } else if (error.response.code == 403) {
        Message.error({message: '权限不足，请联系管理员！'});
    } else if (error.response.code == 401) {
        Message.error({message: '尚未登录，请登录！'});
        router.replace('/');
    } else {
        if (error.response.data.message) {
            Message.error({message: error.response.data.message});
        } else {
            Message.error({message: '未知错误！'});
        }
    }
    return;
});

let base = '';

/**
 * 传json格式的post请求
 * @param url
 * @param params
 * @returns {AxiosPromise}
 */
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params
    })
}

//传递json的put请求
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params
    })
}
//传递json的get请求
export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        data: params
    })
}
//传递json的delete请求
export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        data: params
    })
}