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
  const zoomToTargetButton = document.getElementById('zoomTarget');
  const zoomOutButton = document.getElementById('zoomOut')
  const followBox = document.getElementById('follow')

  // Event listeners
  zoomToMeowthButton.addEventListener('click', zoomToMeowth);
  zoomToTargetButton.addEventListener('click', zoomToTarget);
  zoomOutButton.addEventListener('click', zoomToHome);

  // Button Functions
  function zoomToMeowth(e) {
    if (e) e.preventDefault(); // Prevents page from reloading after submit
    map.flyTo(meowth.getLatLng(), 15);
  }

  function zoomToTarget(e) {
    if (e) e.preventDefault(); // Prevents page from reloading after submit
    map.flyTo(targetLocation.getLatLng(), 15);
  }

  function zoomToHome(e) {
    if (e) e.preventDefault(); // Prevents page from reloading after submit
    map.flyTo([rollaCenter[0], rollaCenter[1]], 15);
  }

  //map initialization
  var map = L.map('map').setView([rollaCenter[0], rollaCenter[1]], 10);
  map.maxZoom = 20;

  L.tileLayer(osmUrl, {
    attribution: osmAttrib
  }).addTo(map);

  // Marker initialization
  var meowthLatLng = L.latLng(51.5, -0.09);
  var meowth = L.marker(meowthLatLng, {
    icon: L.icon({
      iconUrl: meowthImageURL,
      iconSize: [50, 50],
      iconAnchor: [25, 50],
    })
  }).addTo(map);

  var targetLatLng = L.latLng(51.5, -0.09);
  var targetLocation = L.marker(targetLatLng).addTo(map);

  // Update functions
  (function updateProgress() {
    $.getJSON(trackerURL + '/position.json', function(data) {
      // Progress bar stuff
      var progress = String((data['Progress'] * 100).toFixed(2)) + '%';
      var transport = String(data['Transport']);
      transportHeading.innerHTML = transport;
      progressBar.style.width = progress;
      progressBar.innerHTML = progress;

      // Meowth Marker Stuff
      meowthLatLng.lat = data['Lat'];
      meowthLatLng.lng = data['Long'];
      meowth.setLatLng(meowthLatLng);

      setTimeout(updateProgress, 500);
    });
  }());

  (function updateTarget() {
    $.getJSON(trackerURL + '/target.json', function(data) {
      targetLatLng.lat = data['Lat'];
      targetLatLng.lng = data['Long'];
      targetLocation.setLatLng(targetLatLng);
      setTimeout(updateTarget, 500);
    });
  }());

  (function follow() {
    if ($(followBox).is(':checked')) {
      map.panTo(meowth.getLatLng());
    }
    setTimeout(follow, 500);
  }());


})();
