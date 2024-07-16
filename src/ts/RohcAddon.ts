
export interface rohcCompressResult {
    buffer: Uint8Array;
    test: boolean;
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
     * Compress an ip packet to a rohc packet
     * @param {Uint8Array} ipPacket
     * @returns {rohcCompressResult}
     */
    rohcCompress: (ipPacket: Uint8Array) => rohcCompressResult;

    /**
     * Decompress a rohc packet to an ip packet
     * @param {Uint8Array} rohcPacket
     * @returns {rohcCompressResult}
     */
    rohcDecompress: (rohcPacket: Uint8Array) => rohcCompressResult;
}

// ---------------------------------------------------------------------------------------------------------------------

const rohcAddon: rohcAddonTypes = require('../../../build/Release/rohcAddon');
export default rohcAddon;