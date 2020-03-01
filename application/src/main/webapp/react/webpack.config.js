module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.css'],
    modules: [
      'node_modules'
    ]
  },
  devServer: {
    publicPath: 'https://localhost:3000/dist',
    host: "localhost",
    port: 3000,
    hot: true,
    watchContentBase: true,
    disableHostCheck: true,
    inline: false
  },
  devtool: 'source-map',
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  }
};
