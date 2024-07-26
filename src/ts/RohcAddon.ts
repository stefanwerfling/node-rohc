/**
 * Binding Logging
 */
export type RohcBindingLogging = (msg: string) => void;

/**
 * Profiles
 * @see https://rohc-lib.org/support/documentation/API/rohc-doc-2.3.1/group__rohc.html
 */
export enum RohcProfiles {
    ROHC_PROFILE_UNCOMPRESSED = 0x0000,
    ROHC_PROFILE_RTP = 0x0001,
    ROHC_PROFILE_UDP = 0x0002,
    ROHC_PROFILE_ESP = 0x0003,
    ROHC_PROFILE_IP = 0x0004,
    ROHC_PROFILE_RTP_LLA = 0x0005,
    ROHC_PROFILE_TCP = 0x0006,
    ROHC_PROFILE_UDPLITE_RTP = 0x0007,
    ROHC_PROFILE_UDPLITE = 0x0008,
    ROHC_PROFILE_MAX = 0x0009
};

/**
 * Status
 * @see https://rohc-lib.org/support/documentation/API/rohc-doc-2.3.1/group__rohc.html
 */
export enum RohcStatus {
    ROHC_OK = 1,
    ROHC_ERROR_NO_CONTEXT = -1,
    ROHC_ERROR_PACKET_FAILED = -2,
    ROHC_FEEDBACK_ONLY = -3,
    ROHC_ERROR_CRC = -4,
    ROHC_ERROR = -5,
    ROHC_NEED_REPARSE = -6
};

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
     * @param {RohcProfiles[]} profiles
     */
    NjsRohc: (profiles: RohcProfiles[]) => RohcBindingObject;

}

// ---------------------------------------------------------------------------------------------------------------------

const rohcAddon: rohcAddonTypes = require('../../../build/Release/rohcAddon');

export default rohcAddon;