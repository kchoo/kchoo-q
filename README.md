# kchoo-q

A wrapper around ES6 `Promise`s, based on https://github.com/kriskowal/q



## Usage:

```
const fs = require('fs');
const $q = require('kchoo-q');

const readFileAsyncWithPromises = $q.promisify(fs.readFile, fs);

readFileAsyncWithPromises('./sample.txt').
  then(data => {
    // here's your file
  }).
  catch(err => {
    // oh no
  });
```

To do this normally with `Promise`s, you'd need to do something like:

```
const readFileAsyncWithPromises = new Promise((resolve, reject) => {
  fs.readFile('./sample.txt', function (err, data) {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

readFileAsyncWithPromises.
  then(...).
  catch(...);
```

Which I find very ugly

There is also a `$q.defer()`, which works the way you'd expect it to work (if you've used Q-esque libraries):

```
const deferred = $q.defer();

fs.readFile('./sample.txt', function (err, data) {
  if (err) {
    deferred.reject(err);
  } else {
    deferred.resolve(data);
  }
});

deferred.promise.
  then(...).
  catch(...);
```
