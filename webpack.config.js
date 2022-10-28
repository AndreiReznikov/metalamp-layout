const path = require('path');
const webpack = require('webpack');

const PATHS = {
  src: path.resolve(process.cwd(), 'src'),
  dist: path.resolve(process.cwd(), 'dist'),
};

const PAGES = ['headers-and-footers', 'colors-and-type', 'form-elements', 'cards', 'landing-page', 'search-room', 'room-details', 'registration-and-sign-in'];

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const PugPlugin = require('pug-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const { NODE_ENV } = process.env;

module.exports = {
  mode: NODE_ENV || 'development',
  entry: {
    index: `${PATHS.src}/pages/index/index`,
    'headers-and-footers': `${PATHS.src}/pages/headers-and-footers/headers-and-footers`,
    'colors-and-type': `${PATHS.src}/pages/colors-and-type/colors-and-type`,
    'form-elements': `${PATHS.src}/pages/form-elements/form-elements`,
    cards: `${PATHS.src}/pages/cards/cards`,
    'landing-page': `${PATHS.src}/pages/landing-page/landing-page`,
    'search-room': `${PATHS.src}/pages/search-room/search-room`,
    'room-details': `${PATHS.src}/pages/room-details/room-details`,
    'registration-and-sign-in': `${PATHS.src}/pages/registration-and-sign-in/registration-and-sign-in`,
  },
  output: {
    assetModuleFilename: 'assets/[hash][ext][query]',
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                [
                  'postcss-preset-env',
                ],
              ],
            },
          },
        }, 'resolve-url-loader', {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        }],
      },
      {
        test: /\.pug$/,
        loader: PugPlugin.loader,
      },
      {
        test: /fonts.*\.(woff(2)?|eot|ttf|otf|svg|)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new FaviconsWebpackPlugin({
      logo: './src/img/logo.png',
    }),
    ...PAGES.map((page) => new HTMLWebpackPlugin({
      template: `${PATHS.src}/pages/${page}/${page}.pug`,
      filename: `${page}.html`,
      chunks: [`${page}`],
    })),
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: './src/pages/index/index.pug',
      chunks: ['index'],
    }),
    new MiniCssExtractPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
  ],
};
