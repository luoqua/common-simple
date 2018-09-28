'use strict'                                                                //严格模式
const utils = require('./utils')                                            //引入工具类文件 
const webpack = require('webpack')                                          //引入webpack
const config = require('../config')                                         //引入配置文件，主要分为生产环境的配置和开发环境的配置
const merge = require('webpack-merge')                                      //引入 webpack-merge 模块，,这个模块可以起到合并配置的作用。
const path = require('path')                                                //引入path模块
const baseWebpackConfig = require('./webpack.base.conf')                    //引入webpack基础配置文件
const CopyWebpackPlugin = require('copy-webpack-plugin')                    //在webpack中拷贝文件和文件夹
const HtmlWebpackPlugin = require('html-webpack-plugin')                    //自动帮你生成一个 html 文件，并且引用相关的 assets 文件(如 css, js)。
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')      // webpack错误信息提示插件
const portfinder = require('portfinder')                                    //端口查看

const os=require("os");

const networkInterfaces=os.networkInterfaces();


const HOSTIP = networkInterfaces['本地连接'][1]['address'];

const HOST = HOSTIP || process.env.HOST                                            //主机地址
const PORT = process.env.PORT && Number(process.env.PORT)                   //端口号





//合并webpack 配置文件
const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    // styleLoaders
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
   // 最新的配置为 cheap-module-eval-source-map，虽然 cheap-module-eval-source-map更快，但它的定位不准确
  // 所以，换成 eval-source-map
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  // 这些 devServer 的配置应该在 /config/index.js 中被定义
  devServer: {
    clientLogLevel: 'warning',//当使用内联模式(inline mode)时，在开发工具(DevTools)的控制台(console)将显示消息
    historyApiFallback: {     //如果为 true ，页面出错不会弹出 404 页面。直接跳到index.html;如果为 {...} , 则为url 匹配正则，匹配成功就到某个页面。
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,                //热模块更新作用。即修改或模块后，保存会自动更新，页面不用刷新呈现最新的效果。
    contentBase: false, // since we use CopyWebpackPlugin.    告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。
    compress: true,     //如果为 true ，开启虚拟服务器时，为你的代码进行压缩。加快开发流程和优化的作用。
    host: HOST || config.dev.host,  //主机地址
    port: PORT || config.dev.port,  //端口
    open: config.dev.autoOpenBrowser, //true，则自动打开浏览器。
    overlay: config.dev.errorOverlay  //如果为 true ，在浏览器上全屏显示编译的errors或warnings。默认 false （关闭）
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,    //公共路径
    proxy: config.dev.proxyTable,               // 配置文件中 http代理配置(如果你有单独的后端开发服务器 API，并且希望在同域名下发送 API 请求 ，那么代理某些 URL 会很有用。)
    quiet: true, // necessary for FriendlyErrorsPlugin    启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
    watchOptions: {
      poll: config.dev.poll,  //与监视文件相关的控制选项。webpack 使用文件系统(file system)获取文件改动的通知
    }
  },
  plugins: [                                            //插件
    new webpack.DefinePlugin({                           // definePlugin 接收字符串插入到代码当中, 所以你需要的话可以写上 JS 的字符串.此处，插入适当的环境
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),            //HotModule 插件在页面进行变更的时候只会重绘对应的页面模块，不会重绘整个 html 文件
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
    new webpack.NoEmitOnErrorsPlugin(),             //在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误。如果你在使用 CLI，启用此插件后，webpack 进程遇到错误代码将不会退出。
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({                         //该插件将为你生成一个 HTML5 文件， 其中包括使用 script 标签的 body 中的所有 webpack 包。 只需添加插件到你的 webpack 配置如下：
      filename: 'index.html',
      template: 'index_phone.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([                         //复制静态资源
      {
        from: path.resolve(__dirname, '../packages/utils'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
  ],
  externals: {
    BaiduMap: 'BMap'
  }
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests 发布e2e测试需要的新端口
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin     增加错误信息提示插件   
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
