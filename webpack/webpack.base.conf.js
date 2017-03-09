const path = require('path');
const webpack = require('webpack');
const config = require('./const');

module.exports = {
    entry: {
        // 框架 / 类库 分离打包
        // vendor: [
            // 'classie',
            // 'snapSvg',
            // 'svgLoader',
            // 'iscroll',
            // 'jquery',
            // 'scrolloverflow'
        // ],
        app: path.join(config.src, 'scripts/index.js')
    },
    output: {
        path: path.join(config.build, ''),
        publicPath: config.env === 'development' ? '/build/' : './',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: config.src,
                exclude: /node_modules/,
                loaders: (function () {
                    let _loaders = ['babel?' + JSON.stringify({
                        cacheDirectory: true,
                        plugins: [
                            'transform-runtime',
                            'transform-decorators-legacy'
                        ],
                        presets: ['es2015', 'stage-0']
                    })];
                    _loaders.push('spm');
                    return _loaders;
                })()
            }, {
                test: /\.json$/,
                loaders: 'json-loader'
            },
            {
                test: /\.html$/,
                loaders: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                loaders: 'url-loader',
                options: {
                    limit: 10240, // 10KB 以下使用 base64
                    name: 'img/[name].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/,
                loaders: 'url-loader?limit=10000&name=fonts/[name].[ext]'
            }
        ]
    },

    resolve: {
        modules: [
            'node_modules',
            path.join(config.rootPath, 'node_modules')
        ],
        extensions: ['.js'],
        alias: {
            // jquery: path.join(config.src, 'scripts/vendor/jquery-1.12.4.min'),
            // snapSvg: path.join(config.src, 'scripts/vendor/snap.svg'),
            // classie: path.join(config.src, 'scripts/vendor/classie'),
            // svgLoader: path.join(config.src, 'scripts/vendor/svgLoader'),
            // iscroll: path.join(config.src, 'scripts/vendor/jquery-1.12.4.min'),
            // scrolloverflow: path.join(config.src, 'scripts/vendor/scrolloverflow.min')
        }
    },
    resolveLoader: {
        modules: ['node_modules', config.customLoader],
        moduleExtensions: ['-loader']
    },

    //
    // performance: {
    //     hints: "warning", // enum
    //     maxAssetSize: 200000, // int (in bytes),
    //     maxEntrypointSize: 400000, // int (in bytes)
    //     assetFilter: function (assetFilename) {
    //         // Function predicate that provides asset filenames
    //         return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    //     }
    // },

    context: config.rootPath,

    target: 'web',

    stats: 'errors-only',

    plugins: [
        new webpack.BannerPlugin({
            banner: 'atlas website',
            entryOnly: true,
            include: 'app.js'
        }),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            },
            __DEV__: config.env === 'development',
            __PROD__: config.env === 'production'
        }),
        // new webpack.ProvidePlugin({
            // $: "jquery",
            // jQuery: "jquery",
            // "window.jQuery": "jquery",
            // Iscroll: "iscroll",
            // "window.Iscroll": "iscroll"
        // }),
    ]
};
