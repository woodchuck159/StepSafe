class MapRequest {
  #BASE_URL = "https://api.mapbox.com/directions/v5";
  
  #RoutingProfiles = {
    "driving-traffic": "mapbox/driving-traffic",
    "driving": "mapbox/driving",
    "walking": "mapbox/walking",
    "cycling": "mapbox/cylcing"
  };

  #RoutingParameters;

  #location = {
  'longitude': null,
  'latitude': null
  };

  constructor() {
    this.getMapLocation()
  }

  // buildURL(locationStr) {
  
  // }

  getMapLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.getLocationSuccess(position)
    });
  }

  getLocationSuccess(position) {
    this.#location['longitude'] = position.coords.longitude
    this.#location['latitude'] = position.coords.latitude
    console.log(`${this.#location['longitude']}, ${this.#location['latitude']}`)
  }



}