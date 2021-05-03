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
        test: /\.tsx?$/,
        enforce: "pre",
        loader: "eslint-loader",
        exclude: /node_modules/,
        options: {
          emitWarning: true,
          configFile: "./.eslintrc.json"
        }
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [{
          loader: 'style-loader',
        },{
          loader: "css-loader",
          options: {
            sourceMap: true,
            importLoaders: 2,
            modules: {
              localIdentName: "[name]_[local]_[hash:base64:5]",
            },
          }
        }],
      },
      {
        test: /\.js$|jsx/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  }
};
