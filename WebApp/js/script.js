mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbmRvdmJ1c2giLCJhIjoiY205ZWhrOGp3MWUyejJtb2Rkazhrc295NyJ9.lCKS2G5IqLvr5yXktd3j9Q';

const map = new mapboxgl.Map({
  container: 'map',
  center: getLocation(),
  zoom: 9,
  style: 'mapbox://styles/mapbox/streets-v11'
});

const nav = new mapboxgl.NavigationControl();
map.addControl(nav);

var directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken
})

map.addControl(directions, 'top-left')
