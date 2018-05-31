'use strict';

const path = require('path');

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

const config = {
  views: resolve('src/index.html'), // 视图
  alias: { // 别名配置
    'vue$': 'vue/dist/vue.esm.js',
    '@': resolve('src'),
    '@utils': resolve('src/utils'),
    '@comps': resolve('src/components'),
    '@views': resolve('src/views'),
    '@assets': resolve('src/assets'),
    '@mixins': resolve('src/mixins'),
    '@lib': resolve('src/assets/lib'),
    '@css': resolve('src/assets/css'),
  },
  esLint: {
    open: true, // 是否打开eslint
    autoFix: false // 是否自动修改代码风格
  },
  externals: {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'axios': 'axios'
  },
  build: { // 打包输出配置
    entry: resolve('src/index.js'),
    sw: false, // service worker是否开启
    assetsRoot: path.resolve(__dirname, '../bin'),
    assetsSubDirectory: path.resolve(__dirname, '../bin'),
    assetsPublicPath: './bin/',
    productionSourceMap: true
  },
  dev: { // 开发配置
    entry: resolve('src/index.js'),
    port: process.env.PORT || 8080,
    assetsSubDirectory: path.resolve(__dirname, '/'),
    assetsPublicPath: './',
    // 静态资源访问目录
    devServerPublicPath: '/'
  }
};

module.exports = config;