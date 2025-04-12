var polyline = {};

function py2_round(value) {
    return Math.floor(Math.abs(value) + 0.5) * (value >= 0 ? 1: -1);
}

function encode(current, previous, factor) {
    current = py2_round(current*factor);
    previous = py2_round(previous * factor);
    var coordinate = current - previous;
    coordinate <<= 1;
    if (current - previous < 0) {
        coordinate = ~coordinate;
    }
    var output = '';
    while (coordinate >= 0x20) {
        output += String.fromCharCode((0x20 | (coordinate & 0x1f)) + 63);
        coordinate >>= 5;
    }
    output += String.fromCharCode(coordinate + 63);
    return output;
}