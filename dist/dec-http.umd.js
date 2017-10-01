(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('axios'), require('kaop-ts')) :
	typeof define === 'function' && define.amd ? define(['exports', 'axios', 'kaop-ts'], factory) :
	(factory((global.decHttp = {}),global.axios,global.kaopTs));
}(this, (function (exports,axios,kaopTs) { 'use strict';

axios = axios && axios.hasOwnProperty('default') ? axios['default'] : axios;

var config = { base: '' };
var http = function (method, headers) {
    if (method === void 0) { method = 'get'; }
    return kaopTs.beforeMethod(function (meta) {
        var _this = this;
        var _a = meta.args, url = _a[0], params = _a[1];
        var opts = { method: method, headers: headers };
        opts[method === 'get' ? 'params' : 'data'] = params;
        opts['url'] = config.base ? config.base + "/" + url : url;
        axios(opts)
            .then(function (_a) {
            var data = _a.data;
            meta.args = [url, params, null, data];
            _this.next();
        })
            .catch(function (error) {
            meta.args = [url, params, error, null];
            _this.next();
        });
    });
};

exports.config = config;
exports.http = http;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=dec-http.umd.js.map
