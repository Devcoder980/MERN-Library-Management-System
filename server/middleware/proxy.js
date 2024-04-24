const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    // Example proxy configuration
    app.use(
        '/apis',  // Define the base path to trigger the proxy
        createProxyMiddleware({
            target: 'http://localhost:5000/',  // Replace with the URL of the server you want to proxy to
            changeOrigin: true,
        })
    );
};
