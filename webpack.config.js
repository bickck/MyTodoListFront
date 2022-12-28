const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const assetsJsPath = './assets/js/index'

// module.exports = {
//     mode: 'development',
//     entry: {
//         main: ['./root.js'],
//         index: [`${assetsJsPath}/index.js`],
//         login: [`${assetsJsPath}/login.js`]
//     },
//     output: {
//         path: path.resolve(__dirname, './build'),
//         filename: '[name].js'
//     },
//     module: {
//         rules: [{
//                 test: /\.s[ac]ss$/,
//                 use: [new MiniCssExtractPlugin, 'css-loader', 'postcss-loader', 'sass-loader']
//             },
//             {

//             }
//         ]
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             template: './index.html'
//         }),
//         new MiniCssExtractPlugin({
//             linkType: true,
//             filename: "./assets/css/*.css"
//         })
//     ],
//     devServer: {
//         static: {
//             directory: path.resolve(__dirname, "./build")
//         },
//         port: 5000,
//     }
// };