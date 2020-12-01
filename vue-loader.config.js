module.exports = {
    loaders: utils.cssLoaders({
      sourceMap: sourceMapEnabled,
      extract: isProduction
    }),
     // postcss插件配置
      postcss: [
      require('autoprefixer')// 前缀
      ],
  };