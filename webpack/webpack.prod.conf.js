// 忽略个别插件不符合lint的配置名称
/*eslint camelcase: ["error", {properties: "never"}]*/

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Copy files and directories in webpack
const CopyWebpackPlugin = require('copy-webpack-plugin');
// Extract text from bundle into a file.
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// A webpack plugin to remove/clean your build folder(s) before building
const CleanWebpackPlugin = require('clean-webpack-plugin');
// Removes the runtime code from a webpack chunk.
const VendorChunkPlugin = require('webpack-vendor-chunk-plugin');

const config = require('./const');
const SOURCE_MAP = false;

let webpackConfig = require('./webpack.base.conf');


webpackConfig.output.filename = '[name].js';
webpackConfig.output.chunkFilename = '[id].js';

webpackConfig.devtool = SOURCE_MAP ? 'source-map' : false;

// 生产环境下分离出 CSS 文件
webpackConfig.module.rules.push(
    {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'postcss-loader']
        })
    },
    {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'postcss-loader', 'less-loader']
        })
    }
);
console.log(config.vendorDir)
webpackConfig.plugins.push(
    new CleanWebpackPlugin('build', {
        root: config.rootPath,
        verbose: false
    }),
    new CopyWebpackPlugin([
        {
            from: config.vendorDir
        }
    ]),
    new CopyWebpackPlugin([
        {
            from: config.staticDir,
            ignore: ['*.md', 'dict.js']
        }
    ]),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true
        }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'app'],
        chunks: ['vendor'],
        children: true
    }),

    new VendorChunkPlugin('vendor'),

    new ExtractTextPlugin({
        filename: '[name].css',
        disable: false,
        allChunks: true  // 若要按需加载 CSS 则请注释掉该行
    }),

    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: config.indexHTML,
        chunksSortMode: 'none'
    })
)
;

module.exports = webpackConfig;
