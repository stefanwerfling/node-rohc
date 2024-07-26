#include "njsrohc.h"
#include "dbg.h"
#include <stdarg.h>
#include <stdlib.h>
#include <iostream>
#include <sstream>
#include <time.h>
#include <assert.h>

const struct rohc_ts _time = { .sec = 0, .nsec = 0 };

// rohc rand
// ---------------------------------------------------------------------------------------------------------------------
static int _rohc_rand(const struct rohc_comp *const c, void *const user_ctx) {
  return rand();
}

// ---------------------------------------------------------------------------------------------------------------------

/**
 * Init NAPI
 */
Napi::Object NjsRohc::Init(Napi::Env env, Napi::Object exports) {
    Napi::Function func = DefineClass(env, "NjsRohc", {
        InstanceMethod("setBufferSize", &NjsRohc::setBufferSize),
        InstanceMethod("getBufferSize", &NjsRohc::getBufferSize),
        InstanceMethod("setLogger", &NjsRohc::setLogger),
        InstanceMethod("compress", &NjsRohc::compress),
        InstanceMethod("decompress", &NjsRohc::decompress),
    });

    Napi::FunctionReference* constructor = new Napi::FunctionReference();
    *constructor = Napi::Persistent(func);
    env.SetInstanceData(constructor);

    exports.Set("NjsRohc", func);
    return exports;
}

/**
 * Constructor
 */
NjsRohc::NjsRohc(const Napi::CallbackInfo& info): Napi::ObjectWrap<NjsRohc>(info) {
    Napi::Env env = info.Env();

    std::vector<int> profiles;

    // Arg 1 Profiles
    if (info.Length() > 0 && info[0].IsArray()) {
        Napi::Array inputProfilesArray = info[0].As<Napi::Array>();
        size_t lengthProfiles = inputProfilesArray.Length();

        for (size_t i = 0; i < lengthProfiles; i++) {
            Napi::Value valueProfile = inputProfilesArray[i];

            if (valueProfile.IsNumber()) {
                profiles.push_back(valueProfile.As<Napi::Number>().Int32Value());
            }
        }
    }

    // -----------------------------------------------------------------------------------------------------------------

    if (profiles.empty()) {
        throw Napi::TypeError::New(env, "None Profiles set on argument 1!");
    }

    // -----------------------------------------------------------------------------------------------------------------

    this->buf_size_ = DEFAULT_BUFFER_SIZE;
    this->njsRohc_ = (njsrohc_h*)malloc(sizeof(njsrohc_h));
    this->njsRohc_->max_len = this->buf_size_;

    // compress init ---------------------------------------------------------------------------------------------------

    this->njsRohc_->c = rohc_comp_new2(ROHC_SMALL_CID, ROHC_SMALL_CID_MAX, _rohc_rand, NULL);

    if (this->njsRohc_->c == NULL) {
        throw Napi::TypeError::New(env, "Failed create the ROHC Compressor!");
    }

    if (!rohc_comp_set_traces_cb2(this->njsRohc_->c, printRohcTraces_, this)) {
        throw Napi::TypeError::New(env, "Failed to set the callback for traces on compressor!");
    }

    for (int profile : profiles) {
        if (NjsRohcProfileNames.count(profile) == 0) {
            std::ostringstream pError;
            pError << "ROHC Profile not supported! profile: " << profile;

            throw Napi::TypeError::New(env, pError.str());
        }

        if (!rohc_comp_enable_profile(this->njsRohc_->c, static_cast<rohc_profile_t>(profile))) {
            std::ostringstream sError;
            sError << "ROHC failed to enable the compressor profile! profile: ";
            sError << NjsRohcProfileNames.at(profile);

            throw Napi::TypeError::New(env, sError.str());
        }
    }

    // decompress init -------------------------------------------------------------------------------------------------

    this->njsRohc_->d = rohc_decomp_new2(ROHC_SMALL_CID, ROHC_SMALL_CID_MAX, ROHC_O_MODE);

    if(this->njsRohc_->d == NULL) {
        throw Napi::TypeError::New(env, "Failed create the ROHC Decompressor!");
    }

    if (!rohc_decomp_set_traces_cb2(this->njsRohc_->d, printRohcTraces_, this)) {
        throw Napi::TypeError::New(env, "Failed to set the callback for traces on decompressor!");
    }

    for (int profile : profiles) {
        if (NjsRohcProfileNames.count(profile) == 0) {
            std::ostringstream pError;
            pError << "ROHC Profile not supported! profile: " << profile;

            throw Napi::TypeError::New(env, pError.str());
        }

        if (!rohc_decomp_enable_profile(this->njsRohc_->d, static_cast<rohc_profile_t>(profile))) {
            std::ostringstream sError;
            sError << "ROHC failed to enable the decompressor profile! profile: ";
            sError << NjsRohcProfileNames.at(profile);

            throw Napi::TypeError::New(env, sError.str());
        }
    }
};

