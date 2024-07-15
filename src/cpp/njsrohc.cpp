#include "njsrohc.h"
#include "dbg.h"
#include <stdarg.h>
#include <stdlib.h>
#include <iostream>
#include <sstream>
#include <time.h>

const struct rohc_ts _time = { .sec = 0, .nsec = 0 };

// Globals
// ---------------------------------------------------------------------------------------------------------------------
static void _print_rohc_traces (void *const priv_ctxt,
    const rohc_trace_level_t level,
    const rohc_trace_entity_t entity,
    const int profile, const char *const format, ...);

static void _dumpBuffer(Env env, uint8_t* buffer, size_t length);

// rohc rand
// ---------------------------------------------------------------------------------------------------------------------
static int _rohc_rand(const struct rohc_comp *const c, void *const user_ctx) {
  return rand();
}

// init ROHC
// ---------------------------------------------------------------------------------------------------------------------
njsrohc_h* njsrohc_init(Env env, int buf_size) {
    njsrohc_h *h = (njsrohc_h*)malloc(sizeof(njsrohc_h));

    if(h == NULL) {
      throw Napi::TypeError::New(env, "ROHC malloc njsrohc_h Out of memory");
    }

    h->max_len = buf_size;
    h->c = rohc_comp_new2(ROHC_SMALL_CID, ROHC_SMALL_CID_MAX, _rohc_rand, NULL);

    if(h->c == NULL) {
        throw Napi::TypeError::New(env, "Failed create the ROHC Compressor!");
    }

    h->s = rohc_comp_set_traces_cb2(h->c, _print_rohc_traces, NULL);
    h->s = rohc_comp_enable_profiles(h->c,
    				    ROHC_PROFILE_UNCOMPRESSED,
    				    ROHC_PROFILE_IP,
    				    ROHC_PROFILE_TCP,
    				    ROHC_PROFILE_UDP,
    				    ROHC_PROFILE_ESP,
    				    ROHC_PROFILE_RTP, -1);

    if(!(h->s)) {
        throw Napi::TypeError::New(env, "ROHC failed to enable the compressor profiles!");
    }

    h->d = rohc_decomp_new2(ROHC_SMALL_CID, ROHC_SMALL_CID_MAX, ROHC_O_MODE);

    if(h->d == NULL) {
        throw Napi::TypeError::New(env, "Failed create the ROHC Decompressor!");
    }

    h->s = rohc_decomp_set_traces_cb2(h->d, _print_rohc_traces, NULL);
    h->s = rohc_decomp_enable_profiles (h->d,
    				      ROHC_PROFILE_UNCOMPRESSED,
    				      ROHC_PROFILE_IP,
    				      ROHC_PROFILE_TCP,
    				      ROHC_PROFILE_UDP,
    				      ROHC_PROFILE_ESP,
    				      ROHC_PROFILE_RTP, -1);
    if(!(h->s)) {
        throw Napi::TypeError::New(env, "ROHC failed to enable the decompressor profiles!");
    }

    return h;
}

// compressor
// ---------------------------------------------------------------------------------------------------------------------
int njsrohc_comp(Env env, njsrohc_h *h, uint8_t *in, uint8_t *out, size_t len_in) {
    const struct rohc_buf buf_in = rohc_buf_init_full(in, len_in, _time);
    struct rohc_buf buf_out = rohc_buf_init_empty(out, static_cast<size_t>(h->max_len));

    _dumpBuffer(env, in, len_in);

    h->s = rohc_compress4(h->c, buf_in, &buf_out);

    if(h->s != 0 && h->s != ROHC_STATUS_OK) {
        throw Napi::TypeError::New(env, "compression NOT OK");
    }

    _dumpBuffer(env, out, buf_out.len);

    return buf_out.len;
}

// dump buffer
static void _dumpBuffer(Env env, uint8_t* buffer, size_t length) {
    std::ostringstream bufdump;
    bufdump << "Buffer Dump: ";

    for (size_t i = 0; i < length; ++i) {
        char hex_byte[6];
        std::sprintf(hex_byte, "%02x ", buffer[i]);
        bufdump << hex_byte;
    }

    Napi::Function log = env.Global().Get("console").As<Napi::Object>().Get("log").As<Napi::Function>();
    log.Call({ Napi::String::New(env, bufdump.str()) });
}

// _print_rohc_traces
// ---------------------------------------------------------------------------------------------------------------------
static void _print_rohc_traces (void *const priv_ctxt,
		    const rohc_trace_level_t level,
		    const rohc_trace_entity_t entity,
		    const int profile, const char *const format, ...)
{
#ifndef NDEBUG
  va_list args;
  va_start (args, format);
  vfprintf (stderr, format, args);
  va_end (args);
#endif
}