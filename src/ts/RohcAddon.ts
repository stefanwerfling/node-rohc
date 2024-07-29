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
}

/**
 * Status
 * @see https://rohc-lib.org/support/documentation/API/rohc-doc-2.3.1/group__rohc.html
 */
export enum RohcStatus {
    ROHC_OK = 0,
    ROHC_STATUS_SEGMENT = 1,
    ROHC_STATUS_MALFORMED = 2,
    ROHC_STATUS_NO_CONTEXT = 3,
    ROHC_STATUS_BAD_CRC = 4,
    ROHC_STATUS_OUTPUT_TOO_SMALL = 5,
    ROHC_STATUS_ERROR = 6
}

/**
 * Mode
 * @see https://rohc-lib.org/support/documentation/API/rohc-doc-2.3.1/group__rohc.html
 */
export enum RohcMode {
    ROHC_UNKNOWN_MODE = 0,
    ROHC_U_MODE = 1,
    ROHC_O_MODE = 2,
    ROHC_R_MODE = 3
}

/**
 * The ROHC decompressor states
 * @see https://rohc-lib.org/support/documentation/API/rohc-doc-2.3.1/group__rohc__decomp.html#gafdfe2d9906df3b182d7d82652fa4d00d
 */
export enum RohcDecompState {
    ROHC_DECOMP_STATE_UNKNOWN = 0,
    ROHC_DECOMP_STATE_NC = 1,
    ROHC_DECOMP_STATE_SC = 2,
    ROHC_DECOMP_STATE_FC = 3
}

/**
 * The different types of ROHC packets.
 * @see https://rohc-lib.org/support/documentation/API/rohc-doc-2.3.1/rohc__packets_8h.html#a358d14dec5973e8632b318991aefdc95
 */
export enum RohcPacket {
    ROHC_PACKET_IR = 0,
    ROHC_PACKET_IR_DYN = 1,
    ROHC_PACKET_UO_0 = 2,
    ROHC_PACKET_UO_1 = 3,
    ROHC_PACKET_UO_1_ID = 4,
    ROHC_PACKET_UO_1_TS = 5,
    ROHC_PACKET_UO_1_RTP = 6,
    ROHC_PACKET_UOR_2 = 7,
    ROHC_PACKET_UOR_2_RTP = 8,
    ROHC_PACKET_UOR_2_ID = 9,
    ROHC_PACKET_UOR_2_TS = 10,
    ROHC_PACKET_NORMAL = 13,
    ROHC_PACKET_UNKNOWN = 14,
    ROHC_PACKET_TCP_CO_COMMON = 15,
    ROHC_PACKET_TCP_RND_1 = 16,
    ROHC_PACKET_TCP_RND_2 = 17,
    ROHC_PACKET_TCP_RND_3 = 18,
    ROHC_PACKET_TCP_RND_4 = 19,
    ROHC_PACKET_TCP_RND_5 = 20,
    ROHC_PACKET_TCP_RND_6 = 21,
    ROHC_PACKET_TCP_RND_7 = 22,
    ROHC_PACKET_TCP_RND_8 = 23,
    ROHC_PACKET_TCP_SEQ_1 = 24,
    ROHC_PACKET_TCP_SEQ_2 = 25,
    ROHC_PACKET_TCP_SEQ_3 = 26,
    ROHC_PACKET_TCP_SEQ_4 = 27,
    ROHC_PACKET_TCP_SEQ_5 = 28,
    ROHC_PACKET_TCP_SEQ_6 = 29,
    ROHC_PACKET_TCP_SEQ_7 = 30,
    ROHC_PACKET_TCP_SEQ_8 = 31,
    ROHC_PACKET_IR_CR = 32,
    ROHC_PACKET_CO_REPAIR = 33,
    ROHC_PACKET_PT_0_CRC3 = 34,
    ROHC_PACKET_NORTP_PT_0_CRC7 = 35,
    ROHC_PACKET_NORTP_PT_1_SEQ_ID = 36,
    ROHC_PACKET_NORTP_PT_2_SEQ_ID = 37,
    ROHC_PACKET_RTP_PT_0_CRC7 = 38,
    ROHC_PACKET_RTP_PT_1_RND = 39,
    ROHC_PACKET_RTP_PT_1_SEQ_ID = 40,
    ROHC_PACKET_RTP_PT_1_SEQ_TS = 41,
    ROHC_PACKET_RTP_PT_2_RND = 42,
    ROHC_PACKET_RTP_PT_2_SEQ_ID = 43,
    ROHC_PACKET_RTP_PT_2_SEQ_TS = 44,
    ROHC_PACKET_RTP_PT_2_SEQ_BOTH = 45,
    ROHC_PACKET_UO_1_ID_EXT0 = 46,
    ROHC_PACKET_UO_1_ID_EXT1 = 47,
    ROHC_PACKET_UO_1_ID_EXT2 = 48,
    ROHC_PACKET_UO_1_ID_EXT3 = 49,
    ROHC_PACKET_UOR_2_EXT0 = 50,
    ROHC_PACKET_UOR_2_EXT1 = 51,
    ROHC_PACKET_UOR_2_EXT2 = 52,
    ROHC_PACKET_UOR_2_EXT3 = 53,
    ROHC_PACKET_UOR_2_RTP_EXT0 = 54,
    ROHC_PACKET_UOR_2_RTP_EXT1 = 55,
    ROHC_PACKET_UOR_2_RTP_EXT2 = 56,
    ROHC_PACKET_UOR_2_RTP_EXT3 = 57,
    ROHC_PACKET_UOR_2_ID_EXT0 = 58,
    ROHC_PACKET_UOR_2_ID_EXT1 = 59,
    ROHC_PACKET_UOR_2_ID_EXT2 = 60,
    ROHC_PACKET_UOR_2_ID_EXT3 = 61,
    ROHC_PACKET_UOR_2_TS_EXT0 = 62,
    ROHC_PACKET_UOR_2_TS_EXT1 = 63,
    ROHC_PACKET_UOR_2_TS_EXT2 = 64,
    ROHC_PACKET_UOR_2_TS_EXT3 = 65,
    ROHC_PACKET_MAX
}

