import rohcAddon, {rohcCompressResult} from './src/ts/RohcAddon';

/**
 * A Binding library for the RObust Header Compression (ROHC) protocol.
 * @see https://github.com/stefanwerfling/rohc
 */
class Rohc {

    /**
     * Return a string with version of ROHC Library
     * @returns {string}
     */
    public getVersion(): string {
        return rohcAddon.rohcVersion();
    }

    /**
     * Compress an IP Packet to ROHC Packet
     * @param {Uint8Array} ipPacket
     * @returns {rohcCompressResult}
     */
    public rohcCompress(ipPacket: Uint8Array): rohcCompressResult {
        return rohcAddon.rohcCompress(ipPacket);
    }

    /**
     * Decompress a ROHC Packet to an IP Packet
     * @param {Uint8Array} rohcPacket
     * @returns {rohcCompressResult}
     */
    public rohcDecompress(rohcPacket: Uint8Array): rohcCompressResult {
        return rohcAddon.rohcDecompress(rohcPacket);
    }
}

export {Rohc};