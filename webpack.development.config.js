var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
	devtool: 'eval-source-map',
	entry: {
		app: ['babel-polyfill', './src/index.js'],
		react: ['react', 'react-dom']
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, './build')
	},
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true,
		contentBase: './public',
		host: '0.0.0.0',
		disableHostCheck: true,
		port: 10000
	},
	module: {
		loaders: [
			{
				test: /.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['env', 'react', 'stage-0']
				}
			},
			{
				test: /.(jpg|png|gif|svg)$/,
				use: ['url-loader?limit=8192&name=./image/[name].[ext]']
			},
			{
				test: /.less$/,
				use: ['style-loader', 'css-loader', 'less-loader']
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development')
			}
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './public/demo.html',
			inject: false
		}),
		new webpack.HotModuleReplacementPlugin(),
		new OpenBrowserPlugin({ url: 'http://localhost:10000' })
	]
}