/**
 * Destructor
 */
NjsRohc::~NjsRohc() {
    if (this->njsRohc_ != nullptr) {
        if(this->njsRohc_->c != NULL) {
            rohc_comp_free(this->njsRohc_->c);
        }

        if(this->njsRohc_->d != NULL) {
            rohc_decomp_free(this->njsRohc_->d);
        }

        free(this->njsRohc_);
    }
}

/**
 * NAPI Destructor
 */
void NjsRohc::Destructor(Napi::Env env, void* nativeObject, void* /*finalize_hint*/) {
    delete static_cast<NjsRohc*>(nativeObject);
}

/**
 * Create a new instance from NjsRohc object
 */
Napi::Object NjsRohc::NewInstance(Napi::Env env, Napi::Value arg) {
    Napi::EscapableHandleScope scope(env);
    Napi::Object obj = env.GetInstanceData<Napi::FunctionReference>()->New({arg});

    return scope.Escape(napi_value(obj)).ToObject();
}

/**
 * Set the buffer size for the packet buffer work size
 */
void NjsRohc::setBufferSize(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    if (info.Length() < 1 || !info[0].IsNumber()) {
        Napi::TypeError::New(env, "Expected a number as the first argument").ThrowAsJavaScriptException();
    }

    int size = info[0].As<Napi::Number>().Int32Value();

    if (size < DEFAULT_BUFFER_SIZE) {
        Napi::TypeError::New(env, "The new size is smaller as DEFAULT_BUFFER_SIZE!").ThrowAsJavaScriptException();
    }

    this->buf_size_ = size;
    this->njsRohc_->max_len = this->buf_size_;
}

/**
 * Get the current buffer size, default is DEFAULT_BUFFER_SIZE
 */
Napi::Value NjsRohc::getBufferSize(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    return Napi::Number::New(env, this->buf_size_);
}

/**
 * Set the logger callback for more log information
 */
void NjsRohc::setLogger(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    if (info.Length() != 1) {
        Napi::TypeError::New(env, "Wrong number of arguments").ThrowAsJavaScriptException();
    }

    if (info[0].IsNull()) {
        if (this->logger_.IsEmpty()) {
            this->logger_.Reset();
        }

        return;
    }

    if (!info[0].IsFunction()) {
        Napi::TypeError::New(env, "Expected a function as the first argument").ThrowAsJavaScriptException();
    }

    this->logger_ = Napi::Persistent(info[0].As<Napi::Function>());
}

/**
 * log function for call logger callback
 */
void NjsRohc::log_(const std::string& message) {
    if (!this->logger_.IsEmpty()) {
        Napi::Function cb = this->logger_.Value();
        Napi::Env env = cb.Env();

        cb.Call(env.Global(), { Napi::String::New(env, message) });
    }
}

/**
 * Dump helper for logs
 */
void NjsRohc::dumpBuffer_(uint8_t* buffer, size_t length) {
   std::ostringstream bufdump;
   bufdump << "Buffer Dump: ";

   for (size_t i = 0; i < length; ++i) {
       char hex_byte[6];
       std::sprintf(hex_byte, "%02x ", buffer[i]);
       bufdump << hex_byte;
   }

   this->log_(bufdump.str());
}

void NjsRohc::printRohcTraces_(
    void *const priv_ctxt,
    const rohc_trace_level_t level,
    const rohc_trace_entity_t entity,
    const int profile,
    const char *const format,
    ...
) {
    try {
        const size_t bufferSize = 1024;
        char buffer[bufferSize];

        va_list args;
        va_start(args, format);
        vsnprintf(buffer, bufferSize, format, args);
        va_end(args);

        std::string message(buffer);

        NjsRohc* instance = static_cast<NjsRohc*>(priv_ctxt);
        instance->log_(message);
    } catch (...) {
       #ifndef NDEBUG
         va_list args;
         va_start (args, format);
         vfprintf (stderr, format, args);
         va_end (args);
       #endif
    }
}

/**
 * Compress IP Packet
 */
