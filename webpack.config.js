"use strict";

const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const dataObj = require("./data/data.json");
const webpack = require("webpack");

module.exports = {
  entry: ["./src/app.js"],
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/dist/",
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "fonts/[name].[ext]",
              esModule: false,
            },
          },
          {
            loader: "file-loader",
            options: {
              name: "fonts/[name].[ext]",
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      "process.env.VUE_APP_URL": JSON.stringify(process.env.VUE_APP_URL),
    }),
  ],
  resolve: {
    alias: {
      fonts: path.resolve(__dirname, "src/assets/fonts"),
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 9000,
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error("webpack-dev-server is not defined");
      }

      devServer.app.get("/api/categories", (req, res) => {
        res.json(dataObj.categories);
      });

      devServer.app.get("/api/category/*", (req, res) => {
        res.json(dataObj.articles);
      });

      devServer.app.get("/api/author/*", (req, res) => {
        let author = {};
        const authorId = req.params["0"];

        for (let index = 0; index < dataObj.authors.length; index++) {
          if (dataObj.authors[index].id === authorId) {
            author = dataObj.authors[index];
            break;
          }
        }
        res.json(author);
      });

      devServer.app.get("/api/search/*", (req, res) => {
        res.json(dataObj.articles);
      });

      return middlewares;
    },
  },
};
