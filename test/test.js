const {Rohc} = require('..');


const createIPPacketWithContent = () => {
    // IP header fields
    const versionAndIHL = (4 << 4) | 5; // IPv4 and header length of 5 (20 bytes)
    const typeOfService = 0;
    const headerLength = 20; // Header length (20 bytes)
    const identification = 0;
    const flagsAndFragmentOffset = 0;
    const ttl = 64; // Time to Live
    const protocol = 6; // TCP
    const headerChecksum = 0; // Will calculate later
    const sourceIP = [192, 168, 0, 1];
    const destinationIP = [192, 168, 0, 2];

    // Data payload (example content)
    const data = new TextEncoder().encode("Hello, this is the data payload!");
    const totalLength = headerLength + data.length; // Total length = header length + data length

    // Create an ArrayBuffer for the entire packet
    const buffer = new ArrayBuffer(totalLength);
    const view = new DataView(buffer);

    // Set the header fields
    view.setUint8(0, versionAndIHL);
    view.setUint8(1, typeOfService);
    view.setUint16(2, totalLength, false); // Big-endian
    view.setUint16(4, identification, false);
    view.setUint16(6, flagsAndFragmentOffset, false);
    view.setUint8(8, ttl);
    view.setUint8(9, protocol);
    view.setUint16(10, headerChecksum, false); // Placeholder for checksum

    // Set source and destination IP addresses
    for (let i = 0; i < 4; i++) {
        view.setUint8(12 + i, sourceIP[i]);
        view.setUint8(16 + i, destinationIP[i]);
    }

    // Calculate the header checksum
    let checksum = 0;
    for (let i = 0; i < headerLength; i += 2) {
        checksum += view.getUint16(i, false);
    }
    checksum = (checksum & 0xFFFF) + (checksum >> 16);
    checksum = ~checksum & 0xFFFF;
    view.setUint16(10, checksum, false);

    // Set the data payload
    const dataView = new Uint8Array(buffer, headerLength);
    dataView.set(data);

    return buffer;
};

const ipPacketBufferWithContent = createIPPacketWithContent();
console.log(new Uint8Array(ipPacketBufferWithContent));

// ---------------------------------------------------------------------------------------------------------------------

function hexStringToUint8Array(hexString) {
    hexString = hexString.replace(/\s+/g, '');

    // Ensure the hex string has an even length
    if (hexString.length % 2 !== 0) {
        throw new Error("Hex string must have an even length");
    }

    // Create a Uint8Array with the appropriate length
    const arrayBuffer = new Uint8Array(hexString.length / 2);

    for (let i = 0; i < hexString.length; i += 2) {
        // Parse each pair of hex characters and store the result in the array
        arrayBuffer[i / 2] = parseInt(hexString.substr(i, 2), 16);
    }

    return arrayBuffer;
}

// ---------------------------------------------------------------------------------------------------------------------

const r = new Rohc();
console.log(r.getVersion());

try {
    const compress = r.rohcCompress(new Uint8Array(ipPacketBufferWithContent));

    console.log(compress);

    if (compress.buffer) {
        console.log(Buffer.from(compress.buffer).toString("hex"));

        const decompress = r.rohcDecompress(compress.buffer);

        console.log(decompress);

        if (decompress.buffer) {
            console.log(Buffer.from(decompress.buffer).toString("hex"));
        }
    }
} catch (e) {
    console.error(e);
}

// ---------------------------------------------------------------------------------------------------------------------

try {
    const compress2 = r.rohcCompress(hexStringToUint8Array('45 C0 01 48 D3 67 00 00 40 11 70 D7 20 DB F8 01 20 DB FA EE 00 43 00 44 01 34 D6 71 02 01 06 00 43 57 CA 8B 00 17 00 00 00 00 00 00 20 DB FA EE 00 00 00 00 20 D9 AE 01 80 61 5F 08 2D 7A 00 00 00 00 00 00 00 00 00 00 64 68 63 70 30 35 2E 66 74 77 79 2E 69 6E 2E 66 72 6F 6E 74 69 65 72 6E 65 74 2E 6E 65 74 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 63 82 53 63 35 01 02 36 04 B8 10 06 9D 33 04 00 00 0E 10 01 04 FF FF F8 00 03 04 20 DB F8 01 0F 0F 66 74 72 64 68 63 70 75 73 65 72 2E 6E 65 74 06 08 4A 28 4A 28 4A 28 4A 29 FF 00 00 00 00 00'));
    console.log(compress2);

    if (compress2.buffer) {
        console.log(Buffer.from(compress2.buffer).toString("hex"));
    }
} catch (e) {
    console.error(e);
}

try {
    //const compress2 = r.rohcCompress(hexStringToUint8Array('45 C0 01 48 D3 67 00 00 40 11 70 D7 20 DB F8 01 20 DB FA EE 00 43 00 44 01 34 D6 71 02 01 06 00 43 57 CA 8B 00 17 00 00 00 00 00 00 20 DB FA EE 00 00 00 00 20 D9 AE 01 80 61 5F 08 2D 7A 00 00 00 00 00 00 00 00 00 00 64 68 63 70 30 35 2E 66 74 77 79 2E 69 6E 2E 66 72 6F 6E 74 69 65 72 6E 65 74 2E 6E 65 74 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 63 82 53 63 35 01 02 36 04 B8 10 06 9D 33 04 00 00 0E 10 01 04 FF FF F8 00 03 04 20 DB F8 01 0F 0F 66 74 72 64 68 63 70 75 73 65 72 2E 6E 65 74 06 08 4A 28 4A 28 4A 28 4A 29 FF 00 00 00 00 00'));
    const compress3 = r.rohcCompress(hexStringToUint8Array('45 00 00 3e 31 c4 40 00 80 06 45 9e c0 a8 01 03 c0 a8 01 04 0b 27 04 d2 b0 f7 47 61 28 6c fd a7 50 18 fa f0 8e a0 00 00 48 61 6c 6c 6f 20 64 61 73 20 69 73 74 20 65 69 6e 20 54 65 73 74'));

    console.log(compress3);

    if (compress3.buffer) {
        console.log(Buffer.from(compress3.buffer).toString("hex"));
    }
} catch (e) {
    console.error(e);
}