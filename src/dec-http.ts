import axios from 'axios';
import { beforeMethod, IAdviceSignature } from 'kaop-ts';

export interface HttpGlobals {
  base: string
}

export const config: HttpGlobals = { base: '' };

export const http = (method = 'get', headers?) =>
beforeMethod(function(meta){
  const [ url, params ] = meta.args;
  const opts = { method, url: `${config.base}/${url}`, headers }
  opts[method === 'get' ? 'params' : 'data'] = params;
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
