#include <iostream>
#include <napi.h>
#include <rohc/rohc.h>
#include <rohc/rohc_comp.h>

using namespace Napi;

static int gen_random_num(const struct rohc_comp *const comp, void *const user_context);

static Value rohcNVersion(const CallbackInfo& info) {
    const Env& env = info.Env();
    return String::From(env, rohc_version());
}

static Value rohcNCompress(const CallbackInfo& info) {
    const Env& env = info.Env();

    if (info.Length() != 1) {
        throw TypeError::New(env, "Wrong number of arguments");
    }

    if (!(info[0].IsArrayBuffer())) {
        throw TypeError::New(env, "Wrong argument(s)!");
    }

    // -----------------------------------------------------------------------------------------------------------------

    struct rohc_comp *compressor;

    /* Create a ROHC compressor with small CIDs and the largest MAX_CID possible for small CIDs */
    compressor = rohc_comp_new2(ROHC_SMALL_CID, ROHC_SMALL_CID_MAX, gen_random_num, NULL);

    if(compressor == NULL) {
        throw Napi::TypeError::New(env, "Failed create the ROHC Compressor!");
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

    rohc_comp_free(compressor);

    std::vector<char> v{0x10, 0x11, 0x12};


    const Object objResult = Object::New(info.Env());
    objResult.DefineProperty(
        PropertyDescriptor::Value(
            "buffer",
            ArrayBuffer::New(env, v.data(), v.size())
        )
    );
    //objResult["buffer"] = ;
    //objResult["Test"] = String::From(env, "test");

    return objResult;
    //return Object(env, objResult);
    //return String::From(env, "Test");
}

static int gen_random_num(const struct rohc_comp *const comp, void *const user_context) {
	return rand();
}

static Object Init(Env env, Object exports) {
    exports.Set("rohcVersion", Function::New(env, rohcNVersion));
    exports.Set("rohcCompress", Function::New(env, rohcNCompress));
    return exports;
}

NODE_API_MODULE(rohcAddon, Init)