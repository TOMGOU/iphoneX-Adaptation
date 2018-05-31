const path = require('path'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  WebpackChunkHash = require('webpack-chunk-hash'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  merge = require('webpack-merge'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin'),
  baseConfig = require('./webpack.base.js'),
  config = require('./config.js'),
  fs = require('fs'),
  BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  ora = require('ora');
let {
  assetsSubDirectory,
  assetsPublicPath,
  productionSourceMap,
  entry
} = config.build;
const versions = Math.random().toString().slice(-7);
fs.appendFileSync('./build/version.js', versions + '\n', 'utf-8');
const buildConfig = {
  entry,
  output: {
    chunkFilename: 'js/[name].[chunkhash].js',
    filename: 'js/[name].[chunkhash].js',
    path: assetsSubDirectory,
    publicPath: assetsPublicPath
  },
  externals: config.externals || {},
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(html|shtml)$/,
        loader: 'html-loader' // loaders: ['raw-loader'] is also perfectly acceptable.
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        VERSION: JSON.stringify(versions)
      }
    }),
    new HtmlWebpackPlugin({
      filename: '../index.shtml',
      template: config.views,
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin(), // +webpack3作用域提升
    // 在打包前清空bin目录
    new CleanWebpackPlugin(['bin'], {
      root: path.resolve(__dirname, '../')
    }),
    // 自动注入script标签，根目录下的index.html作为模板存在，打包后的index.html会自动在bin目录下生成。
    new webpack.optimize.CommonsChunkPlugin({ // + 公共包抽取
      name: 'vendor',
      minChunks: function (module) {
        if (module.resource && (/^.*\.(css|scss)$/).test(module.resource)) {
          return false;
        }
        return module.context && module.context.includes('node_modules');
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({ // + 清单抽取
      name: 'manifest',
      minChunks: Infinity
    }),
    new ExtractTextPlugin({ // + css抽取
      filename: 'css/[name].[contenthash:7].css'
    }),
    // 根据文件内容生成hash
    new WebpackChunkHash(),
    new ParallelUglifyPlugin({ // + js多线程处理
      cacheDir: '.cache/prod',
      workerCount: require('os').cpus().length - 1,
      // uglifyJS针对es5  https://github.com/gdborton/webpack-parallel-uglify-plugin
      // uglifyES 输出es6
      uglifyJS: {
        output: { comments: false },
        compress: { warnings: false }
      },
      sourceMap: productionSourceMap
    })
  ]
};
// + 打包关系图表展示
if (process.env.Analyz == 1) {
  buildConfig.plugins.push(
    new BundleAnalyzerPlugin()
  );
}
const spinner = ora('building...\n');
spinner.start();
webpack(merge({}, baseConfig, buildConfig), (err, stats) => {
  spinner.stop();
  if (err) throw err;
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n');
  if (stats.hasErrors()) {
    console.error('  Build failed with errors.\n');
    process.exit(1);
  }
  console.log(' Build complete.\n ');
})
