module.exports = {
    devServer:{
      host:'localhost',
      port:8080,
      proxy:{
        '/api':{
          target:'http://192.168.16.62:8081/api',
          changeOrigin:true,
          pathRewrite:{
            '/api':''
          }
        }
      }
    },
    // publicPath:'/app',
    // outputDir:'dist',
    // indexPath:'index2.html',
    // lintOnSave:false,
    productionSourceMap:false,
    chainWebpack:(config)=>{
      config.plugins.delete('prefetch');
    }
  }