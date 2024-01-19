
export interface rohcCompressResult {
    buffer: ArrayBuffer;
    test: boolean;
}

/**
 * Rohc addon binding type
 */
export interface rohcAddonTypes {

    /**
     * Return the rohc version
     */
    rohcVersion: () => string;

    rohcCompress: (ipPacket: ArrayBuffer) => rohcCompressResult;
}


const rohcAddon: rohcAddonTypes = require("../../../build/Release/rohcAddon");
export default rohcAddon;