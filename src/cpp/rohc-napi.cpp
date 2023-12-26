#include <iostream>
#include <napi.h>
#include <rohc/rohc.h>
#include <rohc/rohc_comp.h>

static int gen_random_num(const struct rohc_comp *const comp, void *const user_context);

static Napi::Value rohcNVersion(const Napi::CallbackInfo& info) {
    const Napi::Env& env = info.Env();
    return Napi::String::From(env, rohc_version());
}

static Napi::Value rohcNCompress(const Napi::CallbackInfo& info) {
    const Napi::Env& env = info.Env();

    if (info.Length() != 1) {
        throw Napi::TypeError::New(env, "Wrong number of arguments");
    }

    if (!(info[0].IsArrayBuffer())) {
        throw Napi::TypeError::New(env, "Wrong argument(s)!");
    }

    struct rohc_comp *compressor;

    compressor = rohc_comp_new2(ROHC_SMALL_CID, ROHC_SMALL_CID_MAX, gen_random_num, NULL);

    if(compressor == NULL) {
        throw Napi::TypeError::New(env, "ROHC Compressor return null!");
    }

    if(!rohc_comp_enable_profile(compressor, ROHC_PROFILE_UNCOMPRESSED)) {
        throw Napi::TypeError::New(env, "ROHC failed to enable the Uncompressed profile!");
    }

    if(!rohc_comp_enable_profile(compressor, ROHC_PROFILE_IP)) {
        throw Napi::TypeError::New(env, "ROHC failed to enable the IP-only profile!");
    }

    if(!rohc_comp_enable_profiles(compressor, ROHC_PROFILE_UDP, ROHC_PROFILE_ESP, -1)) {
        throw Napi::TypeError::New(env, "ROHC failed to enable the IP/UDP and IP/ESP profiles!");
    }

    std::cout << "Test";

    rohc_comp_free(compressor);

    std::vector<char> v{0x10, 0x11, 0x12};

    return Napi::ArrayBuffer::New(env, v.data(), v.size());
}

static int gen_random_num(const struct rohc_comp *const comp,
                          void *const user_context)
{
	return rand();
}

static Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set("rohcVersion", Napi::Function::New(env, rohcNVersion));
    exports.Set("rohcCompress", Napi::Function::New(env, rohcNCompress));
    return exports;
}

NODE_API_MODULE(rohcAddon, Init)