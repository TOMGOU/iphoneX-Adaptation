'use strict'
const path = require('path'),
  ExtractTextPlugin = require('extract-text-webpack-plugin')

// 获取当前模式
exports.getPattern = (() => {
  return process.env.IS_DEV === 'true' ? 'dev' : 'build';
})();
// 源码追踪
exports.sourceMap = function () {
  // 获取当前模式
  const type = this.getPattern;
  // 默认配置
  let defaultMap = type === 'dev' ? '#cheap-module-eval-source-map' : '#cheap-module-source-map';
  return defaultMap;
};
exports.resolve = function (dir) {
  let base = '../';
  return dir.indexOf(base) === 0 ? path.resolve(__dirname, dir) : path.resolve(__dirname, base, dir);
};

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  };

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      });
    }
    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',
        publicPath: '../'
      });
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass')
  };
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = [];
  const loaders = exports.cssLoaders(options);
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    });
  }
  return output;
};
