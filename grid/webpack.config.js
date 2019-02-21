/* eslint-env node */
const webpack = require('webpack')
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/grid.js'),
  output: {
    filename: 'grid.js',
    library: 'grid',
    libraryTarget: 'amd',
    path: path.resolve(__dirname, 'build/grid'),
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        exclude: [path.resolve(__dirname, 'node_modules'), /\.krem.css$/],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins() {
                return [
                  require('autoprefixer')
                ];
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, 'node_modules')],
        exclude: [/\.krem.css$/],
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.krem.css$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: [
          {
            loader: 'kremling-loader',
            options: {
              namespace: 'app-dashboard-ui',
              postcss: {
                plugins: {
                  'autoprefixer': {}
                }
              }
            },
          },
        ]
      },
    ],
  },
  resolve: {
    modules: [
      __dirname,
      'node_modules',
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: '"format amd";',
      raw: true,
    }),
    new CleanWebpackPlugin(['build/grid']),
    CopyWebpackPlugin([
      {from: path.resolve(__dirname, 'src/grid.js')}
    ]),
  ],
  devtool: 'source-map',
  externals: [
    /^lodash$/,
    /^single-spa$/,
    /^react$/,
    /^react\/lib.*/,
    /^react-dom$/,
    /.*react-dom.*/,
    /^rxjs\/?.*$/,
  ],
};

