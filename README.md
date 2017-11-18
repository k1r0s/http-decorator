### http decorator

axios + kaop-ts = <3

This library allows to easily implement AJAX calls without messing with Async stuff and **with the same axios API**.

You only have to include this decorator in one method, then the decorated method will be threated as then or catch for the call. Only receiving the params.

This tiny project is also a demo about writing custom decorators using [kaop-ts](https://www.npmjs.com/package/kaop-ts) API

[fork me on Github](https://github.com/k1r0s/kaop-ts/)

### Get Started

install: `npm install http-decorator`

import: `import { http } from 'http-decorator';`

usage:

```javascript
class SomeClass {
  @http({ url: 'localhost/resource'})
  public someMethod (params?: any, error?, result?): void {
    // error should be null if request was success
  }
}

someClassInstance.someMethod();
// $ curl localhost/resource
someClassInstance.someMethod({ id: 1 });
// $ curl localhost/resource?id=1
```
You should wrap this decorator with another function to set global axios options like headers or so:

```javascript
import { http } from 'http-decorator';

// wrap a decorator to pass default arguments
export const get = (resourcePath) => http({ url: `http://jsonplaceholder.typicode.com${resourcePath}` })
export const post = (resourcePath) => http({ method: 'post', url: `http://jsonplaceholder.typicode.com${resourcePath}` })
export const put = (resourcePath) => http({ method: 'put', url: `http://jsonplaceholder.typicode.com${resourcePath}`, headers: { whatsoever } })

...

class SomeClass {

  // using the wrapper decorator
  @get('/users')
  public someMethod (params, error, result) {}
}

someClassInstance.someMethod();
// $ curl http://jsonplaceholder.typicode.com/users
}
```

### How it works -> 17 lines

```javascript
const axios = require('axios');
const { beforeMethod } = require('kaop-ts');

module.exports = {
  http: ({ method = 'get', ...options }) =>
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
  })
};

```
