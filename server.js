/*const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server')
const config = require('./build/webpack.dev.conf.js')

console.log(config)*/
/*new WebpackDevServer(webpack(config),config).listen(8081,'0.0.0.0',(err) => {
	if(err) {
		console.log(err)
	}
	console.log('listening at localhost:');

})*/

const Vue = require('vue')
const express = require('express')()
const renderer = require('vue-server-renderer').createRenderer()
const createApp = require('./dist/bundle.server.js')['default']

// 客户端打包地址
// const clientBundleFileUrl = '/bundle.client.js'


express.get('/test',(req,res) => {
	createApp(context).then(app => {
		let state = JSON.stringify(context.state)

		renderer.renderToString(app, (err, html) => {
			if (err) { return res.state(500).end('运行时错误')}
			res.send(
				`
				<!DOCTYPE html>
				<html>
				<head>
				<meta charset="utf-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
				<meta content="telephone=no" name="format-detection">
				<meta name="applicable-device" content="mobile">
				<meta name="apple-mobile-web-app-capable" content="yes">
				<meta name="apple-mobile-web-app-status-bar-style" content="black">
				<meta name="format-detection" content="telephone=no, email=no">
				<link rel="shortcut icon" href="http://m.wxjysgcd.com/Upload/logo.png">
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
				<title>Examples</title>
				<meta name="description" content="">
				<meta name="keywords" content="">
				<script type="text/javascript" src="/packages/utils/flexible.js"></script>
				<script>window.__INTIAL_STATE__ = ${state}</script>
				</head>
				<body>
					<div id="app">${html}</div>
				</body>
				</html>
				`
			)
		})
	},err => {
		if (err.code === 404) { res.status(404).end('所请求的页面不存在')}
	})

})

express.listen(8020, () => {
	console.log('服务器已启动')
})