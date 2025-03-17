const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/rider',
        createProxyMiddleware({
            target: 'https://dapi.kakao.com',
            changeOrigin: true,
            secure: false,
        })
    );
};