import rohcAddon, {RohcBindingLogging, RohcBindingObject} from './src/ts/RohcAddon';

/**
 * A Binding library for the RObust Header Compression (ROHC) protocol.
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
     */
    public constructor() {
        // @ts-ignore
        this._rohc = new rohcAddon.NjsRohc();
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
}

export {Rohc};