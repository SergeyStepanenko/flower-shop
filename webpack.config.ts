/* eslint-disable no-undef */
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import * as dotenv from 'dotenv'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import { Configuration } from 'webpack'
import 'webpack-dev-server'
import { linariaCssLoaderRules, linariaJsLoaderRules } from './webpack/linaria'
import fs from 'fs'

dotenv.config()
const isDevelopment = process.env.NODE_ENV !== 'production'

const config: Configuration = {
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/Index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: isDevelopment ? '/' : process.env.WEBPACK_PUBLIC_PATH,
  },
  devtool: isDevelopment ? 'inline-source-map' : false,
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
          ...linariaJsLoaderRules(isDevelopment),
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/i, // Rule for image files including .webp
        type: 'asset/resource', // Webpack 5 built-in asset module
      },
      ...linariaCssLoaderRules(isDevelopment),
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    fallback: {
      url: require.resolve('url/'), // Polyfill for the Node.js 'url' module
    },
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
      chunkFilename: '[name].styles.css',
    }),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    hot: true,
    historyApiFallback: true, // For React Router
    client: {
      overlay: true,
    },
    // ЕСЛИ НУЖНО ЗАПУСТИТЬ ПО HTTPS
    port: 443, // Set the port to 443
    https: {
      key: fs.readFileSync(path.resolve(__dirname, '.cert/localhost-key.pem')), // Your key path
      cert: fs.readFileSync(path.resolve(__dirname, '.cert/localhost.pem')), // Your cert path
    },
    allowedHosts: 'all', // Allow all hosts, including ngrok
    headers: {
      'Access-Control-Allow-Origin': '*', // To allow ngrok access
    },
  },
}

export default config
