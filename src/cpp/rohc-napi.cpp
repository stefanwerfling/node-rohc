#include "njsrohc.h"
#include <iostream>
#include <sstream>
#include <cstdio>
#include <cstdint>
#include <napi.h>
#include <rohc/rohc.h>
#include <rohc/rohc_comp.h>

#define BUFFER_SIZE 2048

using namespace Napi;

// Globals
// ---------------------------------------------------------------------------------------------------------------------
njsrohc_h* njsRohc = nullptr;


// rohc version
// ---------------------------------------------------------------------------------------------------------------------
static Value rohcNVersion(const CallbackInfo& info) {
    const Env& env = info.Env();
    return String::From(env, rohc_version());
}

// rohc compress
// ---------------------------------------------------------------------------------------------------------------------
static Value rohcNCompress(const CallbackInfo& info) {
    uint8_t ip_buffer[BUFFER_SIZE];
    uint8_t rohc_buffer[BUFFER_SIZE];

    const Env& env = info.Env();
    Napi::Function log = env.Global().Get("console").As<Napi::Object>().Get("log").As<Napi::Function>();

    if (info.Length() != 1) {
        throw TypeError::New(env, "Wrong number of arguments");
    }

    // Check that the argument is a Uint8Array
    if (!info[0].IsTypedArray() || info[0].As<Napi::TypedArray>().TypedArrayType() != napi_uint8_array) {
        throw TypeError::New(env, "Argument must be a Uint8Array");
        return env.Null();
    }

    Napi::Uint8Array ipBufferUnit = info[0].As<Napi::Uint8Array>();

    size_t length = ipBufferUnit.ByteLength();

    // Ensure the length does not exceed BUFFER_SIZE
    if (length > BUFFER_SIZE) {
        throw TypeError::New(env, "Uint8Array is too large");
        return env.Null();
    }

    std::memcpy(ip_buffer, ipBufferUnit.Data(), length);

    // -----------------------------------------------------------------------------------------------------------------
    log.Call({ Napi::String::New(env, "Before njsrohc_comp") });
    int return_size = njsrohc_comp(env, njsRohc, ip_buffer, rohc_buffer, length);

    std::ostringstream oss;
    oss << "After njsrohc_comp: new size: = " << return_size;
    oss << " org size: = " << length;

    log.Call({ Napi::String::New(env, oss.str()) });

    // -----------------------------------------------------------------------------------------------------------------

    Napi::Uint8Array resultBuffer = Napi::Uint8Array::New(env, return_size);

    for (int i = 0; i < return_size; ++i) {
        resultBuffer[i] = rohc_buffer[i];
    }

    auto objResult = Object::New(info.Env());
    objResult.DefineProperty(PropertyDescriptor::Value("buffer", resultBuffer));
    return objResult;
}

// rohc decompress
// ---------------------------------------------------------------------------------------------------------------------
static Value rohcNDecompress(const CallbackInfo& info) {
    uint8_t rohc_buffer[BUFFER_SIZE];
    uint8_t ip_buffer[BUFFER_SIZE];

    const Env& env = info.Env();
    Napi::Function log = env.Global().Get("console").As<Napi::Object>().Get("log").As<Napi::Function>();

    if (info.Length() != 1) {
        throw TypeError::New(env, "Wrong number of arguments");
    }

    // Check that the argument is a Uint8Array
    if (!info[0].IsTypedArray() || info[0].As<Napi::TypedArray>().TypedArrayType() != napi_uint8_array) {
        throw TypeError::New(env, "Argument must be a Uint8Array");
        return env.Null();
    }

    Napi::Uint8Array rohcBufferUnit = info[0].As<Napi::Uint8Array>();

    size_t length = rohcBufferUnit.ByteLength();

    // Ensure the length does not exceed BUFFER_SIZE
    if (length > BUFFER_SIZE) {
        throw TypeError::New(env, "Uint8Array is too large");
        return env.Null();
    }

    std::memcpy(rohc_buffer, rohcBufferUnit.Data(), length);

    // -----------------------------------------------------------------------------------------------------------------
    log.Call({ Napi::String::New(env, "Before njsrohc_decomp") });
    int return_size = njsrohc_decomp(env, njsRohc, rohc_buffer, ip_buffer, length);

    std::ostringstream oss;
    oss << "After njsrohc_decomp: new size: = " << return_size;
    oss << " org size: = " << length;

    log.Call({ Napi::String::New(env, oss.str()) });

    // -----------------------------------------------------------------------------------------------------------------

    Napi::Uint8Array resultBuffer = Napi::Uint8Array::New(env, return_size);

    for (int i = 0; i < return_size; ++i) {
        resultBuffer[i] = ip_buffer[i];
    }

    auto objResult = Object::New(info.Env());
    objResult.DefineProperty(PropertyDescriptor::Value("buffer", resultBuffer));
    return objResult;
}

// INIT
// ---------------------------------------------------------------------------------------------------------------------

Object Init(Env env, Object exports) {
    try {
        njsRohc = njsrohc_init(env, BUFFER_SIZE);

        if (njsRohc == nullptr) {
            throw std::runtime_error("Failed to initialize ROHC context");
        }

        napi_add_env_cleanup_hook(env, [](void* /*data*/) {
            njsrohc_free(njsRohc);
        }, nullptr);

        exports.Set("rohcVersion", Function::New(env, rohcNVersion));
        exports.Set("rohcCompress", Function::New(env, rohcNCompress));
        exports.Set("rohcDecompress", Function::New(env, rohcNDecompress));
    } catch (const std::exception& e) {
        Napi::TypeError::New(env, e.what()).ThrowAsJavaScriptException();
    }

    return exports;
}

NODE_API_MODULE(rohcAddon, Init)