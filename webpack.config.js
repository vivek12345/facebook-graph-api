const PORT = process.env.port || 7000;
const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: './app/index.js',
	output: {
		path: __dirname + '/build',
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			exclude: /node_modules/,
			loader: 'babel-loader'
		},{
			test: /\.css$/,
			loader: "style-loader!css-loader"
		},{
			test: /\.scss$/,
			loaders: ["style-loader", "css-loader", "sass-loader"]
		},{
			test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: "url-loader?limit=10000&mimetype=application/font-woff"
		},{
			test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: "file-loader"
		}]
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.css', '.scss'],
		alias: {
			bootstrap: path.join(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets/_bootstrap')
        }
	},
	devtool: '#cheap-module-source-map',
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				screw_ie8: true
			},
			comments: false,
			sourceMap: false
		})
	],
	devServer: {
		port : PORT,
		inline: true,
		color: true,
		contentBase: './',
		historyApiFallback: true
	}
}
