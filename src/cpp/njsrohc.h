#ifndef _NJSROHC
#define _NJSROHC

#include <rohc/rohc.h>
#include <rohc/rohc_comp.h>
#include <rohc/rohc_decomp.h>
#include <napi.h>
#include <optional>

using namespace Napi;

#define DEFAULT_BUFFER_SIZE 2048

typedef struct njsrohc_s {
  int s;
  struct rohc_comp *c; /* compressor */
  struct rohc_decomp *d; /* decompressor */
  int max_len;
} njsrohc_h;

/**
 * NjsRohc Object
 */
class NjsRohc : public ObjectWrap<NjsRohc> {
    public:
        static Napi::Object Init(Napi::Env env, Napi::Object exports);
        static void Destructor(Napi::Env env, void* nativeObject, void* finalize_hint);
        static Napi::Object NewInstance(Napi::Env env, Napi::Value arg);

        NjsRohc(const Napi::CallbackInfo& info);
        ~NjsRohc();

    private:
        void setBufferSize(const Napi::CallbackInfo& info);
        Napi::Value getBufferSize(const Napi::CallbackInfo& info);
        void setLogger(const Napi::CallbackInfo& info);
        void log_(const std::string& message);
        void dumpBuffer_(uint8_t* buffer, size_t length);
        Napi::Value compress(const Napi::CallbackInfo& info);
        Napi::Value decompress(const Napi::CallbackInfo& info);

        int buf_size_;
        struct rohc_ts time_ = { .sec = 0, .nsec = 0 };
        njsrohc_h* njsRohc_ = nullptr;
        Napi::FunctionReference logger_;
};

#endif