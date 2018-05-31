const path = require('path'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  merge = require('webpack-merge'),
  config = require('./config.js'),
  WebpackDevServer = require('webpack-dev-server'),
  baseConfig = require('./webpack.base.js');
let {
  port,
  assetsSubDirectory,
  assetsPublicPath,
  devServerPublicPath,
  devServerPublic,
  entry
} = config.dev;

const devConfig = {
  entry,
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // 自动注入script标签，根目录下的index.html作为模板存在，打包后的index.html会自动在bin目录下生成。
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: config.views,
      inject: 'body'
    })
  ],
  output: {
    path: assetsSubDirectory,
    publicPath: assetsPublicPath
  },
  module: {
    rules: [
      // {
      //   test: /\.(html|shtml)$/,
      //   loader: 'raw-loader' // loaders: ['raw-loader'] is also perfectly acceptable.
      // }
    ]
  },
  devtool: '#eval-source-map'
};

let webpackConfig = merge(baseConfig, devConfig);
const opts = {
  contentBase: [path.resolve(__dirname, '../')],
  hot: true,
  host: '0.0.0.0',
  compress: true,
  noInfo: false,
  quiet: false,
  disableHostCheck: true,
  publicPath: devServerPublicPath,
  overlay: {
    warnings: true,
    errors: true
  }
};
WebpackDevServer.addDevServerEntrypoints(webpackConfig, opts);
const compiler = webpack(webpackConfig);
const devServerOptions = Object.assign({}, webpackConfig.devServer, {
  stats: 'errors-only',
  ...opts
});
const server = new WebpackDevServer(compiler, devServerOptions);
// require('ip').address()
server.listen(port, '0.0.0.0', () => {
  console.log('Starting server on http://localhost:' + port);
});
