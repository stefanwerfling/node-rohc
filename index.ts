import rohcAddon from './src/ts/RohcAddon';

class Rohc {

    public getVersion(): string {
        return rohcAddon.rohcVersion();
    }

    public rohcCompress(ipPacket: ArrayBuffer): ArrayBuffer {
        return rohcAddon.rohcCompress(ipPacket);
    }
}

export {Rohc};