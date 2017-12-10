const axios = require('axios');
const { beforeMethod } = require('kaop-ts');

module.exports["http"] = options =>
beforeMethod(meta => {
  if(!options.method) options.method = "get";
  const params = meta.args[0];
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
});
