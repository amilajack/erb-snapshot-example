import path from 'path';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import baseConfig from './webpack.config.renderer.prod';
import webpackPaths from './webpack.paths';

const configuration: webpack.Configuration = {
  entry: path.join(webpackPaths.srcRendererPath, 'snapshot-helper.ts'),
  output: {
    path: webpackPaths.distRendererPath,
    publicPath: './',
    filename: 'snapshot.js',
    library: {
      type: 'umd',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(webpackPaths.srcRendererPath, 'index.ejs'),
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
      },
      isBrowser: false,
      isDevelopment: process.env.NODE_ENV !== 'production',
    }),
  ],
};

export default merge(baseConfig, configuration);
