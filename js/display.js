var website = website || {};

(function(publics){

	var privates = {};

	// publics.displayAddResto = function(){
	// 	$('#formResto').on('submit', function(e){
	// 		e.preventDefault();

	// 		var formDatas = $('#formResto input');
	// 		var inputs = {};
	// 		formDatas.each(function(el, idx){
	// 			var id = $(this).attr('id');
 //        		inputs[id] = $(this).val();
	// 		});

	// 		formDatas.val('');
	// 		$('#formResto label').css('visibility', 'visible');

	// 		var name = inputs.restaurantName.replace(/ /g,'+');
	// 		var adress = inputs.address.replace(/ /g,'+');
	// 		var zipcode = inputs.zipcode;
	// 		// console.log(adress);

	// 		var urlGeo = 'https://maps.googleapis.com/maps/api/geocode/json?address='+adress+',+'+zipcode+'&key=AIzaSyC6Ydz_yqt5tbLhldq07FJ8S8P81-xv5XI';
	// 		$.getJSON(urlGeo).done(function(resp){
	// 			console.log(resp);
	// 		});
	// 		//address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&ke

	// 		if(privates.storage){
	// 			var data = JSON.parse(localStorage.getItem('listRestos'));
	// 			data[data.length] = inputs;
	// 			var dataJSON = JSON.stringify(data);
	// 			localStorage.setItem('listRestos', dataJSON);
	// 			console.log(data);
	// 		}
	// 		// website.request.addRestoToFile("ee", privates.map);
	// 		// $('#newResto').css('display', 'none');
	// 	});
	// };

	publics.displayMarkerRestos = function(markers, map){
		for(var i = 0 ; i < markers.length ; i++){
			// if( privates.ratingsAvg(markers[i].datas.ratings) >= star ){
				if(markers[i].getMap() === null){
					markers[i].setAnimation(google.maps.Animation.DROP);
					markers[i].setMap(map);
				}
			// }
		}
	};


	publics.displayListRestos = function(markers, map){
		var list = $('.content-list').html('');
		var listByStar = [];

		// $('.preloader-wrapper').css('display', 'block');
		for(var i = 0 ; i < markers.length ; i++){

			// if( privates.ratingsAvg(markers[i].datas.ratings) >= star ){
				listByStar.push({
					rName : markers[i].datas.restaurantName,
					rRates : markers[i].avgStar,
					rAdress : markers[i].datas.address
				});
			// }
		}

		listByStar.sort(function(a,b){
			return b.rRates - a.rRates;
		});

		for(var i = 0, len = listByStar.length ; i < len ; i++){
			list.append('<p class="resto-title-list"><a class="black-text" id="' + i + '" href="#"> '+listByStar[i].rName+'</a> \
						<span class="valign-wrapper right">'+listByStar[i].rRates+'&nbsp;<i class="resto-star material-icons '+privates.starColor(listByStar[i].rRates)+'-text">grade</i></span></p> \
				 		 <p class="adress-list brown-text text-lighten-1">'+listByStar[i].rAdress+'</p>');

			$('#'+i).on('click', function(e){	
				e.preventDefault();		
				privates.displayResto(listByStar, e.target.id, map);
			});
		};
	};

	// privates.ratingsAvg = function(ratings){
	// 	var ratingsSum = 0;
	// 	var ratingsNb = ratings.length;
	// 	for(var i = 0 ; i < ratingsNb ; i++){
	// 		ratingsSum += ratings[i].stars;
	// 	}
	// 	return ratingsSum / ratingsNb;
	// };

	privates.starColor = function(rates){
		var sC = 'green';
		switch (Math.ceil(rates)){
			case 1 :
				sC = 'red';
				break;
			case 2 :
				sC = 'orange';
				break;
			case 3 :
				sC = 'lime';
				break;
			case 4 :
				sC = 'blue';
				break;
			case 5 :
				sC = 'green';
				break;
			default : 
				break;
		}
		return sC;
	};

	privates.displayResto = function(list, e, map){

 		// var panorama = new google.maps.StreetViewPanorama(
	  //     	document.getElementById('street-view'), {
	  //       position: {lat: 40.729559, lng: -73.990741},
	  //       pov: {
	  //         heading: 34,
	  //         pitch: 10
	  //       }
   //    	});
  	// 	map.setStreetView(panorama);

  		var urll = "https://maps.googleapis.com/maps/api/streetview?size=400x400&location=40.720032,-73.988354&fov=90&heading=235&pitch=10&key=AIzaSyBRttRz16dbN0k9hR_zwJKg_F5IC3xZ7E0";


	// 	var contentResto = $('#contentResto'); 
	// 	var infosResto = $('#infosResto');
	// 	var contentNotice = $('#contentNotice');

		// var detailsResto = $('.resto-title');

		$('#street-view').append('<img class="street-img" src="'+ urll+'" alt="">');

		$('.resto-title').text(list[e].rName);
		$('.resto-adress').text(list[e].rAdress);
		$('.nb-star').text(list[e].rRates);

		$('.resto-comment').text("commentssssssssssssss");



		$('.resto-info').css('left', '100%');

		// detailsResto.html('').append('<p>'+list[e].rName+'</p><a href="#!" class="secondary-content btn-close"><i class="material-icons">close</i></a>');


		// detailsResto.removeClass('close-box-details').addClass('open-box-details');

		// $('.btn-close').on('click', function(){
		// 	detailsResto.removeClass('open-box-details').addClass('close-box-details');
		// });

	// 	contentResto.html('').append('<p>'+markers[e].datas.restaurantName+'</p>');
	// 	infosResto.css('display', 'block');
	// 	contentNotice.css('display', 'none');

	// 	$('#close').on('click', function(){
	// 		infosResto.css('display', 'none');
	// 	});

	// 	$('#addNotice').on('click', function(){
	// 		contentNotice.css('display', 'block');
	// 	});

	// 	$('#addNoticeToResto').on('submit', function(e){
	// 		e.preventDefault();
	// 		contentNotice.css('display', 'none');
	// 	});

	};

})(website.display = {});

// $(document).ready(function(){
// 	website.display.init();
// });