Napi::Value NjsRohc::compress(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    if (info.Length() != 1) {
        Napi::TypeError::New(env, "Wrong number of arguments").ThrowAsJavaScriptException();
    }

    if (!info[0].IsTypedArray() || info[0].As<Napi::TypedArray>().TypedArrayType() != napi_uint8_array) {
        Napi::TypeError::New(env, "Argument must be a Uint8Array").ThrowAsJavaScriptException();
    }

    Napi::Uint8Array ipBufferUnit = info[0].As<Napi::Uint8Array>();
    size_t length = ipBufferUnit.ByteLength();

    if (length > static_cast<size_t>(this->buf_size_)) {
        Napi::TypeError::New(env, "Uint8Array is too large").ThrowAsJavaScriptException();
    }

    // -----------------------------------------------------------------------------------------------------------------

    uint8_t ip_buffer[this->buf_size_];
    uint8_t rohc_buffer[this->buf_size_];

    std::memcpy(ip_buffer, ipBufferUnit.Data(), length);

    const struct rohc_buf buf_in = rohc_buf_init_full(ip_buffer, length, this->time_);
    struct rohc_buf buf_out = rohc_buf_init_empty(rohc_buffer, static_cast<size_t>(this->njsRohc_->max_len));

    // log/dump ip buffer
    if (!this->logger_.IsEmpty()) {
        this->dumpBuffer_(ip_buffer, length);
    }

    // compress
    this->njsRohc_->s = rohc_compress4(this->njsRohc_->c, buf_in, &buf_out);

    if (!this->logger_.IsEmpty()) {
        std::ostringstream logstatus;
        logstatus << "compress status: = " << this->njsRohc_->s;

        this->log_(logstatus.str());
    }

    if(this->njsRohc_->s != 0 && this->njsRohc_->s != ROHC_STATUS_OK) {
        Napi::TypeError::New(env, "compression NOT OK").ThrowAsJavaScriptException();
    }

    int return_size = buf_out.len;

    Napi::Uint8Array resultBuffer = Napi::Uint8Array::New(env, return_size);

    for (int i = 0; i < return_size; ++i) {
        resultBuffer[i] = rohc_buffer[i];
    }

    return resultBuffer;
}

/**
 * Decompress ROHC Packet
 */
Napi::Value NjsRohc::decompress(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    if (info.Length() != 1) {
        Napi::TypeError::New(env, "Wrong number of arguments").ThrowAsJavaScriptException();
    }

    if (!info[0].IsTypedArray() || info[0].As<Napi::TypedArray>().TypedArrayType() != napi_uint8_array) {
        Napi::TypeError::New(env, "Argument must be a Uint8Array").ThrowAsJavaScriptException();
    }

    Napi::Uint8Array rohcBufferUnit = info[0].As<Napi::Uint8Array>();
    size_t length = rohcBufferUnit.ByteLength();

    if (length > static_cast<size_t>(this->buf_size_)) {
        Napi::TypeError::New(env, "Uint8Array is too large").ThrowAsJavaScriptException();
    }

    // -----------------------------------------------------------------------------------------------------------------

    uint8_t rohc_buffer[this->buf_size_];
    uint8_t ip_buffer[this->buf_size_];

    std::memcpy(rohc_buffer, rohcBufferUnit.Data(), length);

    const struct rohc_buf buf_in = rohc_buf_init_full(rohc_buffer, length, _time);
    struct rohc_buf buf_out = rohc_buf_init_empty(ip_buffer, static_cast<size_t>(this->njsRohc_->max_len));

    // log/dump rohc buffer
    if (!this->logger_.IsEmpty()) {
        this->dumpBuffer_(rohc_buffer, length);
    }

    // decompress
    this->njsRohc_->s = rohc_decompress3(this->njsRohc_->d, buf_in, &buf_out, NULL, NULL);

    if (!this->logger_.IsEmpty()) {
        std::ostringstream logstatus;
        logstatus << "decompress status: = " << this->njsRohc_->s;

        this->log_(logstatus.str());
    }

    if(this->njsRohc_->s != 0 && this->njsRohc_->s != ROHC_STATUS_OK) {
        Napi::TypeError::New(env, "decompression NOT OK").ThrowAsJavaScriptException();
    }

    int return_size = buf_out.len;

    Napi::Uint8Array resultBuffer = Napi::Uint8Array::New(env, return_size);

    for (int i = 0; i < return_size; ++i) {
        resultBuffer[i] = ip_buffer[i];
    }

    return resultBuffer;
}