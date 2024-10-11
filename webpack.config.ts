/* eslint-disable no-undef */
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import { Configuration } from 'webpack'
import 'webpack-dev-server'
import { linariaCssLoaderRules, linariaJsLoaderRules } from './webpack/linaria'

const isDevelopment = process.env.NODE_ENV !== 'production'

const config: Configuration = {
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/Index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/', // For React Router
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
    port: 3001,
    historyApiFallback: true, // For React Router
    client: {
      overlay: true,
    },
  },
}

export default config
