let path = require('path'),
  webpack = require('webpack'),
  utils = require('./utils.js'),
  config = require('./config.js'),
  FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

let baseConfig = {
  output: {
    chunkFilename: '[name].js',
    filename: '[name].js',
    hashDigestLength: 5
  },
  resolve: {
    alias: config.alias,
    modules: ['node_modules'],
    // 下列类型的文件在import的时候无需添加后缀名
    extensions: ['.js', '.vue']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new FriendlyErrorsWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: utils.cssLoaders({
            sourceMap: false,
            extract: process.env.NODE_ENV === 'production'
          }),
          transformToRequire: {
            video: 'src',
            audio: 'src',
            embed: 'src',
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/]
      }, {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 8000,
          name: 'img/[name].[ext]?[hash:3]'
        }
      },
      ...utils.styleLoaders({
        sourceMap: false,
        extract: process.env.NODE_ENV === 'production'
      }), {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8000,
          name: 'fonts/[name].[hash:3].[ext]'
        }
      }
    ]
  }
}

if (config.esLint.open === true) {
  baseConfig.module.rules.push({
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('src')],
    exclude: [resolve('src/assets/js'), /node_modules/],
    options: {
      fix: config.esLint.autoFix, // true自动修正代码风格
      formatter: require('eslint-friendly-formatter')
    }
  });
}

module.exports = baseConfig;
