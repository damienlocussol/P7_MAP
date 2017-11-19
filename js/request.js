var website = website || {};

(function(publics){

	var privates = {};

	privates.markers = [];
	privates.infoWindow;

	publics.getRestos = function(map, star){
  	// $.getJSON("datas/list.json",{_: new Date().getTime()}).done(function(data){
  		// $('.preloader-wrapper').css('display', 'block');

  		var data = JSON.parse(localStorage.getItem('listRestos'));
		var bounds = map.getBounds();
		// var elemCount = 0;
		// var dataLen = data.length;
		var icon = 'img/ic_place_black_36px.svg';

		data.forEach(function(el, idx){
			var locationRestaurant = new google.maps.LatLng({lat : el.lat, lng : el.long});
			var isInside = bounds.contains(locationRestaurant);
			var isInMarkers = privates.checkIsInMarkers(locationRestaurant);
			var nbStar = privates.ratingsAvg(el.ratings);

			if(!isInMarkers && isInside && nbStar.avg >= star){
				privates.markers.push(publics.addMarker(map, locationRestaurant, icon, el, nbStar, idx));
			}else if(isInMarkers && ( !isInside || nbStar.avg < star)){
				privates.removeMarker(locationRestaurant);
			}

			// elemCount+=1;
			// if(elemCount == dataLen){
			// 	$('.preloader-wrapper').css('display', 'none');
			// }
		});

		website.display.displayMarkerRestos(privates.markers, map);
		website.display.displayListRestos(privates.markers, map);
	// });
	};

	privates.checkIsInMarkers = function(locationRestaurant){
		var isInMarkers = false;
		for(var i = 0 ; i < privates.markers.length ; i++){
			if(locationRestaurant.equals(privates.markers[i].position)){
				isInMarkers = true;
				break;
			}
		}
		return isInMarkers;
	};

	privates.ratingsAvg = function(ratings){
		var ratingsSum = 0;
		var ratingsNb = ratings.length;
		for(var i = 0 ; i < ratingsNb ; i++){
			ratingsSum += ratings[i].stars;
		}
		var rates = { nb : ratingsNb, avg : (ratingsSum / ratingsNb) };

		if(!Number.isInteger(rates.avg)){
			rates.avg = rates.avg.toFixed(1);
		}

		// rates.avg = rates.avg.toFixed(1)
// console.log(rates.avg.toFixed(1));


		return rates;
	};

	publics.addMarker = function(map, position, image, el, nbStar, idx){
		
		var marker = new google.maps.Marker({
	    	position: position,
	    	map : null,
	    	icon: image,
	    	datas : el,
	    	star : nbStar,
	    	title : el.restaurantName
  		});
		
		marker.addListener('click', function(ev){
			if(privates.infoWindow){
				privates.infoWindow.close();
			}

			privates.infoWindow = new google.maps.InfoWindow();

			var div = document.createElement('div');
	        div.innerHTML = el.restaurantName;
	        div.onclick = function(){infoClick(marker)};
	        privates.infoWindow.setContent(div);
	        privates.infoWindow.open(map, marker);


		});

		function infoClick(marker){
			$('.overlay-preloader').fadeIn();
			website.display.displayResto(marker);	
		}

  		return marker;
	};

	privates.removeMarker = function(locationRestaurant){
		for(var i = 0 , markersLen = privates.markers.length; i < markersLen ; i++){
			if(locationRestaurant.equals(privates.markers[i].position)){
				privates.markers[i].setMap(null);
				privates.markers[i] = null;
				privates.markers.splice(i, 1);
				break;
			};
		};
	};

	// publics.addRestoToFile = function(datas, map){
	// 	publics.getRestos(map);
	// };

})(website.request = {});

