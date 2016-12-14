var dirname = process.env.SOYA_PROJECT_DIR;

/**
 * Framework configuration.
 */
var frameworkConfig = {
  port: 4000,
  assetProtocol: 'http',
  assetHostPath: 'localhost:4000/assets/',
  absoluteProjectDir: dirname,
  hotReload: true,
  clientResolve: [],
  clientReplace: {},
  componentBrowser: true,
  debug: true,
  minifyJs: false
};

/**
 * Please note that clientConfig is exposed to browser, so you shouldn't put
 * sensitive configuration in there.
 */

var serverConfig = {
  apiUrl: 'http://tools-conn.test.tvlk.cloud',
  enableDevTools: true
};

var clientConfig = {
  apiUrl: 'http://tools-conn.test.tvlk.cloud',
  enableDevTools: true
};

module.exports = {
  frameworkConfig: frameworkConfig,
  serverConfig: serverConfig,
  clientConfig: clientConfig
};