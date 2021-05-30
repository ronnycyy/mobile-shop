/* eslint-disable global-require */
switch (process.env.NODE_ENV) {
  case 'production': {
    module.exports = require('./webBuild/webpack.prod.config');
    break;
  }
  default:
    module.exports = require('./webBuild/webpack.dev.config');
}
