const REG = /spm-auto-click=?([^\s|>]*)/g;

module.exports = function (source, inputSourceMap) {
    let counter = 1;
    let idx = 0;
    this.cacheable();
    if (source.indexOf('spm-auto-click') > -1) {
        source = source.replace(REG, function (all, match) {
            let key = match.match(/{([\w\W]+)}/);
            if (key && key[1]) {
                return 'data-spm-click={"gostr=/aliyun;locaid=d' + counter + idx++ + '"+' + key[1] + '}';
            } else {
                return 'data-spm-click="gostr=/aliyun;locaid=d' + counter + idx++ + '"';
            }
        });
        counter++;
    }
    this.callback(null, source, inputSourceMap);
};
