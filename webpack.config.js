/**
 * WEBPACK CONFIG
 *
 * Webpack config generation for server side code. Client side code is later
 * compiled at runtime by server side code.
 *
 * @SERVER
 */

var webpack = require('webpack');
var Precompiler = require('soya/lib/precompile/Precompiler');
var WebpackCompiler = require('soya/lib/compiler/webpack/WebpackCompiler');
var config = require('./config.js');

var precompiler = new Precompiler(config.frameworkConfig);
precompiler.precompile();

var webpackConfig = WebpackCompiler.createServerBuildConfig(webpack, config.frameworkConfig);
module.exports = webpackConfig;