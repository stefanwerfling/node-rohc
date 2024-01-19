import rohcAddon, {rohcCompressResult} from './src/ts/RohcAddon';

class Rohc {

    public getVersion(): string {
        return rohcAddon.rohcVersion();
    }

    public rohcCompress(ipPacket: ArrayBuffer): rohcCompressResult {
        return rohcAddon.rohcCompress(ipPacket);
    }
}

export {Rohc};