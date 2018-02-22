(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('axios'), require('kaop-ts')) :
	typeof define === 'function' && define.amd ? define(['axios', 'kaop-ts'], factory) :
	(global.httpDecorator = factory(global.axios,global.kaopTs));
}(this, (function (axios,kaopTs) { 'use strict';

axios = axios && axios.hasOwnProperty('default') ? axios['default'] : axios;
kaopTs = kaopTs && kaopTs.hasOwnProperty('default') ? kaopTs['default'] : kaopTs;

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var httpDecorator = createCommonjsModule(function (module) {
var beforeMethod = kaopTs.beforeMethod;

module.exports["httpAdvice"] = function (meta) {
  if(!options.method) { options.method = "get"; }
  var ref = meta.args;
  var params = ref[0];
  options[options.method === 'get' ? 'params' : 'data'] = params;
  axios(options)
  .then(function (res) {
    meta.args = [params, null, res.data];
    meta.commit();
  })
  .catch(function (error) {
    meta.args = [params, error, null];
    meta.commit();
  });
};

module.exports["http"] = function (options) { return beforeMethod(module.exports["httpAdvice"]); };
});

return httpDecorator;

})));
