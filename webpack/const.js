const path = require('path');

const rootPath = path.resolve(__dirname, '..');
const src = path.join(rootPath, 'src');

module.exports = {
    // 当前环境
    env: process.env.NODE_ENV.trim(),
    // 开发源码目录
    src: src,
    // 项目根目录
    rootPath: rootPath,
    // build 后输出目录
    build: path.join(rootPath, 'build'),
    // 入口基页
    indexHTML: path.join(src, 'index.html'),
    // 无需处理的静态资源目录
    staticDir: path.join(src, 'static'),
    // 无需处理的vendor
    vendorDir: path.join(src, 'scripts/vendor/'),
    // 自定义Loader
    customLoader: path.join(__dirname, '../loader/')
};
