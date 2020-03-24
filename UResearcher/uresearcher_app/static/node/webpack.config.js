const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
	devtool: 'eval-source-map',
    entry:  {
		searchresults: __dirname + '/components/searchresults.jsx',
		index: __dirname + '/components/index.jsx',
		about: __dirname + '/components/about.jsx',
		settings: __dirname + '/components/settings.jsx',
	},
	output: {
        path: __dirname + '/dist',
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
	module: {
		rules: [
			{
				test: /\.jsx?/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react'
						],
					}
				}
			},
			{
				test: /\.css$/,
      			use: ['style-loader', 'css-loader']
			}
		]
	}
};
module.exports = config;
