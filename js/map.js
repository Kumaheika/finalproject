function initialize() {
        
        //Ã¸»s¦a¹Ï        
        var map=drawmap();


        //ªì©l¤Æ¦a¹Ï®Éªº©w¦ì¸g½n«×³]©w
        var latlng = new google.maps.LatLng(22.6492006053,120.291924331); //¥xÆW½n«×Latitude¡B¸g«×Longitude¡G22.6492006053,120.291924331
        //ªì©l¤Æ¦a¹Ïoptions³]©w
        var mapOptions = {
          zoom: 10,
          center: latlng,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        //ªì©l¤Æ¦a¹Ï
        map = new google.maps.Map(document.getElementById("map_canvas"),mapOptions);



        // Ã¸»smarker
        var locations = [
          ['測照地點:中華二路、十全二路口。功能: 闖紅燈',  22.6492006053, 120.291924331],
          ['測照地點:民族一路、十全一路口。功能: 闖紅燈',  22.6462445945,120.291785346],
          ['測照地點:同盟二路、自立一路口。功能:闖紅燈',   22.6446429388, 120.314417507],
        ];



        var infowindow = new google.maps.InfoWindow();

        var mcOptions = {gridSize: 50, maxZoom: 15};
        var markers = [];

        var marker, i;
        for (i = 0; i < locations.length; i++) {  
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            title: locations[i][0],
            //zIndex: locations[i][3],
            map: map
          });
          google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
              infowindow.setContent(locations[i][0]);
              infowindow.open(map, marker);
            }
          })(marker, i));
          markers.push(marker);
        }

        var markerCluster = new MarkerClusterer(map, markers, mcOptions);
      }
      google.maps.event.addDomListener(window, 'load', initialize);

      function drawmap(){
        //¦a¹Ï°Ñ¼Æ¿ï¶µ
        var mapOptions = {
          center: new google.maps.LatLng(18, 18),
          mapTypeId: google.maps.MapTypeId.TERRAIN,
          zoom:2,
          minZoom: 2,
          maxZoom: 100,   //¦a¹Ï¤j¤p
          zoomControl: true,
          panControl: true,
          mapTypeControl: false,    //¦a§Î¹Ï&½Ã¬P¹Ï¤Á´«
          streetViewControl: false, //µó´º
          disableDoubleClickZoom: true, //true¸T¥ÎÂùÀ»ÁY©ñ¦a¹Ï
          keyboardShortcuts: true,  //¥ÎÁä½L±±¨î¦a¹Ï
          scrollwheel: true //·Æ¹«ºu½ü©Ôªñ©Ô»·          
        };
        //Ã¸»s¦a¹Ï
        var map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);
        return map;
      }