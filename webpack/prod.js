const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const config = require('./const');
let webpackConfig = require('./webpack.prod.conf');

webpack(webpackConfig, function (err, stats) {
    if (err) {
        console.error('构建发生错误', err);
        return process.exit(2);
    }
    // show build info to console
    console.log(stats.toString({chunks: false, color: true, children: false}));
    // save build info to file
    fs.writeFile(
        path.join(config.build, '__build_info__'),
        stats.toString({color: false})
    );
});
