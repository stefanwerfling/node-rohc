# node-rohc
Binding ROHC library, see more on https://github.com/stefanwerfling/rohc.

This is an alpha version!

## Rohc install
```shell
sudo apt-get install autotools-dev
sudo apt-get install automake
sudo apt-get install libtool
sudo apt-get install libpcap-dev
sudo apt-get install -y libcmocka-dev

git clone https://github.com/stefanwerfling/rohc.git

./autogen.sh --prefix=/usr

make all
sudo make install
```

## Test
test/test.js Result:
```shell
For help, see: https://nodejs.org/en/docs/inspector
Debugger attached.
2.4.0~a0d95093
Waiting for the debugger to disconnect...

Process finished with exit code 0

```

## Used
```js
const {Rohc} = require('..');

const r = new Rohc();
console.log(r.getVersion());

try {
    const compress = r.rohcCompress(new Uint8Array(ipPacketBufferWithContent));

    console.log(compress);

    if (compress.buffer) {
        console.log(Buffer.from(compress.buffer).toString("hex"));

        const decompress = r.rohcDecompress(compress.buffer);

        console.log(decompress);

        if (decompress.buffer) {
            console.log(Buffer.from(decompress.buffer).toString("hex"));
        }
    }
} catch (e) {
    console.error(e);
}
```

Output:
```text
2.4.0~a0d95093
index.ts:10Before njsrohc_comp
index.ts:10Buffer Dump: 45 00 00 34 00 00 00 00 40 06 f9 70 c0 a8 00 01 c0 a8 00 02 48 65 6c 6c 6f 2c 20 74 68 69 73 20 69 73 20 74 68 65 20 64 61 74 61 20 70 61 79 6c 6f 61 64 21 
index.ts:10compress status: = 0
index.ts:10Buffer Dump: fd 04 45 40 06 c0 a8 00 01 c0 a8 00 02 00 40 00 00 20 00 fb 67 48 65 6c 6c 6f 2c 20 74 68 69 73 20 69 73 20 74 68 65 20 64 61 74 61 20 70 61 79 6c 6f 61 64 21 
index.ts:10After njsrohc_comp: new size: = 53 org size: = 52
test.js:89
Object {buffer: Uint8Array(53)}
test.js:92fd04454006c0a80001c0a80002004000002000fb6748656c6c6f2c2074686973206973207468652064617461207061796c6f616421
index.js:13Before njsrohc_decomp
index.js:13Buffer Dump: fd 04 45 40 06 c0 a8 00 01 c0 a8 00 02 00 40 00 00 20 00 fb 67 48 65 6c 6c 6f 2c 20 74 68 69 73 20 69 73 20 74 68 65 20 64 61 74 61 20 70 61 79 6c 6f 61 64 21 
index.js:13decompress status: = 0
index.js:13Buffer Dump: 45 00 00 34 00 00 00 00 40 06 f9 70 c0 a8 00 01 c0 a8 00 02 48 65 6c 6c 6f 2c 20 74 68 69 73 20 69 73 20 74 68 65 20 64 61 74 61 20 70 61 79 6c 6f 61 64 21 
index.js:13After njsrohc_decomp: new size: = 52 org size: = 53
test.js:96
Object {buffer: Uint8Array(52)}
test.js:9945000034000000004006f970c0a80001c0a8000248656c6c6f2c2074686973206973207468652064617461207061796c6f616421
```

## Doc
* https://rohc-lib.org/support/documentation/API/rohc-doc-2.1.0/group__rohc.html

## Helpful pages
* https://hpd.gasmi.net/