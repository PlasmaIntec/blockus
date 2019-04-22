var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');
var webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: [
    // 'webpack-hot-middleware/client?reload=true',
    `${SRC_DIR}/index.js`,
  ],
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  devtool: 'eval-source-map',
  // plugins: [
  //   // OccurrenceOrderPlugin is needed for webpack 1.x only
  //   new webpack.optimize.OccurrenceOrderPlugin(),
  //   new webpack.HotModuleReplacementPlugin(),
  //   // Use NoErrorsPlugin for webpack 1.x
  //   new webpack.NoEmitOnErrorsPlugin()
  // ],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [
            "@babel/preset-env",
            "@babel/preset-react"
          ]
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
};
