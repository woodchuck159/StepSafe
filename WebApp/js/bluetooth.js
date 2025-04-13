let bluetoothDevice;
let txCharacteristic;

const SERVICE_UUID = '0000ffe0-0000-1000-8000-00805f9b34fb';
const CHARACTERISTIC_UUID = '0000ffe1-0000-1000-8000-00805f9b34fb';

// create asynchronous function to connect to HM-10 device
async function connectToHM10() {
    try {
        bluetoothDevice = await navigator.bluetooth.requestDevice( {
            filters: [{ namePrefix: 'HM' }],
            optionalServices: [SERVICE_UUID]
        });

        const server = await bluetoothDevice.gatt.connect();
        const service = await server.getPrimaryService(SERVICE_UUID);
        txCharacteristic = await service.getCharacteristic(CHARACTERISTIC_UUID);

        console.log("Connected to HM-10!");
    } catch (error) {
        console.log("Connection Failed", error);
    }
}

// create function to send ON and OFF commands to HM-10
async function sendCommand(cmd) {
    if (!txCharacteristic) return;
    const encoder = new TextEncoder();
    await txCharacteristic.writeValue(encoder.encode(cmd + "\n")); // add a new line
}

// export the functions
export { connectToHM10, sendCommand };