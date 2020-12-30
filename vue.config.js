module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/api': {
        // target:'http://59.110.218.110:8080/api',
        // target:'http://192.168.16.70:8080/api',
        // target: 'http://101.132.150.87:8080/api',
        target: 'http://192.168.16.121:8006/api',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  },
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.plugins.delete('prefetch');
  }
}