const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server')
const config = require('./build/webpack.dev.conf.js')

console.log(config)
/*new WebpackDevServer(webpack(config),config).listen(8081,'0.0.0.0',(err) => {
	if(err) {
		console.log(err)
	}
	console.log('listening at localhost:');

})*/