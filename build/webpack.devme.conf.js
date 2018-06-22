var path = require('path');
var webpack = require('webpack');
var devFlagPlugin = new webpack.DefinePlugin({						 // 设置全局变量__DEV__ 可用于判断是否开发或生产环境
	__DEV__: JSON.stringfy(JSON.parse(process.env.DEBUG || 'false')) //设置开发环境
})

var HtmlwebpackPlugin = require('html-webpack-plugin');         
var OpenBrowserPlugin = require('open-browser-webpack-plugin'); //自动打开浏览器的插件

module.exports = {
	devtool: '#source-map',
	entry:{

	},
	output:{
		open: true,
		host：'0.0.0.0',
		dev: {
			logLevel:'warn'
		},
		hot: {
			logLevel:'warn'
		}
	},
	resolve: {
		extensions: ['.js', '.vue', '.css'],
		alias: {
			packages:path.join(__dirname,'../packages')
		}
	},
	module:{
		rules:[
			{
				test:/\.vue$/,
				use:[
					{
						loader:'vue-loader',
						options: {
							compilerOptions: {
								preserveWhitespace:false					// 阻止元素直接的空白
							}
						}
					}
				]
			},
			{
				test: /\.js$/,
				exclude:/node_modules/,
				use:'babel-loader'
			},
			{
				test:/\.(css|scss)$/,
				use:[
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test:/\.(png|jpe?g|gif|svg)(\?.*)$/,
				loader: 'url-loader',
			}
		]
	},
	plugins: [
		devFlagPlugin,
		new HtmlwebpackPlugin({
			title:'commom-simple',
			template:__dirname + 
		})
	]
}