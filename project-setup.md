Let’s install it by running:

npm i webpack --save-dev
You will also need webpack-cli. Pull it in with:

npm i webpack-cli --save-dev
Next up add the webpackcommand inside package.json:

`"scripts": {
  "build": "webpack --mode production"
}`

> babel-loader is the Webpack loader responsible for taking in the ES6 code and making it understandable by the browser of choice.

npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
Don’t forget to configure Babel! Create a new file named .babelrc inside the project folder:

`{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}`

At this point we’re ready to define a minimal webpack configuration.

Create a file named webpack.config.js and fill it like the following:

`module.exports = {
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
};`  

The configuration is quite simple.

For every file with a `js or jsx` extension Webpack pipes the code through babel-loader for transforming ES6 down to ES5 (Transpiling).

With this in place we’re ready to write our React components.
