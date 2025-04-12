class MapRequest {
  #BASE_URL = "https://api.mapbox.com/directions/v5";
  
  #RoutingProfiles = {
    "driving-traffic": "mapbox/driving-traffic",
    "driving": "mapbox/driving",
    "walking": "mapbox/walking",
    "cycling": "mapbox/cylcing"
  };

  constructor() {

  }

  buildURL() {
  
  }

  getLocation() {
    position = navigator.geolocation.getCurrentPosition(this.getLocationSuccess);
  }

  getLocationSuccess(position) {
    return position.coords;
  }



}