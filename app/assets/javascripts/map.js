jQuery(function() {

  jQuery(window).resize(function(){
    var innerHeight = jQuery(window).height() - jQuery('.navbar').outerHeight();
    jQuery('#map').height(innerHeight);
  }).resize();

  var map = L.map('map').fitBounds([[52.499024, 13.355374], [52.530247, 13.447751]]);

  // add an OpenStreetMap tile layer
  L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20
  }).addTo(map);

  // TV Tower
  L.marker([52.52060806001903, 13.409671783447266], {
    icon: L.icon({
      iconUrl: '/assets/alex.png',
      iconAnchor: L.point([79, 178])
    }),
    clickable: false,
    keyboard: false,
    title: 'Disco!',
    alt: 'Fernsehturm'
  }).addTo(map);


  var control = L.control({
    position: 'bottomleft'
  })

  control.onAdd = function() {
    this.container = L.DomUtil.create('div', 'slider-control');
    L.DomEvent.disableClickPropagation(this.container);

    this.container.innerHTML = "<div id='slider'></div>";
    return this.container;
  }

  control.addTo(map);

  jQuery.getJSON('/clubs.json', function(data) {
    var clubs = data['clubs'];
    var years = data['years'];

    for (var i = 0; i < clubs.length; i++) {
      var club = clubs[i];
      clubs[i].marker = L.marker(
        [club.latitude, club.longitude], {
          title: club.name
        })
        .bindPopup(
          "<h4>" + club.name + "</h4>" +
          "<p>" + club.first_year + "-" + (club.last_year ? club.last_year : '') + "</p>" +
          "<p>" + club.description + "</p>" +
          "<p>" + club.address + "</p>"
        );
    }

    var slide = function(e, ui) {
      var year = parseInt(ui.value);

      for (var i = 0; i < clubs.length; i++) {
        map.removeLayer(clubs[i].marker);
      }

      // maybe hide instead with:
      //marker1._icon.style.display="none"

      for (var i = 0; i < (years[year] || []).length; i++) {
        var club = clubs[years[year][i]];
        club.marker.addTo(map);
      }
    }

    jQuery('#slider').slider({
      min: 1989,
      max: 2014,
      slide: slide
    });
  });

})
