const path = require('path');
const webpack = require('webpack');
const express = require('express');

const config = require('./const');

let webpackConfig = require('./webpack.dev.conf');
let app = express();
let compiler = webpack(webpackConfig);

// for highly stable resources
app.use('/static', express.static(config.staticDir));

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// server webpack bundle output
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: {
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false,
        children: false
    }
}));

// enable hot-reload and state-preserving
// compilation error display
app.use(require('webpack-hot-middleware')(compiler, {
    // log: console.log,
    // path: '/__webpack_hmr',
    // heartbeat: 10 * 1000,
}));

app.listen(9000, '127.0.0.1', function (err) {
    if (err) {
        console.log(err);
        process.exit(1024);
    }
});

