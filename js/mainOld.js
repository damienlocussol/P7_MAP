	    // function initMap() {

	    //     var map = new google.maps.Map(document.getElementById('map'), {
	    //       scaleControl: true,
	    //       center: {lat: 30.064742, lng: 31.249509},
	    //       zoom: 15,
	    //       zoomControl: false,
     //      	  scaleControl: false,
     //      	  mapTypeControl: false,
     //      	  fullscreenControl: false,
     //      	  streetViewControl : false
	    //     });

	    //     var infowindow = new google.maps.InfoWindow;

	    //     tryGeoLocalisation(infowindow, map);

     //    }

     //    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	    //     infoWindow.setPosition(pos);
	    //     infoWindow.setContent(browserHasGeolocation ?
	    //                           'Error: The Geolocation service failed.' :
	    //                           'Error: Your browser doesn\'t support geolocation.');
	    // }



	    // function tryGeoLocalisation(infowindow, map){
	    // 	// Try HTML5 geolocation.
	    //     if (navigator.geolocation) {
	    //       navigator.geolocation.getCurrentPosition(function(position) {
	    //         var pos = {
	    //           lat: position.coords.latitude,
	    //           lng: position.coords.longitude
	    //         };

	    //         infowindow.setPosition(pos);
	    //         infowindow.setContent('Location found.');
	    //         map.setCenter(pos);
	    //         setMarker(map, pos, infowindow);
	    //       }, function() {
	    //         handleLocationError(true, infoWindow, map.getCenter());
	    //       });
	    //     } else {
	    //       // Browser doesn't support Geolocation
	    //       handleLocationError(false, infoWindow, map.getCenter());
	    //     }
	    // }



var website = website || {};

(function(publics){

	var privates = {};

	publics.init = function(){
		if (navigator.geolocation) {
			privates.launchProcess();
  		} else {
  			alert("Your browser does not support Geolocation.");
		}
	};

	privates.launchProcess = function(){
		navigator.geolocation.getCurrentPosition(privates.initMap);
	};

	privates.initMap = function(position) {

  		var location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  		var markers = [];

  		var map = new google.maps.Map(document.getElementById('map'), {
    		zoom: 5,
    		disableDefaultUI: true,
    		mapTypeId: google.maps.MapTypeId.ROADMAP,
    		center : location
  		});

  		privates.setMarker(location, map, markers);

  		map.addListener('idle', function(){
  			privates.getJsonInfos(map, markers, privates.getMapBounds(map));
  		});
  		
	};

	privates.getMapBounds = function(map){
		var bounds = map.getBounds();
		return bounds;
	};

	privates.showError = function(err) {
		console.log("Location can't be found !");
	};

	privates.getJsonInfos = function(map, markers, bounds){
		
		$.getJSON("datas/list.json", function(data){

			var image = 'https://mts.googleapis.com/vt/icon/name=icons/spotlight/spotlight-waypoint-blue.png&psize=16&font/Roboto-Regular.ttf&color=ff333333&ax=44&ay=48&scale=1';

			data.forEach(function(el, idx){

				var locationRestaurant = new google.maps.LatLng({lat : el.lat, lng : el.long});
				var isInside = bounds.contains(locationRestaurant);
				var isOnMap = privates.isOnMap(markers, locationRestaurant);

				if(!isOnMap && isInside){
					privates.setMarker(locationRestaurant, map, markers, image );
				};
			});
		});
	};

	privates.isOnMap = function(markers, locationRestaurant){

		var isOnMap = false;

		for(var i = 0 ; i < markers.length ; i++){

			if(locationRestaurant.equals(markers[i].position)){
				isOnMap = true;
				break;
			};
		};

		return isOnMap;
	};

	privates.setMarker = function(location, map, markers, image){
		markers.push(new google.maps.Marker({
			icon : image,
	    	map: map,
	    	position: location,
	    	animation: google.maps.Animation.DROP
  		}));
	};

	privates.displayRestaurant = function(){

	};


}(website));

website.init();



