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

  map.on('click', function(e) {
    console.log('click')
    console.log(e.latlng)
  })


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

  var clubs = [
    { point: [52.50, 13.35], name: 'Boogie' },
    { point: [52.51, 13.36], name: 'Kunst und Technik' },
    { point: [52.52, 13.40], name: 'Eschloraque' },
    { point: [52.53, 13.42], name: 'WMF' }
  ]

  for (var i = 0; i < clubs.length; i++) {
    clubs[i].marker = L.marker(clubs[i].point);
  }


  var years = {
    1990: [1],
    1991: [1, 2],
    1992: [1, 2],
    1993: [1, 2],
    1994: [0, 1, 2],
    1995: [0, 1, 2],
    1996: [0, 1, 2, 3],
    1997: [0, 1, 2, 3],
    1998: [0, 1, 2, 3],
    1999: [2, 3],
    2000: [2, 3],
    2001: [3]
  }

  var slide = function(e, ui) {
    console.log(years[ui.value]);
    for (var i = 0; i < clubs.length; i++) {
      map.removeLayer(clubs[i].marker);
    }

    // maybe use
    //marker1._icon.style.display="none"

    for (var i = 0; i < (years[ui.value] || []).length; i++) {
      var club = clubs[years[ui.value][i]];
      console.log(clubs[years[ui.value][i]].name);
      club.marker.addTo(map);
    }
  }

  jQuery('#slider').slider({
    min: 1989,
    max: 2014,
    slide: slide
  });


  // add a marker in the given location, attach some popup content to it and open the popup
  //L.marker([51.5, -0.09]).addTo(map)
  //  .bindPopup('A pretty CSS3 popup. <br> Easily customizable.')
  //  .openPopup();
})
