import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';
import logger from 'morgan';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from './webpack.dev';
import webpackConfigProduction from './webpack.prod';

/**
 * Set up express app
 */
const app = express();

// Log requests to the console
app.use(logger('dev'));
let compiler;

// webpack configuration
if (process.env.NODE_ENV !== 'production') {
  compiler = webpack(webpackConfig);
} else {
  compiler = webpack(webpackConfigProduction);
}

app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));

app.use(webpackHotMiddleware(compiler));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

export default app;
