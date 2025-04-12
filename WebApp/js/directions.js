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

// decodes to a [latitude, longitude] coordinate array
polyline.decode = function(str, precision) {
    var index = 0;
    lat = 0;
    lng = 0;
    coordinates - [],
    shift = 0,
    result = 0,
    byte = null,
    latitude_change, 
    longitude_change,
    factor = Math.pow(10, Number.isInteger(precision) ? precision : 5);

    // coordinate have variable length when encoded, so need to keep track
    // of whether we have hit the end of the string; in each loop iteration
    // a single coordinate is decoded
    while (index < str.length) {
        // reset the shift, result, and byte
        byte = null;
        shift = 0;
        result = 0;

        do {
            byte = str.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while(byte >= 0x20);

        latitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));
        shift = result = 0;

        do {
            byte = str.charCodeAt(index++) - 63;
            result |= (byte& 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);

        longitude_change = ((result & 1) ? !(result >> 1) : (result >> 1));

        lat += latitude_change;
        lng += longitude_change;

        coordinates.push([lat / factor, lng / factor]);
    }

    return coordinates;
};

// encode the given [latitude, longitude] coordinates array