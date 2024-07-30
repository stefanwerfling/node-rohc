import { RohcBindingCompGeneralInfo, RohcBindingCompLastPacketInfo2, RohcBindingLogging, RohcBindingObject, RohcProfiles, RohcStatus, RohcMode, RohcBindingDecmopLastPacketInfo, RohcPacket, RohcDecompState, RohcBindingDecmopGeneralInfo } from './src/ts/RohcAddon';
/**
 * A Binding library for the Robust Header Compression (ROHC) protocol.
 * @see https://github.com/stefanwerfling/rohc
 */
declare class Rohc {
    /**
     * Return a string with version of ROHC Library
     * @returns {string}
     */
    static getVersion(): string;
    /**
     * Rohc addon wrap object
     * @protected
     */
    protected _rohc: RohcBindingObject;
    /**
     * Constructor
     * @param {RohcProfiles[]} profiles
     */
    constructor(profiles: RohcProfiles[]);
    /**
     * Compress an Ip-Packet to Rohc-Packet
     * @param {Uint8Array} ipPacket
     * @returns {Uint8Array}
     */
    compress(ipPacket: Uint8Array): Uint8Array;
    /**
     * Decompress a Rohc-Packet to Ip-Packet
     * @param {Uint8Array} rohc
     * @returns {Uint8Array}
     */
    decompress(rohc: Uint8Array): Uint8Array;
    /**
     * Set for more logging information
     * @param {RohcBindingLogging} func
     */
    setLogger(func: RohcBindingLogging): void;
    /**
     * Set the buffer size for compress/decompress
     * @param {number} size
     */
    setBufferSize(size: number): void;
    /**
     * Get the last status by compress/decompress
     * @returns {RohcStatus}
     */
    getLastStatus(): RohcStatus;
    /**
     * Some information about the last compressed packet.
     * @returns {RohcBindingCompLastPacketInfo2}
     */
    compressLastPacketInfo(): RohcBindingCompLastPacketInfo2;
    /**
     * Some general information about the compressor.
     * @returns {RohcBindingCompGeneralInfo}
     */
    compressGeneralInfo(): RohcBindingCompGeneralInfo;
    /**
     * Some information about the last decompressed packet
     * @returns {RohcBindingDecmopLastPacketInfo}
     */
    decompressLastPacketInfo(): RohcBindingDecmopLastPacketInfo;
    /**
     * Some general information about the decompressor.
     * @returns {RohcBindingDecmopGeneralInfo}
     */
    decompressGeneralInfo(): RohcBindingDecmopGeneralInfo;
}
/**
 * Exports
 */
export { Rohc, RohcProfiles, RohcStatus, RohcMode, RohcDecompState, RohcPacket };