/**
 * Comp last packet info
 * @see https://rohc-lib.org/support/documentation/API/rohc-doc-2.3.1/structrohc__comp__last__packet__info2__t.html
 */
export interface RohcBindingCompLastPacketInfo2 {
    version_major: number;
    version_minor: number;
    context_id: number;
    is_context_init: boolean;
    context_mode: RohcMode;
    context_state: number;
    context_used: boolean;
    profile_id: number;
    packet_type: RohcPacket;
    total_last_uncomp_size: number;
    header_last_uncomp_size: number;
    total_last_comp_size: number;
    header_last_comp_size: number;
}

/**
 * Some general information about the compressor.
 * @see https://rohc-lib.org/support/documentation/API/rohc-doc-2.3.1/structrohc__comp__general__info__t.html
 */
export interface RohcBindingCompGeneralInfo {
    version_major: number;
    version_minor: number;
    contexts_nr: number;
    packets_nr: number;
    uncomp_bytes_nr: number;
    comp_bytes_nr: number;
}

/**
 * Some information about the last decompressed packet.
 * @see https://rohc-lib.org/support/documentation/API/rohc-doc-2.3.1/structrohc__decomp__last__packet__info__t.html
 */
export interface RohcBindingDecmopLastPacketInfo {
    version_major: number;
    version_minor: number;
    context_mode: RohcMode,
    context_state: RohcDecompState,
    profile_id: number;
    nr_lost_packets: number;
    nr_misordered_packets: number;
    is_duplicated: boolean;
    corrected_crc_failures: number;
    corrected_sn_wraparounds: number;
    corrected_wrong_sn_updates: number;
    packet_type: RohcPacket;
    total_last_comp_size: number;
    header_last_comp_size: number;
    total_last_uncomp_size: number;
    header_last_uncomp_size: number;
}

/**
 * Some general information about the decompressor.
 * @see https://rohc-lib.org/support/documentation/API/rohc-doc-2.3.1/structrohc__decomp__general__info__t.html
 */
export interface RohcBindingDecmopGeneralInfo {
    version_major: number;
    version_minor: number;
    contexts_nr: number;
    packets_nr: number;
    comp_bytes_nr: number;
    uncomp_bytes_nr: number;
    corrected_crc_failures: number;
    corrected_sn_wraparounds: number;
    corrected_wrong_sn_updates: number;
}

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
     * Return the last status
     */
    getLastStatus(): RohcStatus;

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
     * Decompress a Rohc-Packet to Ip-Packet
     * @param {Uint8Array} rohc
     * @returns {Uint8Array}
     */
    decompress(rohc: Uint8Array): Uint8Array;

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