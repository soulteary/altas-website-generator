const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-express-plugin');

const config = require('./const');
const SOURCE_MAP = false;

let webpackConfig = require('./webpack.base.conf');

webpackConfig.output.filename = '[name].js';
webpackConfig.output.chunkFilename = '[id].js';
webpackConfig.output.publicPath = '/';

webpackConfig.devtool = SOURCE_MAP ? 'source-map' : false;

// add hot-reload related code to entry chunk
webpackConfig.entry.app = [
    'webpack-hot-middleware/client?reload=true',
    webpackConfig.entry.app
];

// 开发环境下直接内嵌 CSS 以支持热替换
webpackConfig.module.rules.push(
    {
        test: /\.css$/,
        use: [
            'style-loader',
            'css-loader?importLoaders=1',
            {
                loader: 'postcss-loader',
                options: {
                    plugins: function () {
                        return [
                            require('precss'),
                            require('autoprefixer')
                        ];
                    }
                }
            }
        ]
    },
    {
        test: /\.less$/,
        use: ['style-loader', 'css-loader?importLoaders=1', 'postcss-loader', 'less-loader']
    }
);

webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: config.indexHTML,
        chunksSortMode: 'none'
    })
    , new OpenBrowserPlugin({url: 'http://localhost:9000/'})
);


// 字典服务
// const nlsHelper = require('../server/nlsHelper');
// nlsHelper.render();

module.exports = webpackConfig;
