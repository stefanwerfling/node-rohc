/**
 * Binding Logging
 */
export type RohcBindingLogging = (msg: string) => void;

/**
 * Rohc binding object
 */
export interface RohcBindingObject {

    /**
     * Set the current buffer size
     * @param {number} size
     */
    setBufferSize(size: number): void;

    /**
     * Return the current buffer size
     */
    getBufferSize(): number;

    /**
     * Set for more logging information
     * @param {RohcBindingLogging} func
     */
    setLogger(func: RohcBindingLogging): void;

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
}


/**
 * Rohc addon binding type
 */
export interface rohcAddonTypes {

    /**
     * Return the rohc version
     * @returns {string}
     */
    rohcVersion: () => string;

    /**
     * NjsRohc
     * @constructor
     */
    NjsRohc: () => RohcBindingObject;

}

// ---------------------------------------------------------------------------------------------------------------------

const rohcAddon: rohcAddonTypes = require('../../../build/Release/rohcAddon');

export default rohcAddon;