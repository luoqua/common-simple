const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}
const projectRoot = path.resolve(__dirname, '..')

module.exports = {
	watch: true,
	// 此处告知server bundle 使用 Node 风格导出模块(Node-style exports)
	target: 'node',
	entry: [path.join(projectRoot, 'entry/entry-server.js')],
	output: {
		libraryTarget: 'commonjs2',
		path: path.join(projectRoot,'dist'),
		filename: 'bundle.server.js'
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
		    },
		    {
		        test: /\.(css|scss)$/,
		        include: [
		          /src/,// 表示在src目录下的css需要编译
		          '/node_modules/element-ui/lib/' // 增加此项
		        ],
		        use: [
		          'style-loader',
		          'css-loader',
		          'sass-loader'
		        ]
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