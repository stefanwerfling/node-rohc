/**
 * Rohc addon binding type
 */
export interface rohcAddonTypes {

    /**
     * Return the rohc version
     */
    rohcVersion: () => string;

    rohcCompress: (ipPacket: ArrayBuffer) => ArrayBuffer;
}


const rohcAddon: rohcAddonTypes = require("../../../build/Release/rohcAddon");
export default rohcAddon;