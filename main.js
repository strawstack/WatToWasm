const fs = require('fs');
const compile = require('./wat2wasm.js');

/*
    The code below compiles WAT to WASM and then uses the WASM to
    create a Web Assembly module which is then executed by Javascript.

    We import 'compile' from the 'wat2wasm.js' file. 'compile' is passed
    a string of WAT from 'addTwo.wat'.
*/
fs.readFile('addTwo.wat', (err, watString) => {
  if (err) throw err;

  compile(watString).then((wasmModule) => {
      const wasmInstance = new WebAssembly.Instance(wasmModule, {});
      const { addTwo } = wasmInstance.exports;
      for (let i = 0; i < 10; i++) {
          console.log(addTwo(i, i));
      }
  });

});
