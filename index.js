const axios = require('axios');
const { beforeMethod } = require('kaop-ts');

module.exports["httpAdvice"] = meta => {
  if(!options.method) options.method = "get";
  const [params] = meta.args;
  options[options.method === 'get' ? 'params' : 'data'] = params;
  axios(options)
  .then(res => {
    meta.args = [params, null, res.data];
    meta.commit();
  })
  .catch(error => {
    meta.args = [params, error, null];
    meta.commit();
  })
};

module.exports["http"] = options =>
beforeMethod(module.exports["httpAdvice"]);
