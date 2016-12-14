var frameworkConfig = {
  port: 29051,
  assetProtocol: 'https',
  assetHostPath: 'ct.main.tvlk.cloud/assets',
  hotReload: false,
  minifyJs: true
};

/**
 * Please note that clientConfig is exposed to browser, so you shouldn't put
 * sensitive configuration in there.
 */

var serverConfig = {
  apiUrl: 'https://ct.main.tvlk.cloud',
  enableDevTools: true
};

var clientConfig = {
  apiUrl: 'https://ct.main.tvlk.cloud',
  enableDevTools: true
};

module.exports = {
  frameworkConfig: frameworkConfig,
  serverConfig: serverConfig,
  clientConfig: clientConfig
};