# node-rohc
Binding ROHC library

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

## Doc
* https://rohc-lib.org/support/documentation/API/rohc-doc-2.1.0/group__rohc.html

## Helpful pages
* https://hpd.gasmi.net/