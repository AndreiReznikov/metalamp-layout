const path = require('path');
const webpack = require('webpack');
const PATHS = {
  src: path.resolve(process.cwd(), "src"),
  dist: path.resolve(process.cwd(), "dist")
};

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

__webpack_base_uri__ = 'http://localhost:8080';

module.exports = {
  entry: {
    'headers-and-footers': `${PATHS.src}/pages/headers-and-footers/headers-and-footers`,
    'colors-and-type': `${PATHS.src}/pages/colors-and-type/colors-and-type`,
    'form-elements': `${PATHS.src}/pages/form-elements/form-elements`,
    'cards': `${PATHS.src}/pages/cards/cards`,
    'landing-page': `${PATHS.src}/pages/landing-page/landing-page`,
    'search-room': `${PATHS.src}/pages/search-room/search-room`,
    'room-details': `${PATHS.src}/pages/room-details/room-details`,
    'registration-and-sign-in': `${PATHS.src}/pages/registration-and-sign-in/registration-and-sign-in`
  },
  output : {
    assetModuleFilename: 'assets/[hash][ext][query]',
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.(js)$/, 
        exclude: path.resolve(__dirname, 'node_modules'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }      
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: [
                [
                  "postcss-preset-env",
                ],
              ],
            },
          },
          }, 'sass-loader'],
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource'
      },
    ]
  },
  plugins: [
    require('autoprefixer'),
    new CopyPlugin({
      patterns: [
          {
            from: path.resolve(__dirname, 'src/img'),
            to:   path.resolve(__dirname, 'dist/img')
          }
        ]
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.css'
    }),
    new FaviconsWebpackPlugin({
      logo: './src/img/logo.png'
    }),
    new HTMLWebpackPlugin({
      filename: 'colors-and-type.html',
      template: './src/pages/colors-and-type/colors-and-type.pug',
      chunks: ['colors-and-type']
    }),
    new HTMLWebpackPlugin({
      filename: 'headers-and-footers.html',
      template: './src/pages/headers-and-footers/headers-and-footers.pug',
      chunks: ['headers-and-footers']
    }),
    new HTMLWebpackPlugin({
      filename: 'form-elements.html',
      template: './src/pages/form-elements/form-elements.pug',
      chunks: ['form-elements']
    }),
    new HTMLWebpackPlugin({
      filename: 'cards.html',
      template: './src/pages/cards/cards.pug',
      chunks: ['cards']
    }),
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: './src/pages/landing-page/landing-page.pug',
      chunks: ['landing-page']
    }),
    new HTMLWebpackPlugin({
      filename: 'search-room.html',
      template: './src/pages/search-room/search-room.pug',
      chunks: ['search-room']
    }),
    new HTMLWebpackPlugin({
      filename: 'room-details.html',
      template: './src/pages/room-details/room-details.pug',
      chunks: ['room-details']
    }),
    new HTMLWebpackPlugin({
      filename: 'registration-and-sign-in.html',
      template: './src/pages/registration-and-sign-in/registration-and-sign-in.pug',
      chunks: ['registration-and-sign-in']
    }),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
}