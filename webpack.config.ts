/* eslint-disable no-undef */
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import webpack from 'webpack'
import 'webpack-dev-server'
import {
  linariaDevelopmentRules,
  linariaLoaderRules,
  linariaProductionRules,
} from './configs/linaria'

const isDevelopment = process.env.NODE_ENV !== 'production'

const config: webpack.Configuration = {
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
        use: [{ loader: 'babel-loader' }, ...linariaLoaderRules(isDevelopment)],
      },
      ...(isDevelopment ? linariaDevelopmentRules : linariaProductionRules),
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    // new MiniCssExtractPlugin({ filename: 'styles-[contenthash].css' }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
      chunkFilename: '[name].styles.css',
    }),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean) as webpack.WebpackPluginInstance[],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    hot: true,
    port: 3000,
    historyApiFallback: true, // For React Router
    client: {
      overlay: true,
    },
  },
}

export default config
