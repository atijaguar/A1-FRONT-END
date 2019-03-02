const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
//const preCSS = require('precss');
const autoPrefixer = require('autoprefixer');


const extractCSS = new MiniCssExtractPlugin({
	filename: '[name].fonts.css',
	allChunks: true,
});
const extractSCSS = new MiniCssExtractPlugin({
	filename: '[name].styles.css',
	allChunks: true,
});

const BUILD_DIR = path.resolve(__dirname, 'build');
const SRC_DIR = path.resolve(__dirname, 'src');

module.exports = {
	mode: 'development',
	entry: path.resolve(__dirname, 'src/desktop.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'desktop.bundle.js',
		path: path.resolve(__dirname, 'build/desktop'),
	},
	// watch: true,
	devtool: 'source-map',
	devServer: {
		contentBase: BUILD_DIR,
		//   port: 9001,
		compress: true,
		hot: true,
		open: true,
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
						presets: ['@babel/preset-react', '@babel/preset-env',],
						plugins: ['@babel/plugin-syntax-dynamic-import', "@babel/plugin-proposal-class-properties"],
					},
				},
			},
			{
				test: /\.html$/,
				loader: 'html-loader',
			},

			{
				test: /\.s?[ac]ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: 'css-loader', options: { url: false, sourceMap: true } },
					{ loader: 'sass-loader', options: { sourceMap: true } }
				],
			},
			{
				test: /\.(png|jpg|jpeg|gif|ico)$/,
				use: [
					{
						// loader: 'url-loader'
						loader: 'file-loader',
						options: {
							name: './img/[name].[hash].[ext]',
						},
					},
				],
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'file-loader',
				options: {
					name: './fonts/[name].[hash].[ext]',
				},
			}],
	},

	plugins: [
		new webpack.BannerPlugin({
			banner: '"format amd";',
			raw: true,
		}),
		new CleanWebpackPlugin(['build/desktop']),
		new CopyWebpackPlugin([
			{ from: path.resolve(__dirname, 'src/desktop.js') },
			{ from: path.resolve(__dirname, 'public/manifest.json') },
			{ from: './public/assets/img', to: '/img' },
			{ from: './public/manifest.json', to: '/' },
		]),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new HardSourceWebpackPlugin(),
		extractCSS,
		extractSCSS,
		/*new HtmlWebpackPlugin({
			inject: true,
			template: './public/desktop.html',
		}),*/

		new CompressionPlugin({
			asset: '[path].gz[query]',
			algorithm: 'gzip',
			test: /\.js$|\.css$|\.html$/,
			threshold: 10240,
			minRatio: 0.8,
		}),
	],
	externals: [
		/^.+!sofe$/,
		/^lodash$/,
		/^single-spa$/,
		/^rxjs\/?.*$/,
		/^React$/,
		/^react\/lib.*/,
		/^react-dom$/,
		/.*react-dom.*/,
	],

};