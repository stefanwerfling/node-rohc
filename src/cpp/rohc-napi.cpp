#include "njsrohc.h"
#include <iostream>
#include <sstream>
#include <cstdio>
#include <cstdint>
#include <napi.h>
#include <rohc/rohc.h>
#include <rohc/rohc_comp.h>

using namespace Napi;

// rohc version
// ---------------------------------------------------------------------------------------------------------------------
static Value rohcNVersion(const CallbackInfo& info) {
    const Env& env = info.Env();
    return String::From(env, rohc_version());
}

// INIT
// ---------------------------------------------------------------------------------------------------------------------

Object Init(Env env, Object exports) {
    try {
        Object returnExports = NjsRohc::Init(env, exports);

        returnExports.Set("rohcVersion", Function::New(env, rohcNVersion));

        return returnExports;
    } catch (const std::exception& e) {
        Napi::TypeError::New(env, e.what()).ThrowAsJavaScriptException();
    }

    return exports;
}

NODE_API_MODULE(rohcAddon, Init)