import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import webpack from 'webpack'
import 'webpack-dev-server'

const isDevelopment = process.env.NODE_ENV !== 'production'

const config: webpack.Configuration = {
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/index.tsx',
  output: {
    // eslint-disable-next-line no-undef
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
          {
            loader: '@wyw-in-js/webpack-loader',
            options: { sourceMap: isDevelopment },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: { sourceMap: isDevelopment },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: 'styles-[contenthash].css' }),
  ].filter(Boolean) as webpack.WebpackPluginInstance[],
  devServer: {
    static: {
      // eslint-disable-next-line no-undef
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

// Export the configuration
export default config
