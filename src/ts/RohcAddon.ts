/**
 * Rohc addon binding type
 */
export interface rohcAddonTypes {

    /**
     * Return the rohc version
     */
    rohcVersion: () => string;
}


const rohcAddon: rohcAddonTypes = require("../../../build/Release/rohcAddon");
export default rohcAddon;