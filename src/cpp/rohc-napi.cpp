#include <napi.h>
#include <rohc/rohc.h>

static Napi::Value rohcNVersion(const Napi::CallbackInfo& info) {
    const Napi::Env& env = info.Env();
    return Napi::String::From(env, rohc_version());
}

static Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set("rohcVersion", Napi::Function::New(env, rohcNVersion));
    return exports;
}

NODE_API_MODULE(rohcAddon, Init)