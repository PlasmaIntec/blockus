var express = require('express');
var morgan = require('morgan');
var path = require('path');
var parser = require('body-parser');

var app = express();
var PORT = process.env.PORT || 3000;

// HOT MODULE REPLACMENT
var webpack = require('webpack');
var webpackConfig = require('../webpack.config');
var compiler = webpack(webpackConfig);

app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
}));
app.use(require("webpack-hot-middleware")(compiler));
// HOT MODULE REPLACMENT

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname + '/../client/dist')));

app.listen(PORT, () => {
  console.log(`Express listening on port ${PORT}`);
});