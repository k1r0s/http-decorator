const axios = require('axios');
const { beforeMethod } = require('kaop-ts');

module.exports = ({ method = 'get', ...options }) =>
beforeMethod(function(meta){
  const [params] = meta.args;
  options[method === 'get' ? 'params' : 'data'] = params;
  axios({ method, ...options })
  .then(res => {
    meta.args = [params, null, res.data];
    this.next();
  })
  .catch(error => {
    meta.args = [params, error, null];
    this.next();
  })
});
