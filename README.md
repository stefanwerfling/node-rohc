# Node-Rohc
Node.js Binding ROHC library, see more on https://github.com/stefanwerfling/rohc. 
* More information, see on: https://de.wikipedia.org/wiki/ROHC.
* Inspired by: 
  * https://github.com/airbus-cyber/IP2LoRa 
  * https://www.cyber.airbus.com/ip2lora-a-diverted-use-of-lora-to-build-your-wireless-ip-link-over-kilometers/

A package for binding to the rohc library with Typescript.
It will later be combined with https://github.com/stefanwerfling/node-tuntap2.
It is intended to reduce data traffic, for example via LoRa, a VPN or etc.

This is an alpha version 1.0.2!

## Rohc install
```shell
sudo apt-get install autotools-dev
sudo apt-get install automake
sudo apt-get install libtool
sudo apt-get install libpcap-dev
sudo apt-get install -y libcmocka-dev

git clone https://github.com/stefanwerfling/rohc.git
cd rohc

./autogen.sh --prefix=/usr

make all
sudo make install
```

```shell
cd yourProject
```

```shell
npm intall git+https://github.com/stefanwerfling/node-rohc
```

or 

```shell
npm i node-rohc
```

## Check build by hand:
```shell
npm run build --loglevel verbose
```

## Used
```js
import {Rohc} from 'node-rohc';

console.log(Rohc.getVersion());

const r = new Rohc();

r.setLogger(msg => {
    console.log(msg);
});

try {
    const compress = r.compress(new Uint8Array(ipPacketBufferWithContent));

    console.log(compress);

    if (compress) {
        console.log(Buffer.from(compress).toString("hex"));

        const decompress = r.decompress(compress);

        console.log(decompress);

        if (decompress) {
            console.log(Buffer.from(decompress).toString("hex"));
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