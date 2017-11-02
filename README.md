### http decorator

axios + kaop-ts = <3

This library allows to easily implement AJAX calls without messing with Async stuff

This tiny project is also a demo about writing custom decorators using [kaop-ts](https://www.npmjs.com/package/kaop-ts) API

[fork me on Github](https://github.com/k1r0s/kaop-ts/)

### Get Started

install: `npm install http-decorator`

import: `import { http } from 'http-decorator';`

usage:

```javascript
class SomeClass {
  @http()
  public someMethod (url: string, params?: any, error?, result?): void {
    // error should be null if request was success
  }
}

someClassInstance.someMethod('localhost/resource');
// $ curl localhost/resource
someClassInstance.someMethod('localhost/resource', { id: 1 });
// $ curl localhost/resource?id=1
```
You can use global configs to set a API root as follows:

```javascript
import { config } from 'dec-http';

config.base = 'http://jsonplaceholder.typicode.com';

someClassInstance.someMethod('users');
// $ curl http://jsonplaceholder.typicode.com/users

}
```

To use another HTTP verb just place it as a decorator argument:

```javascript
class SomeClass {
  @http('put')
  public someMethod (url: string, params?: any, error?, result?): void {

  }
}
```

### How it works -> 25 lines

```javascript
import axios from 'axios';
import { beforeMethod, IAdviceSignature } from 'kaop-ts';

export interface HttpGlobals {
  base: string
}

export const config: HttpGlobals = { base: '' };

export const http = (method = 'get', headers?) =>
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
```
