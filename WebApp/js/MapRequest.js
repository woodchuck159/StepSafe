class MapRequest {
  #BASE_URL = "https://api.mapbox.com/directions/v5";
  
  #RoutingProfiles = {
    "driving-traffic": "mapbox/driving-traffic",
    "driving": "mapbox/driving",
    "walking": "mapbox/walking",
    "cycling": "mapbox/cycling"
  };

  #RoutingParameters;

  #location = {
    'longitude': null,
    'latitude': null
  };

  constructor() {
    this.getMapLocation();
  }

  getMapLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => this.getLocationSuccess(position),
        (error) => this.getLocationError(error),
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  getLocationSuccess(position) {
    this.#location['longitude'] = position.coords.longitude;
    this.#location['latitude'] = position.coords.latitude;
    console.log(`User Location: ${this.#location['longitude']}, ${this.#location['latitude']}`);
  }

  getLocationError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.error("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.error("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.error("The request to get user location timed out.");
        break;
      default:
        console.error("An unknown error occurred.");
        break;
    }
  }
}