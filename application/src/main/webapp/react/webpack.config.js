// NOTE: webpack watch options has a poll setting, do not include this if you are using webpack-dev-server
// Polling dramatically influences the cpu usage.

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: 'bundle.js'
  },
  devServer: {
    public: 'http://localhost:3000/dist',
    publicPath: 'http://localhost:3000/dist',
    host: "localhost",
    port: 3000,
    hot: true,
    watchContentBase: true,
    disableHostCheck: true,
  },
  devtool: 'source-map',
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
