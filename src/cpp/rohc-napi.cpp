#include <iostream>
#include <sstream>
#include <cstdio>
#include <napi.h>
#include <rohc/rohc.h>
#include <rohc/rohc_comp.h>

#define BUFFER_SIZE 2048

using namespace Napi;

static int gen_random_num(const struct rohc_comp *const comp, void *const user_context);

static Value rohcNVersion(const CallbackInfo& info) {
    const Env& env = info.Env();
    return String::From(env, rohc_version());
}

static Value rohcNCompress(const CallbackInfo& info) {
    rohc_status_t status;

    unsigned char ip_buffer[BUFFER_SIZE];
    unsigned char rohc_buffer[BUFFER_SIZE];

    struct rohc_buf rohc_packet = rohc_buf_init_empty(rohc_buffer, BUFFER_SIZE);

    const Env& env = info.Env();

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
    struct rohc_buf ip_packet = rohc_buf_init_empty(ip_buffer, BUFFER_SIZE);

    // Dump ------------------------------------------------------------------------------------------------------------
    std::ostringstream ipdump;
    ipdump << "IP-Packet Dump: ";

    for (size_t i = 0; i < length; ++i) {
        char hex_byte[6];
        std::sprintf(hex_byte, "%02x ", rohc_buf_byte_at(ip_packet, i));
        ipdump << hex_byte;
    }

    std::string dumpMsg = ipdump.str();
    Napi::Function consoleLog2 = env.Global().Get("console").As<Napi::Object>().Get("log").As<Napi::Function>();
    consoleLog2.Call({ Napi::String::New(env, dumpMsg) });

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

    status = rohc_compress4(compressor, ip_packet, &rohc_packet);

    if(status == ROHC_STATUS_SEGMENT) {
        Napi::Function consoleLog = env.Global().Get("console").As<Napi::Object>().Get("log").As<Napi::Function>();
        consoleLog.Call({ Napi::String::New(env, "success: compression succeeded, but resulting ROHC packet was too large for the Maximum Reconstructed Reception Unit (MRRU) configured with \ref rohc_comp_set_mrru, the rohc_packet buffer contains the first ROHC segment and \ref rohc_comp_get_segment can be used to retrieve the next ones.") });
    } else if(status == ROHC_STATUS_OK) {
        Napi::Function consoleLog = env.Global().Get("console").As<Napi::Object>().Get("log").As<Napi::Function>();
        consoleLog.Call({ Napi::String::New(env, "ROHC packet resulting from the ROHC compression:") });
    } else {
        std::ostringstream oss;
        oss << "ROHC packet resulting from the ROHC compression: Status = " << status;
        std::string errorMsg = oss.str();

        throw Napi::TypeError::New(env, errorMsg);
    }

    rohc_comp_free(compressor);

   auto objResult = Object::New(info.Env());
    /*objResult.DefineProperty(
        PropertyDescriptor::Value(
            "buffer",
            ArrayBuffer::New(env, data.release(), data.size())
        )
    );*/
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