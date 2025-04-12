mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbmRvdmJ1c2giLCJhIjoiY205ZWhrOGp3MWUyejJtb2Rkazhrc295NyJ9.lCKS2G5IqLvr5yXktd3j9Q';

const map = new mapboxgl.Map({
  container: 'map',
  center: getLocation(), // fallback location
  zoom: 13,
  style: 'mapbox://styles/mapbox/navigation-guidance-night-v4'
});

const nav = new mapboxgl.NavigationControl();
map.addControl(nav);

var directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    profile: 'mapbox/walking'
})

map.addControl(directions, 'top-left')

// get and set origin
navigator.geolocation.getCurrentPosition((pos) => {
    const origin = [pos.coords.longitude, pos.coords.latitude];
    directions.setOrigin(origin);
});

// start listening for voice after the map loads
map.on('load', () => {
    startVoiceNavigation(); // call voice listener function
})

