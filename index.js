const axios = require('axios');
const { beforeMethod } = require('kaop-ts');

const config = { base: '' };

const http = (method = 'get', headers) =>
beforeMethod(function(meta){
  const [ url, params ] = meta.args;
  const opts = { method, headers }
  opts[method === 'get' ? 'params' : 'data'] = params;
  opts['url'] = config.base ? `${config.base}/${url}`: url;
  axios(opts)
  .then(({ data }) => {
    meta.args = [ url, params, null, data ];
    this.next();
  })
  .catch((error) => {
    meta.args = [ url, params, error, null];
    this.next();
  })
});

module.exports = {
  config,
  http
}
