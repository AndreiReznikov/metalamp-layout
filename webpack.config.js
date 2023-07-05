const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const PugPlugin = require('pug-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const PATHS = {
  src: path.resolve(process.cwd(), 'src'),
  dist: path.resolve(process.cwd(), 'dist'),
};

const PAGES = [
  'index',
  'headers-and-footers',
  'colors-and-type',
  'form-elements',
  'cards',
  'landing-page',
  'search-room',
  'room-details',
  'registration',
  'sign-in',
];

const { NODE_ENV } = process.env;

const entryPoints = {};

PAGES.forEach((page) => {
  entryPoints[page] = `${PATHS.src}/pages/${page}/${page}`;
});

module.exports = {
  mode: NODE_ENV || 'development',
  entry: entryPoints,
  output: {
    assetModuleFilename: 'assets/[hash][ext][query]',
    publicPath: '',
  },
  resolve: {
    extensions: ['.js', '.pug', '.scss'],
    alias: {
      '~': PATHS.src,
      '~components': `${PATHS.src}/components`,
      '~libs': `${PATHS.src}/libs`,
      '~img': `${PATHS.src}/img`,
      '~fonts': `${PATHS.src}/fonts`,
      '~templates': `${PATHS.src}/templates`,
    },
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
        }, {
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
    new MiniCssExtractPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
  ],
};
