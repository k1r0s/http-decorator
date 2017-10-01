import axios from 'axios';
import { beforeMethod } from 'kaop-ts';

var config = { base: '' };
var http = function (method, headers) {
    if (method === void 0) { method = 'get'; }
    return beforeMethod(function (meta) {
        var _this = this;
        var _a = meta.args, url = _a[0], params = _a[1];
        var opts = { method: method, url: config.base + "/" + url, headers: headers };
        opts[method === 'get' ? 'params' : 'data'] = params;
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

export { config, http };
//# sourceMappingURL=dec-http.es5.js.map
