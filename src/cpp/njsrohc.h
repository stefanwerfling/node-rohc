#ifndef _NJSROHC
#define _NJSROHC

#include <rohc/rohc.h>
#include <rohc/rohc_comp.h>
#include <rohc/rohc_decomp.h>
#include <napi.h>

using namespace Napi;

typedef struct njsrohc_s {
  int s;
  struct rohc_comp *c; /* compressor */
  struct rohc_decomp *d; /* decompressor */
  int max_len;
} njsrohc_h;

// Init rohc
njsrohc_h *njsrohc_init(Env env, int buf_size);

// Comp
int njsrohc_comp(Env env, njsrohc_h *h, uint8_t *in, uint8_t *out, size_t len_in);

// decomp
int njsrohc_decomp(Env env, njsrohc_h *h, uint8_t *in, uint8_t *out, size_t len_in);

// Free
int njsrohc_free();

#endif