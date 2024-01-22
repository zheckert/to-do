const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/todo',  
    createProxyMiddleware({
      target: 'http://localhost:9001',
      changeOrigin: true,
    })
  );
};