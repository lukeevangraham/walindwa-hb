var mymap = L.map('mapid').setView([-0.02, 37.9], 4);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGVsaXJpb3U1OCIsImEiOiJjazBraXp1MXgwbHNlM2ZvNGJsOW0xNzZsIn0.IRf4OdH3qM8cVwcZoVTHAA', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

var marker = L.marker([0.05, 35.72]).addTo(mymap);
marker.bindPopup("Eldama Ravine").openPopup();