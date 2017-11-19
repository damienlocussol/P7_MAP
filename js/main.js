var website = website || {};

(function(publics){

	var privates = {};

	privates.usrPos = {};
	privates.map = {};
	privates.initialize = false;
	privates.storage = true; //false;
	privates.star = 1;

	publics.init = function(){
		if (navigator.geolocation) {
			var watchPos = navigator.geolocation.watchPosition(privates.success, privates.error);
		 } else {
		  	alert("Your browser does not support Geolocation.");
		}
	};

	privates.success = function(position) {
		if(privates.initialize){
			var newUsrPos = privates.usrPos = {lat : position.coords.latitude, lng : position.coords.longitude};
			if(privates.usrPos !== newUsrPos){
				privates.usrPos = newUsrPos;
				privates.centerMap(privates.usrPos);
			}
		}else{
			privates.usrPos = {lat : position.coords.latitude, lng : position.coords.longitude};
			privates.initMap(privates.usrPos); 	
			privates.setStars();	
			privates.setInterface();
			privates.setMenu();
			privates.initDatas();
			privates.initialize = true;
		}									 
	};	

	privates.error = function(err) {
		console.log("error " + err.code + " : " + err.message);
	};

	privates.initMap = function(usrPos){

		privates.map = new google.maps.Map(document.getElementById('map'), {
	    	zoom: 10,
	    	disableDefaultUI: true,
	    	mapTypeId: google.maps.MapTypeId.ROADMAP,
	    	center : usrPos
	  	});

	  	privates.setUsrMarker(usrPos, privates.map);

	  	privates.map.addListener('idle', function(){
	  		$('.overlay-preloader').fadeIn();
	  		website.request.getRestos(privates.map, privates.star);
  		});

  		privates.map.addListener('click', function(){
	  		console.log('map clicked');
  		});
	};

	privates.centerMap = function(usrPos){
		privates.map.setCenter(usrPos);
		$('.overlay-preloader').fadeIn();
		website.request.getRestos(privates.map, privates.star);
	};

	privates.setUsrMarker = function(usrPos, map){

		function UsrMarker(lat, lng) {
        	this.lat = lat;
        	this.lng = lng;
        	this.pos = new google.maps.LatLng(lat, lng);
    	}

	    UsrMarker.prototype = new google.maps.OverlayView();

	    UsrMarker.prototype.onRemove = function () {}

	    UsrMarker.prototype.onAdd = function () {
	        div = document.createElement('DIV');
	        div.className = "usr-marker pulse";
	        div.id="usrId";
	        var panes = this.getPanes();
	        panes.overlayMouseTarget.appendChild(div);
			// var me = this;
			google.maps.event.addDomListener(div, 'click', function() {
			    // google.maps.event.trigger(me, 'click');
			    console.log("usrMark clicked");
			});

	        this.div=div;
	    }

	    UsrMarker.prototype.draw = function () {
	        var overlayProjection = this.getProjection();
	        var position = overlayProjection.fromLatLngToDivPixel(this.pos);
	        this.div.style.left = position.x + 'px';
	        this.div.style.top = position.y  + 'px';
	    }

	    var usrMarker = new UsrMarker(usrPos.lat, usrPos.lng);
	    usrMarker.setMap(map);

	};

	privates.setStars = function(){

		$('.star-bullet').on('click', function(e){
			privates.star = $(this).data('star');
			privates.changeStarColor(privates.star);
		});
		
	};

	privates.changeStarColor = function(star){
		$('.star-bullet').each(function(){
			if($(this).data('star') >= star){
				$(this).addClass('star-active');
			}else{
				$(this).removeClass('star-active');
			}
			
		});
	};

	privates.setDeviceWidth = function(){
		if (window.matchMedia("(max-width: 600px)").matches){
			var deviceWidth = true;
		}else{
			var deviceWidth = false;
		}
		return deviceWidth;
	};

	privates.setMenu = function(){

		if (privates.setDeviceWidth()) {

			$('.menu a').on('click', function(){
				$('div.add-star').each(function(){
					$(this).removeClass('add-star-active');
				});
			});

			$('.menu li a').on('click', function(e){
				$('.add-star-active').removeClass('add-star-active');
				$(this).next('.add-star').addClass('add-star-active');
			});

		}else{

			$('.menu li').hover(
			function(e){
				$(this).children('.add-star').addClass('add-star-active');
			},
			function(e){
				$(this).children('.add-star').removeClass('add-star-active');
			});

			$('.valid').on('click', function(e){
				$('.add-star-active').removeClass('add-star-active');
			});
		}


		$('.get-star').on('click', function(e){
			$('.overlay-preloader').fadeIn();
			website.request.getRestos(privates.map, privates.star);
			$('.nb-star').text(privates.star);
			var many = privates.star > 1 ? ' étoiles' : ' étoile';
			$('.many-star').text(many);
		});

		$('.valid').on('click', function(e){
			$('.menu').closeFAB();
		});

	};

	privates.setInterface = function (){
	// 	$('#addResto').on('click', function(){
	// 		$('#newResto').css('display', 'block');
	// 		website.display.displayAddResto();

	// 	});

		// $('.details-resto').on('click', function(){
			// $('#newResto').css('display', 'block');
			// website.display.displayAddResto();
	
		// });
		// $(window).on('resize', function(){
			$('.infoWindow').on('click', function(){
				console.log('eeeee');
			});


		if (privates.setDeviceWidth()) {

			$('.menu').addClass('click-to-toggle');

			$('#display-list').on('click', function(){
				$('.content-content').toggleClass('up-content-content');
			});
		}else{

			$('.menu').removeClass('click-to-toggle');
		};

		$('.add-restaurant-btn').on('click', function(){

		});

		$('a.close-btn-info').on('click', function(){
			$('.resto-info').removeClass('active-info-resto');
			$('.box-container').removeClass('active-box');	
		});

	};

	privates.initDatas = function(){
		$.getJSON("datas/list.json",{_: new Date().getTime()}).done(function(data){
			var dataJSON = JSON.stringify(data);
			if(typeof localStorage!='undefined') {
				privates.storage = true;
				localStorage.setItem('listRestos', dataJSON);
			} else {
  				console.log("localStorage n'est pas supporté");
			}
		});
	};

	
}(website));

$(document).ready(function(){
	website.init();
});

//p7Map as website
