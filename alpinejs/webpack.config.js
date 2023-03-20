const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
 entry: './src/index.ts',
 mode: 'development',
 devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|mp3)$/i,
        type: 'public/resource',
      },
      { 
        test: /\.(otf|woff|woff2|ttf)$/i,
        use: ['url-loader'],
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Love you",
      template: path.join(__dirname, '/public/index.html'),
      inject: true,
    }),
    new MiniCssExtractPlugin()
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
};

// module.exports = {
//   mode: 'development',
  
//   // entry: "./src/index.ts",
//   // output: {
//   //   filename: "bundle.js",
//   //   path: path.resolve(__dirname, "dist"),
//   //   clean: true,
    
//   // },
//   // module: {
//   //   rules: [
//   //     {
//   //       text: /\.tsx?$/,
//   //       use: "ts-loader",
//   //       exclude: /node_modules/,
//   //     },
//   //     {
//   //       test: /\.css$/i,
//   //       use: ["style-loader", "css-loader"],
//   //     },
//   //     {
//   //       test: /\.(png|svg|jpg|jpeg|gif|mp3)$/i,
//   //       type: "public/resource",
//   //     },
//   //     {
//   //       test: /\.(otf|woff|woff2|ttf)$/i,
//   //       use: ["url-loader"],
//   //     },
//   //   ],
//   // },
//   // resolve: {
//   //   extensions: [".ts", ".js"],
//   // },
//   // devServer: {
//   //   static: "./dist",
//   // },
//   // plugins: [
//   //   new HtmlWebpackPlugin({
//   //     template: path.join(__dirname, "/public/index.html"),
//   //     title: "News",
//   //     inject: true,
//   //   }),
//   // ],
//   // optimization: {
//   //   runtimeChunk: "single",
//   // },
// };
