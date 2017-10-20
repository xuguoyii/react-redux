var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var optimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		app: ['babel-polyfill', './src/index.js'],
		react: ['react', 'react-dom']
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, './build')
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
				test: /.less$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'less-loader']
				})
			},
			{
				test: /.(jpg|png|gif|svg)$/,
				use: ['url-loader?limit=8192&name=./image/[name].[ext]']
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('app.css'),
		new optimizeCssAssetsPlugin({}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			compress: {
				warnings: false
			},
			output: {
				comments: false
			}
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './public/index.html',
			inject: false
		})
	]
}
