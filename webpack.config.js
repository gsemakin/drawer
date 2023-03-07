const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },

    historyApiFallback: true,
    // contentBase: path.resolve(__dirname, "./dist"),
    open: true,
    compress: true,
    hot: true,
    port: 9000,
  },
  // plugins: [
  //   // ...
  //   // применять изменения только при горячей перезагрузке
  //   new webpack.HotModuleReplacementPlugin(),
  // ],

  entry: {
    main: path.resolve(__dirname, "./src/index.js"),
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Drawer",
      template: path.resolve(__dirname, "./src/template.html"), // шаблон
      filename: "index.html", // название выходного файла
    }),

    new CleanWebpackPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
  ],

  module: {
    rules: [
      // CSS, PostCSS, Sass
      {
        test: /\.(sass|css)$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      // шрифты и SVG
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline",
      },
    ],
  },

  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "[name].bundle.js",
  },
};
