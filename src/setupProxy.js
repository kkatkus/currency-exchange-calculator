const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  const routes = ['/api', 'api'];

  const options = {
    target: 'http://localhost:3100',
    changeOrigin: true,
    logLevel: 'debug',
    secure: false,
  };
  app.use(proxy(routes, options));

  return app;
};
