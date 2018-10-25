/* webpack.client.js */

const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const projetRoot = path.resolve(__dirname, '..')

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}
module.exports = {
	watch: true,
	entry: [path.join(projetRoot, 'entry/entry-client.js')],
	output: {
		path: path.join(projetRoot, 'dist'),
		filename: 'bundle.client.js'
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
		        test: /\.js$/,
		        loader: 'babel-loader',
		        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
		    }
		]
	},
	plugins: [
		new webpack.DefinePlugin({
	      'process.env': {
	      	NODE_ENV: '"production"'
	      }
	    }),
	    new UglifyJsPlugin({
	      uglifyOptions: {
	        compress: {
	          warnings: false
	        }
	      }
	    })
	],
	resolve: {
	    extensions: ['.js', '.vue', '.json'],
	    alias: {
	      vue$: 'vue/dist/vue.esm.js',
	      '@': resolve('packages')
	    }
	}
}