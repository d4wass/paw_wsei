const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"]
  },
  devtool: "inline-source-map",
  devServer:{
    // `contentBase` specifies what folder to server relative to the 
    // current directory. This technically isn't false since it's an absolute
    // path, but the use of `__dirname` isn't necessary. 
    watchContentBase: true,
    contentBase: __dirname + '/dist'
  },
  plugins: [
    new CopyPlugin([
      {
        from: "src/*.html",
        to: "",
        flatten: true
      }
    ])
  ],
  module: {
    rules: [
      // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
      {
        test: /\.tsx?$/,
        use: ["ts-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          {
            loader: "style-loader"
            // options: {
            //   // injectType: "singletonStyleTag"
            //   // injectType: "linkTag"
            // }
          },
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader"
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      }
    ]
  }
};