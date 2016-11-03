(function() {
  'use strict';

  // panTo to follow
  //flyTo to zoom

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
  const transportHeading = document.getElementById('transportName');
  const zoomToMeowthButton = document.getElementById('zoomMeowth');

  // Get the initial State


  // Event listeners
  zoomToMeowthButton.addEventListener('click', zoomToMeowth);

  // Button Functions
  //Zoom To Meowth
  function zoomToMeowth(e) {
    if (e) e.preventDefault(); // Prevents page from reloading after submit
    map.flyTo(meowth.getLatLng());
  }

  //map initialization
  var map = L.map('map').setView([51.505, -0.09], 13);
  L.tileLayer(osmUrl, {
    attribution: osmAttrib
  }).addTo(map); // is this needed?

  // Marker initialization

  var latLng = L.latLng(51.5, -0.09);
  var meowthMarker = L.icon({
    iconUrl: './images/meowth.png',
  });
  var meowth = L.marker(latLng, {
    icon: meowthMarker
  }).addTo(map); // is it ok that it just starts here?

  (function updateProgress() {
    $.getJSON(trackerURL + '/position.json', function(data) {
      // Progress bar stuff
      var progress = String((data['Progress'] * 100).toFixed(2)) + '%';
      var transport = String(data['Transport']);
      transportHeading.innerHTML = transport;
      progressBar.style.width = progress;
      progressBar.innerHTML = progress;

      // Meowth Marker Stuff
      latLng.lat = data['Lat'];
      latLng.lng = data['Long'];
      meowth.setLatLng(latLng);
      setTimeout(updateProgress, 500);
    });
  }());


})();
