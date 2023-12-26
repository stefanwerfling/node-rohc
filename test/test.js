const {Rohc} = require('..');

const r = new Rohc();
console.log(r.getVersion());

console.log(r.rohcCompress(new ArrayBuffer(10)));