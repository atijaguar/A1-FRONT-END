/* eslint-env node  */
const webpack = require('webpack')
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/desktop.js'),
  output: {
    filename: 'desktop.js',
    library: 'desktop',
    libraryTarget: 'amd',
    path: path.resolve(__dirname, 'build/desktop'),
  },
  mode: 'production',
  module: {
    rules: [
      {
        //https://github.com/babel/babel-loader
        test: /\.m?js$/, 
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread']
          }
        }
        
      },
      {
        test: /\.(css|scss|sass)$/,
        exclude: [path.resolve(__dirname, 'node_modules'), /\.krem.css$/],
        loader: 'css-loader',
        options: {
          import: true,
          modules: true,
          camelCase: true,
          localIdentName: '[path][name]__[local]',
        },
        
      },
      {
        test: /\.(css|scss|sass)$/,
        include: [path.resolve(__dirname, 'node_modules')],
        exclude: [/\.krem.css$/],
        loader: 'css-loader',
        options: {
          import: true,
          modules: true,
          camelCase: true,
          localIdentName: '[path][name]__[local]',
        },
      },
      {
        test: /\.krem.css$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: [
          {
            loader: 'kremling-loader',
            options: {
              import: true,
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
    new CleanWebpackPlugin(['build/desktop']),
    CopyWebpackPlugin([
      {from: path.resolve(__dirname, 'src/desktop.js')}
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

