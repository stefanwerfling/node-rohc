import rohcAddon from './src/ts/RohcAddon';

class Rohc {

    public getVersion(): string {
        return rohcAddon.rohcVersion();
    }
}

export {Rohc};