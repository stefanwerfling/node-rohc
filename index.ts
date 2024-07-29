import rohcAddon, {
    RohcBindingCompGeneralInfo,
    RohcBindingCompLastPacketInfo2,
    RohcBindingLogging,
    RohcBindingObject,
    RohcProfiles,
    RohcStatus,
    RohcMode,
    RohcBindingDecmopLastPacketInfo,
    RohcPacket,
    RohcDecompState, RohcBindingDecmopGeneralInfo
} from './src/ts/RohcAddon';

/**
 * A Binding library for the Robust Header Compression (ROHC) protocol.
 * @see https://github.com/stefanwerfling/rohc
 */
class Rohc {

    /**
     * Return a string with version of ROHC Library
     * @returns {string}
     */
    public static getVersion(): string {
        return rohcAddon.rohcVersion();
    }

    /**
     * Rohc addon wrap object
     * @protected
     */
    protected _rohc: RohcBindingObject;

    /**
     * Constructor
     * @param {RohcProfiles[]} profiles
     */
    public constructor(profiles: RohcProfiles[]) {
        // @ts-ignore
        this._rohc = new rohcAddon.NjsRohc(profiles);
    }

    /**
     * Compress an Ip-Packet to Rohc-Packet
     * @param {Uint8Array} ipPacket
     * @returns {Uint8Array}
     */
    public compress(ipPacket: Uint8Array): Uint8Array {
        return this._rohc.compress(ipPacket);
    }

    /**
     * Decompress a Rohc-Packet to Ip-Packet
     * @param {Uint8Array} rohc
     * @returns {Uint8Array}
     */
    public decompress(rohc: Uint8Array): Uint8Array {
        return this._rohc.decompress(rohc);
    }

    /**
     * Set for more logging information
     * @param {RohcBindingLogging} func
     */
    public setLogger(func: RohcBindingLogging): void {
        this._rohc.setLogger(func);
    }

    /**
     * Set the buffer size for compress/decompress
     * @param {number} size
     */
    public setBufferSize(size: number): void {
        this._rohc.setBufferSize(size);
    }

    /**
     * Get the last status by compress/decompress
     * @returns {RohcStatus}
     */
    public getLastStatus(): RohcStatus {
        return this._rohc.getLastStatus();
    }

    /**
     * Some information about the last compressed packet.
     * @returns {RohcBindingCompLastPacketInfo2}
     */
    public compressLastPacketInfo(): RohcBindingCompLastPacketInfo2 {
        return this._rohc.compressLastPacketInfo();
    }

    /**
     * Some general information about the compressor.
     * @returns {RohcBindingCompGeneralInfo}
     */
    public compressGeneralInfo(): RohcBindingCompGeneralInfo {
        return this._rohc.compressGeneralInfo();
    }

    /**
     * Some information about the last decompressed packet
     * @returns {RohcBindingDecmopLastPacketInfo}
     */
    public decompressLastPacketInfo(): RohcBindingDecmopLastPacketInfo {
        return this._rohc.decompressLastPacketInfo();
    }

    /**
     * Some general information about the decompressor.
     * @returns {RohcBindingDecmopGeneralInfo}
     */
    public decompressGeneralInfo(): RohcBindingDecmopGeneralInfo {
        return this._rohc.decompressGeneralInfo();
    }
}

/**
 * Exports
 */
export {Rohc, RohcProfiles, RohcStatus, RohcMode, RohcDecompState, RohcPacket};