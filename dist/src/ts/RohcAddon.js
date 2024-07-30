"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RohcPacket = exports.RohcDecompState = exports.RohcMode = exports.RohcStatus = exports.RohcProfiles = void 0;
/**
 * Profiles
 * @see https://rohc-lib.org/support/documentation/API/rohc-doc-2.3.1/group__rohc.html
 */
var RohcProfiles;
(function (RohcProfiles) {
    RohcProfiles[RohcProfiles["ROHC_PROFILE_UNCOMPRESSED"] = 0] = "ROHC_PROFILE_UNCOMPRESSED";
    RohcProfiles[RohcProfiles["ROHC_PROFILE_RTP"] = 1] = "ROHC_PROFILE_RTP";
    RohcProfiles[RohcProfiles["ROHC_PROFILE_UDP"] = 2] = "ROHC_PROFILE_UDP";
    RohcProfiles[RohcProfiles["ROHC_PROFILE_ESP"] = 3] = "ROHC_PROFILE_ESP";
    RohcProfiles[RohcProfiles["ROHC_PROFILE_IP"] = 4] = "ROHC_PROFILE_IP";
    RohcProfiles[RohcProfiles["ROHC_PROFILE_RTP_LLA"] = 5] = "ROHC_PROFILE_RTP_LLA";
    RohcProfiles[RohcProfiles["ROHC_PROFILE_TCP"] = 6] = "ROHC_PROFILE_TCP";
    RohcProfiles[RohcProfiles["ROHC_PROFILE_UDPLITE_RTP"] = 7] = "ROHC_PROFILE_UDPLITE_RTP";
    RohcProfiles[RohcProfiles["ROHC_PROFILE_UDPLITE"] = 8] = "ROHC_PROFILE_UDPLITE";
    RohcProfiles[RohcProfiles["ROHC_PROFILE_MAX"] = 9] = "ROHC_PROFILE_MAX";
})(RohcProfiles = exports.RohcProfiles || (exports.RohcProfiles = {}));
/**
 * Status
 * @see https://rohc-lib.org/support/documentation/API/rohc-doc-2.3.1/group__rohc.html
 */
var RohcStatus;
(function (RohcStatus) {
    RohcStatus[RohcStatus["ROHC_OK"] = 0] = "ROHC_OK";
    RohcStatus[RohcStatus["ROHC_STATUS_SEGMENT"] = 1] = "ROHC_STATUS_SEGMENT";
    RohcStatus[RohcStatus["ROHC_STATUS_MALFORMED"] = 2] = "ROHC_STATUS_MALFORMED";
    RohcStatus[RohcStatus["ROHC_STATUS_NO_CONTEXT"] = 3] = "ROHC_STATUS_NO_CONTEXT";
    RohcStatus[RohcStatus["ROHC_STATUS_BAD_CRC"] = 4] = "ROHC_STATUS_BAD_CRC";
    RohcStatus[RohcStatus["ROHC_STATUS_OUTPUT_TOO_SMALL"] = 5] = "ROHC_STATUS_OUTPUT_TOO_SMALL";
    RohcStatus[RohcStatus["ROHC_STATUS_ERROR"] = 6] = "ROHC_STATUS_ERROR";
})(RohcStatus = exports.RohcStatus || (exports.RohcStatus = {}));
/**
 * Mode
 * @see https://rohc-lib.org/support/documentation/API/rohc-doc-2.3.1/group__rohc.html
 */
var RohcMode;
(function (RohcMode) {
    RohcMode[RohcMode["ROHC_UNKNOWN_MODE"] = 0] = "ROHC_UNKNOWN_MODE";
    RohcMode[RohcMode["ROHC_U_MODE"] = 1] = "ROHC_U_MODE";
    RohcMode[RohcMode["ROHC_O_MODE"] = 2] = "ROHC_O_MODE";
    RohcMode[RohcMode["ROHC_R_MODE"] = 3] = "ROHC_R_MODE";
})(RohcMode = exports.RohcMode || (exports.RohcMode = {}));
/**
 * The ROHC decompressor states
 * @see https://rohc-lib.org/support/documentation/API/rohc-doc-2.3.1/group__rohc__decomp.html#gafdfe2d9906df3b182d7d82652fa4d00d
 */
