const {Rohc} = require('..');

const r = new Rohc();
console.log(r.getVersion());

const compress = r.rohcCompress(new ArrayBuffer(10));

console.log(compress);