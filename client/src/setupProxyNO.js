const { createProxyMiddleware } = require("http-proxy-middleware");


module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", { target: "http://localhost:4000/", changeOrigin: true, secure: true })
  );
};


/*
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", { target: "https://localhost:4000/", changeOrigin: true, secure: true }),
    createProxyMiddleware("/auth/slack", { target: "https://localhost:4000/auth/slack", changeOrigin: true, secure: true }),
    createProxyMiddleware("/auth/logout", { target: "https://localhost:4000/auth/logout", changeOrigin: true, secure: true })
  );
};

const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/api/", { target: "http://localhost:4000", "secure": "false" }));
};


module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://localhost:4000',
      changeOrigin: true,
      secure: true,
    })
  );
};
*/