var RohcDecompState;
(function (RohcDecompState) {
    RohcDecompState[RohcDecompState["ROHC_DECOMP_STATE_UNKNOWN"] = 0] = "ROHC_DECOMP_STATE_UNKNOWN";
    RohcDecompState[RohcDecompState["ROHC_DECOMP_STATE_NC"] = 1] = "ROHC_DECOMP_STATE_NC";
    RohcDecompState[RohcDecompState["ROHC_DECOMP_STATE_SC"] = 2] = "ROHC_DECOMP_STATE_SC";
    RohcDecompState[RohcDecompState["ROHC_DECOMP_STATE_FC"] = 3] = "ROHC_DECOMP_STATE_FC";
})(RohcDecompState = exports.RohcDecompState || (exports.RohcDecompState = {}));
/**
 * The different types of ROHC packets.
 * @see https://rohc-lib.org/support/documentation/API/rohc-doc-2.3.1/rohc__packets_8h.html#a358d14dec5973e8632b318991aefdc95
 */
var RohcPacket;
(function (RohcPacket) {
    RohcPacket[RohcPacket["ROHC_PACKET_IR"] = 0] = "ROHC_PACKET_IR";
    RohcPacket[RohcPacket["ROHC_PACKET_IR_DYN"] = 1] = "ROHC_PACKET_IR_DYN";
    RohcPacket[RohcPacket["ROHC_PACKET_UO_0"] = 2] = "ROHC_PACKET_UO_0";
    RohcPacket[RohcPacket["ROHC_PACKET_UO_1"] = 3] = "ROHC_PACKET_UO_1";
    RohcPacket[RohcPacket["ROHC_PACKET_UO_1_ID"] = 4] = "ROHC_PACKET_UO_1_ID";
    RohcPacket[RohcPacket["ROHC_PACKET_UO_1_TS"] = 5] = "ROHC_PACKET_UO_1_TS";
    RohcPacket[RohcPacket["ROHC_PACKET_UO_1_RTP"] = 6] = "ROHC_PACKET_UO_1_RTP";
    RohcPacket[RohcPacket["ROHC_PACKET_UOR_2"] = 7] = "ROHC_PACKET_UOR_2";
    RohcPacket[RohcPacket["ROHC_PACKET_UOR_2_RTP"] = 8] = "ROHC_PACKET_UOR_2_RTP";
    RohcPacket[RohcPacket["ROHC_PACKET_UOR_2_ID"] = 9] = "ROHC_PACKET_UOR_2_ID";
    RohcPacket[RohcPacket["ROHC_PACKET_UOR_2_TS"] = 10] = "ROHC_PACKET_UOR_2_TS";
    RohcPacket[RohcPacket["ROHC_PACKET_NORMAL"] = 13] = "ROHC_PACKET_NORMAL";
    RohcPacket[RohcPacket["ROHC_PACKET_UNKNOWN"] = 14] = "ROHC_PACKET_UNKNOWN";
    RohcPacket[RohcPacket["ROHC_PACKET_TCP_CO_COMMON"] = 15] = "ROHC_PACKET_TCP_CO_COMMON";
    RohcPacket[RohcPacket["ROHC_PACKET_TCP_RND_1"] = 16] = "ROHC_PACKET_TCP_RND_1";
    RohcPacket[RohcPacket["ROHC_PACKET_TCP_RND_2"] = 17] = "ROHC_PACKET_TCP_RND_2";
    RohcPacket[RohcPacket["ROHC_PACKET_TCP_RND_3"] = 18] = "ROHC_PACKET_TCP_RND_3";
    RohcPacket[RohcPacket["ROHC_PACKET_TCP_RND_4"] = 19] = "ROHC_PACKET_TCP_RND_4";
    RohcPacket[RohcPacket["ROHC_PACKET_TCP_RND_5"] = 20] = "ROHC_PACKET_TCP_RND_5";
    RohcPacket[RohcPacket["ROHC_PACKET_TCP_RND_6"] = 21] = "ROHC_PACKET_TCP_RND_6";
    RohcPacket[RohcPacket["ROHC_PACKET_TCP_RND_7"] = 22] = "ROHC_PACKET_TCP_RND_7";
    RohcPacket[RohcPacket["ROHC_PACKET_TCP_RND_8"] = 23] = "ROHC_PACKET_TCP_RND_8";
    RohcPacket[RohcPacket["ROHC_PACKET_TCP_SEQ_1"] = 24] = "ROHC_PACKET_TCP_SEQ_1";
    RohcPacket[RohcPacket["ROHC_PACKET_TCP_SEQ_2"] = 25] = "ROHC_PACKET_TCP_SEQ_2";
    RohcPacket[RohcPacket["ROHC_PACKET_TCP_SEQ_3"] = 26] = "ROHC_PACKET_TCP_SEQ_3";
    RohcPacket[RohcPacket["ROHC_PACKET_TCP_SEQ_4"] = 27] = "ROHC_PACKET_TCP_SEQ_4";
    RohcPacket[RohcPacket["ROHC_PACKET_TCP_SEQ_5"] = 28] = "ROHC_PACKET_TCP_SEQ_5";
    RohcPacket[RohcPacket["ROHC_PACKET_TCP_SEQ_6"] = 29] = "ROHC_PACKET_TCP_SEQ_6";
    RohcPacket[RohcPacket["ROHC_PACKET_TCP_SEQ_7"] = 30] = "ROHC_PACKET_TCP_SEQ_7";
    RohcPacket[RohcPacket["ROHC_PACKET_TCP_SEQ_8"] = 31] = "ROHC_PACKET_TCP_SEQ_8";
    RohcPacket[RohcPacket["ROHC_PACKET_IR_CR"] = 32] = "ROHC_PACKET_IR_CR";
    RohcPacket[RohcPacket["ROHC_PACKET_CO_REPAIR"] = 33] = "ROHC_PACKET_CO_REPAIR";
    RohcPacket[RohcPacket["ROHC_PACKET_PT_0_CRC3"] = 34] = "ROHC_PACKET_PT_0_CRC3";
    RohcPacket[RohcPacket["ROHC_PACKET_NORTP_PT_0_CRC7"] = 35] = "ROHC_PACKET_NORTP_PT_0_CRC7";
    RohcPacket[RohcPacket["ROHC_PACKET_NORTP_PT_1_SEQ_ID"] = 36] = "ROHC_PACKET_NORTP_PT_1_SEQ_ID";
    RohcPacket[RohcPacket["ROHC_PACKET_NORTP_PT_2_SEQ_ID"] = 37] = "ROHC_PACKET_NORTP_PT_2_SEQ_ID";
    RohcPacket[RohcPacket["ROHC_PACKET_RTP_PT_0_CRC7"] = 38] = "ROHC_PACKET_RTP_PT_0_CRC7";
    RohcPacket[RohcPacket["ROHC_PACKET_RTP_PT_1_RND"] = 39] = "ROHC_PACKET_RTP_PT_1_RND";
    RohcPacket[RohcPacket["ROHC_PACKET_RTP_PT_1_SEQ_ID"] = 40] = "ROHC_PACKET_RTP_PT_1_SEQ_ID";
    RohcPacket[RohcPacket["ROHC_PACKET_RTP_PT_1_SEQ_TS"] = 41] = "ROHC_PACKET_RTP_PT_1_SEQ_TS";
    RohcPacket[RohcPacket["ROHC_PACKET_RTP_PT_2_RND"] = 42] = "ROHC_PACKET_RTP_PT_2_RND";
    RohcPacket[RohcPacket["ROHC_PACKET_RTP_PT_2_SEQ_ID"] = 43] = "ROHC_PACKET_RTP_PT_2_SEQ_ID";
    RohcPacket[RohcPacket["ROHC_PACKET_RTP_PT_2_SEQ_TS"] = 44] = "ROHC_PACKET_RTP_PT_2_SEQ_TS";
    RohcPacket[RohcPacket["ROHC_PACKET_RTP_PT_2_SEQ_BOTH"] = 45] = "ROHC_PACKET_RTP_PT_2_SEQ_BOTH";
    RohcPacket[RohcPacket["ROHC_PACKET_UO_1_ID_EXT0"] = 46] = "ROHC_PACKET_UO_1_ID_EXT0";
    RohcPacket[RohcPacket["ROHC_PACKET_UO_1_ID_EXT1"] = 47] = "ROHC_PACKET_UO_1_ID_EXT1";
    RohcPacket[RohcPacket["ROHC_PACKET_UO_1_ID_EXT2"] = 48] = "ROHC_PACKET_UO_1_ID_EXT2";
    RohcPacket[RohcPacket["ROHC_PACKET_UO_1_ID_EXT3"] = 49] = "ROHC_PACKET_UO_1_ID_EXT3";
    RohcPacket[RohcPacket["ROHC_PACKET_UOR_2_EXT0"] = 50] = "ROHC_PACKET_UOR_2_EXT0";
    RohcPacket[RohcPacket["ROHC_PACKET_UOR_2_EXT1"] = 51] = "ROHC_PACKET_UOR_2_EXT1";
    RohcPacket[RohcPacket["ROHC_PACKET_UOR_2_EXT2"] = 52] = "ROHC_PACKET_UOR_2_EXT2";
    RohcPacket[RohcPacket["ROHC_PACKET_UOR_2_EXT3"] = 53] = "ROHC_PACKET_UOR_2_EXT3";
    RohcPacket[RohcPacket["ROHC_PACKET_UOR_2_RTP_EXT0"] = 54] = "ROHC_PACKET_UOR_2_RTP_EXT0";
    RohcPacket[RohcPacket["ROHC_PACKET_UOR_2_RTP_EXT1"] = 55] = "ROHC_PACKET_UOR_2_RTP_EXT1";
    RohcPacket[RohcPacket["ROHC_PACKET_UOR_2_RTP_EXT2"] = 56] = "ROHC_PACKET_UOR_2_RTP_EXT2";
    RohcPacket[RohcPacket["ROHC_PACKET_UOR_2_RTP_EXT3"] = 57] = "ROHC_PACKET_UOR_2_RTP_EXT3";
    RohcPacket[RohcPacket["ROHC_PACKET_UOR_2_ID_EXT0"] = 58] = "ROHC_PACKET_UOR_2_ID_EXT0";
    RohcPacket[RohcPacket["ROHC_PACKET_UOR_2_ID_EXT1"] = 59] = "ROHC_PACKET_UOR_2_ID_EXT1";
    RohcPacket[RohcPacket["ROHC_PACKET_UOR_2_ID_EXT2"] = 60] = "ROHC_PACKET_UOR_2_ID_EXT2";
    RohcPacket[RohcPacket["ROHC_PACKET_UOR_2_ID_EXT3"] = 61] = "ROHC_PACKET_UOR_2_ID_EXT3";
    RohcPacket[RohcPacket["ROHC_PACKET_UOR_2_TS_EXT0"] = 62] = "ROHC_PACKET_UOR_2_TS_EXT0";
    RohcPacket[RohcPacket["ROHC_PACKET_UOR_2_TS_EXT1"] = 63] = "ROHC_PACKET_UOR_2_TS_EXT1";
    RohcPacket[RohcPacket["ROHC_PACKET_UOR_2_TS_EXT2"] = 64] = "ROHC_PACKET_UOR_2_TS_EXT2";
    RohcPacket[RohcPacket["ROHC_PACKET_UOR_2_TS_EXT3"] = 65] = "ROHC_PACKET_UOR_2_TS_EXT3";
    RohcPacket[RohcPacket["ROHC_PACKET_MAX"] = 66] = "ROHC_PACKET_MAX";
})(RohcPacket = exports.RohcPacket || (exports.RohcPacket = {}));
// ---------------------------------------------------------------------------------------------------------------------
const rohcAddon = require('../../../build/Release/rohcAddon');
exports.default = rohcAddon;
//# sourceMappingURL=RohcAddon.js.map