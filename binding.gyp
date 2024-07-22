{
  "targets": [
    {
      "target_name": "rohcAddon",
      "sources": [
        "src/cpp/rohc-napi.cpp",
        "src/cpp/njsrohc.cpp"
      ],
      'cflags!': [ '-fno-exceptions', '--std=c++17', '-Wno-stringop-truncation' ],
      'cflags_cc!': [ '-fno-exceptions', '--std=c++17', '-Wno-stringop-truncation' ],
      "cflags+": [
        "-fvisibility=hidden",
        '--std=c++17',
        '-Wno-stringop-truncation'
      ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")",
      ],
      'libraries': [
        "/lib/librohc.so"
      ],
      "defines": [
        "NODE_ADDON_API_DISABLE_DEPRECATED",
        "NAPI_VERSION=<(napi_build_version)",
        "NAPI_CPP_EXCEPTIONS"
      ]
    }
  ]
}