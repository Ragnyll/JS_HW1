(function() {
  'use strict';

  const trackerURL = 'http://meowthtracker.mwisely.xyz';
  const meowthImageURL = 'images/meowth.png';
  const rollaCenter = [37.948889, -91.763056];
  const osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const osmAttrib = [
    'Map data ©',
    '<a bhref="http://openstreetmap.org">OpenStreetMap</a>',
    'contributors'
  ].join(' ');
  const progressBar = document.getElementById('pBar');

  var map = L.map('map').setView([51.505, -0.09], 13);
  var meowthMarker = L.icon({
    iconUrl: './images/meowth.png',
  });
  L.marker([51.5, -0.09], {
    icon: meowthMarker
  }).addTo(map)

  L.tileLayer(osmUrl, {
    attribution: osmAttrib
  }).addTo(map);

  $.getJSON(trackerURL + '/position.json', function(data) {
    var progress = String((data['Progress'] * 100).toFixed(2)) + '%';
    console.log(progress);
    progressBar.style.width = progress;
    progressBar.innerHTML = progress;
  });

})();
