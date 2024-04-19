const HtmlPlugIn = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = (env) => {
  return {
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main-bundle.js',
      clean: true
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            { loader: 'css-loader' },
            {
              loader: 'less-loader',
              options: {
              }
            }
          ]
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
              }
            }
          ]
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader'
            }
          ]
        },
        {
          test: /\.html?/,
          use: [
            {
              loader: 'html-loader'
            }
          ]
        },
        {
          test: /\.(scss|css)$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'svg-url-loader'
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader'
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlPlugIn({
        filename: 'index.html',
        template: './src/index.html'
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),
      new Dotenv({
        path: env.environment,
        systemvars: true
      })
    ],

    devServer: {
      port: 3000,
      historyApiFallback: true,
      hot: true,
      host: '0.0.0.0',
      headers: {
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'cache-control': 'no-store'
      },
      client: {
        overlay: false
      }
    }
  };
};
