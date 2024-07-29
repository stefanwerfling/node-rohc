# Node-Rohc
Node.js Binding ROHC library, see more on https://github.com/stefanwerfling/rohc. 
* More information, see on: https://de.wikipedia.org/wiki/ROHC.
* Inspired by: 
  * https://github.com/airbus-cyber/IP2LoRa 
  * https://www.cyber.airbus.com/ip2lora-a-diverted-use-of-lora-to-build-your-wireless-ip-link-over-kilometers/

A package for binding to the rohc library with Typescript.
It will later be combined with https://github.com/stefanwerfling/node-tuntap2.
It is intended to reduce data traffic, for example via LoRa, a VPN or etc.

This is an alpha version 1.0.4!

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
import {Rohc, RohcProfiles, RohcStatus} from 'node-rohc';

console.log(Rohc.getVersion());

const r = new Rohc([
  RohcProfiles.ROHC_PROFILE_UNCOMPRESSED,
  RohcProfiles.ROHC_PROFILE_IP,
  RohcProfiles.ROHC_PROFILE_TCP,
  RohcProfiles.ROHC_PROFILE_UDP,
  RohcProfiles.ROHC_PROFILE_ESP,
  RohcProfiles.ROHC_PROFILE_RTP
]);

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

    if (r.getLastStatus() === RohcStatus.ROHC_OK) {
      console.log('All OK');
    }
    
    console.log(r.compressLastPacketInfo());
    console.log(r.compressGeneralInfo());
    console.log(r.decompressLastPacketInfo());
    console.log(r.decompressGeneralInfo());
} catch (e) {
    console.error(e);
}
```

Output:
```text
Debugger attached.
Uint8Array(52) [
   69,   0,   0,  52,   0,   0,   0,   0,  64,  6, 249,
  112, 192, 168,   0,   1, 192, 168,   0,   2, 72, 101,
  108, 108, 111,  44,  32, 116, 104, 105, 115, 32, 105,
  115,  32, 116, 104, 101,  32, 100,  97, 116, 97,  32,
  112,  97, 121, 108, 111,  97, 100,  33
]
2.4.0~a0d95093
Buffer Dump: 45 00 00 34 00 00 00 00 40 06 f9 70 c0 a8 00 01 c0 a8 00 02 48 65 6c 6c 6f 2c 20 74 68 69 73 20 69 73 20 74 68 65 20 64 61 74 61 20 70 61 79 6c 6f 61 64 21 
[rohc_comp.c:640 rohc_comp_get_profile()] ROHCv1 Uncompressed profile is possible

[rohc_comp.c:1022 rohc_comp_are_ip_hdrs_supported()] found IPv4

[rohc_comp.c:1078 rohc_comp_are_ip_hdrs_supported()]    source address = c0a80001 (192.168.0.1)
...

[rohc_comp.c:1595 rohc_compress4()] copy full 32-byte payload

[rohc_comp.c:1603 rohc_compress4()] ROHC size = 53 bytes (header = 21, payload = 32), output buffer size = 2048

compress status: = 0
Uint8Array(53) [
  253,   4,  69,  64,   6, 192, 168,   0,   1, 192, 168,
    0,   2,   0,  64,   0,   0,  32,   0, 251, 103,  72,
  101, 108, 108, 111,  44,  32, 116, 104, 105, 115,  32,
  105, 115,  32, 116, 104, 101,  32, 100,  97, 116,  97,
   32, 112,  97, 121, 108, 111,  97, 100,  33
]
fd04454006c0a80001c0a80002004000002000fb6748656c6c6f2c2074686973206973207468652064617461207061796c6f616421
Buffer Dump: fd 04 45 40 06 c0 a8 00 01 c0 a8 00 02 00 40 00 00 20 00 fb 67 48 65 6c 6c 6f 2c 20 74 68 69 73 20 69 73 20 74 68 65 20 64 61 74 61 20 70 61 79 6c 6f 61 64 21 
[rohc_decomp.c:793 rohc_decompress3()] decompress the 53-byte packet #1

[rohc_decomp.c:3924 rohc_decomp_parse_padding()] skip 0 byte(s) of padding

[rohc_decomp.c:3852 rohc_decomp_decode_cid()] no add-CID found, CID defaults to 0

....

decompress status: = 0
Uint8Array(52) [
   69,   0,   0,  52,   0,   0,   0,   0,  64,  6, 249,
  112, 192, 168,   0,   1, 192, 168,   0,   2, 72, 101,
  108, 108, 111,  44,  32, 116, 104, 105, 115, 32, 105,
  115,  32, 116, 104, 101,  32, 100,  97, 116, 97,  32,
  112,  97, 121, 108, 111,  97, 100,  33
]
45000034000000004006f970c0a80001c0a8000248656c6c6f2c2074686973206973207468652064617461207061796c6f616421
All OK
{
  version_major: 0,
  version_minor: 0,
  context_id: 0,
  is_context_init: true,
  context_mode: 1,
  context_state: 1,
  context_used: true,
  profile_id: 4,
  packet_type: 0,
  total_last_uncomp_size: 52,
  header_last_uncomp_size: 20,
  total_last_comp_size: 53,
  header_last_comp_size: 21
}
{
  version_major: 0,
  version_minor: 0,
  contexts_nr: 1,
  packets_nr: 1,
  uncomp_bytes_nr: 52,
  comp_bytes_nr: 53
}
{
  version_major: 0,
  version_minor: 0,
  context_mode: 2,
  context_state: 3,
  profile_id: 4,
  nr_lost_packets: 0,
  nr_misordered_packets: 0,
  is_duplicated: false,
  corrected_crc_failures: 11745388377929038000,
  corrected_sn_wraparounds: 14987979559889062000,
  corrected_wrong_sn_updates: 12105675798372346000,
  packet_type: 449595,
  total_last_comp_size: 18407961667527770000,
  header_last_comp_size: 1940628627783807,
  total_last_uncomp_size: 18407961667125117000,
  header_last_uncomp_size: 217316637802623
}
{
  version_major: 0,
  version_minor: 0,
  contexts_nr: 1,
  packets_nr: 1,
  comp_bytes_nr: 53,
  uncomp_bytes_nr: 52,
  corrected_crc_failures: 0,
  corrected_sn_wraparounds: 8518447232180027000,
  corrected_wrong_sn_updates: 4295000063
}


```

## Dev
#### Missing rohclib.o
Set path for the Linker to the libary:
```shell
export LD_LIBRARY_PATH=/usr/local/lib:$LD_LIBRARY_PATH
npm run build --loglevel verbose
```

## Doc
* https://rohc-lib.org/support/documentation/API/rohc-doc-2.3.1/group__rohc.html

## Helpful pages
* https://hpd.gasmi.net/
* https://www.sharetechnote.com/html/Handbook_LTE_ROHC.html