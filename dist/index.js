"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RohcPacket = exports.RohcDecompState = exports.RohcMode = exports.RohcStatus = exports.RohcProfiles = exports.Rohc = void 0;
const RohcAddon_1 = require("./src/ts/RohcAddon");
Object.defineProperty(exports, "RohcProfiles", { enumerable: true, get: function () { return RohcAddon_1.RohcProfiles; } });
Object.defineProperty(exports, "RohcStatus", { enumerable: true, get: function () { return RohcAddon_1.RohcStatus; } });
Object.defineProperty(exports, "RohcMode", { enumerable: true, get: function () { return RohcAddon_1.RohcMode; } });
Object.defineProperty(exports, "RohcPacket", { enumerable: true, get: function () { return RohcAddon_1.RohcPacket; } });
Object.defineProperty(exports, "RohcDecompState", { enumerable: true, get: function () { return RohcAddon_1.RohcDecompState; } });
/**
 * A Binding library for the Robust Header Compression (ROHC) protocol.
 * @see https://github.com/stefanwerfling/rohc
 */
class Rohc {
    /**
     * Return a string with version of ROHC Library
     * @returns {string}
     */
    static getVersion() {
        return RohcAddon_1.default.rohcVersion();
    }
    /**
     * Constructor
     * @param {RohcProfiles[]} profiles
     */
    constructor(profiles) {
        // @ts-ignore
        this._rohc = new RohcAddon_1.default.NjsRohc(profiles);
    }
    /**
     * Compress an Ip-Packet to Rohc-Packet
     * @param {Uint8Array} ipPacket
     * @returns {Uint8Array}
     */
    compress(ipPacket) {
        return this._rohc.compress(ipPacket);
    }
    /**
     * Decompress a Rohc-Packet to Ip-Packet
     * @param {Uint8Array} rohc
     * @returns {Uint8Array}
     */
    decompress(rohc) {
        return this._rohc.decompress(rohc);
    }
    /**
     * Set for more logging information
     * @param {RohcBindingLogging} func
     */
    setLogger(func) {
        this._rohc.setLogger(func);
    }
    /**
     * Set the buffer size for compress/decompress
     * @param {number} size
     */
    setBufferSize(size) {
        this._rohc.setBufferSize(size);
    }
    /**
     * Get the last status by compress/decompress
     * @returns {RohcStatus}
     */
    getLastStatus() {
        return this._rohc.getLastStatus();
    }
    /**
     * Some information about the last compressed packet.
     * @returns {RohcBindingCompLastPacketInfo2}
     */
    compressLastPacketInfo() {
        return this._rohc.compressLastPacketInfo();
    }
    /**
     * Some general information about the compressor.
     * @returns {RohcBindingCompGeneralInfo}
     */
    compressGeneralInfo() {
        return this._rohc.compressGeneralInfo();
    }
    /**
     * Some information about the last decompressed packet
     * @returns {RohcBindingDecmopLastPacketInfo}
     */
    decompressLastPacketInfo() {
        return this._rohc.decompressLastPacketInfo();
    }
    /**
     * Some general information about the decompressor.
     * @returns {RohcBindingDecmopGeneralInfo}
     */
    decompressGeneralInfo() {
        return this._rohc.decompressGeneralInfo();
    }
}
exports.Rohc = Rohc;
//# sourceMappingURL=index.js.map