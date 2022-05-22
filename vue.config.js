let proxyObj = {}

proxyObj['/'] = {
    //websocket
    ws: false,
    target: 'http://localhost:8084/',
    //发送请求的请求头会被设置成target
    changeOrigin: true,
    //补充些请求地址
    pathRewrite: {
        '^/': '/'
    }
}

proxyObj['/ws'] = {
    ws: true,
    target: 'ws://localhost:8084/'
};

module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: proxyObj
    }
}