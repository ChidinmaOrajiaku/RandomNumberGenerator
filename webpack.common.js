const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    path.join(__dirname, 'Client/index.js'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devtool: 'cheap-eval-source-map',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Random-Number-Generator',
      template: path.join(__dirname, 'Client/index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: path.join(__dirname, 'Client'),
        loaders: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'Client'),
        loader: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        loader: ['style-loader', 'css-loader', 'sass-loader'],
      }, {
        test: /\.css$/,
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]',
        },
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        loader: ['file-loader'],
      },
    ],
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.scss', '.jpg', '.png', '.gif', '.jpeg']
  },
};
