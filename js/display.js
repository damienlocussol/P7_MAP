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
			if(markers[i].getMap() === null){
				markers[i].setAnimation(google.maps.Animation.DROP);
				markers[i].setMap(map);
			}
		}

	};


	publics.displayListRestos = function(markers, map){
		var list = $('.content-list').html('');
		// var listByStar = [];

		// $('.preloader-wrapper').css('display', 'block');
		// for(var i = 0 ; i < markers.length ; i++){

		// 	listByStar.push({
		// 		datas.restaurantName : markers[i].datas.restaurantName,
		// 		star.avg : markers[i].star.avg,
		// 		position : markers[i].position,
		// 		datas.address : markers[i].datas.address
		// 		// rId : markers[i].number
		// 	});
		// }

		// listByStar.sort(function(a,b){
		// 	return b.rRates - a.rRates;
		// });

		markers.sort(function(a,b){
			return b.star.avg - a.star.avg;
		});

		for(var i = 0, len = markers.length ; i < len ; i++){
			list.append('<p class="resto-title-list"><a class="black-text" id="' + i + '" href="#"> '+markers[i].datas.restaurantName+'</a> \
						 <span class="valign-wrapper right">'+markers[i].star.avg+'&nbsp;<i class="resto-star material-icons '+privates.starColor(markers[i].star.avg)+'-text">grade</i></span></p> \
				 		 <p class="adress-list brown-text text-lighten-1">'+markers[i].datas.address+'</p>');

			$('#'+i).on('click', function(e){	
				$('.overlay-preloader').fadeIn();
				e.preventDefault();		
				$('#street-view').html('');
				publics.displayResto(markers[$(this).attr('id')]);
			});
		};

		$('.overlay-preloader').fadeOut();
	};

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

	publics.displayResto = function(list){

		var posLat = list.position.lat();
		var posLng = list.position.lng();
  		// var urlTest = "https://maps.googleapis.com/maps/api/streetview/metadata?size=400x300&location="+posLat+","+posLng+"&key=AIzaSyBRttRz16dbN0k9hR_zwJKg_F5IC3xZ7E0";
  		var urlImg = "https://maps.googleapis.com/maps/api/streetview?size=600x400&location="+posLat+","+posLng+"&fov=90&pitch=0&key=AIzaSyBRttRz16dbN0k9hR_zwJKg_F5IC3xZ7E0";
		
		var img = $('<img src="'+urlImg+'">');

		img.on('load', function(){
			 
			$('#street-view').html(img);
			$('.resto-info').addClass('active-info-resto');	
			$('.box-container').addClass('active-box');	
		});

    	$('.resto-title').text(list.datas.restaurantName);
		$('.resto-adress').text(list.datas.address);
		$('.nb-star-resto').text(list.star.avg);
		$('.nb-notice').text(list.star.nb);
		// $('.nb-star').text(list.star.avg);

		for(var i = 0 , len = list.datas.ratings.length ; i < len ; i++){
			$('.resto-comment').append('<div class="comment"> \
											<img src="datas/avatar.jpg" alt="profile"> \
											<p class="comment-star">'+ list.datas.ratings[i].stars +'</p> \
											<p class="comment-comment">'+ list.datas.ratings[i].comment +'</p> \
										</div>');
			if(i < len-1){
				$('.resto-comment').append('<div class="divider"></div>');	
			}
			
		}
		
		$('.overlay-preloader').fadeOut();
	};

})(website.display = {});
