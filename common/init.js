var host = /\w+\.[\w\:]+$/.exec(location.host)[0];



seajs.config({

  // 别名配置
  alias: {

  },
  // 路径配置
  paths: {
    'api': location.protocol  + '//' + host+ '/website',
    'memberApi': location.protocol + '//member.' + host
  },



  // 预加载项
  preload: [

  ],

  // 调试模式
  debug: true,

  // Sea.js 的基础路径，也就是前端服务器
  base: '/',

  // 图片上传服务器
  uploaderPath: location.protocol + '//images.' + host + '/api/upfile',

  // ajax api接口
  apiPath: location.protocol + '//member.' + host,
});