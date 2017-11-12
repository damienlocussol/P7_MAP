function Controller(){
	
	this.usrPos = {};
	this.map = {};
	this.markers = [];
	this.minStar = 1;
	this.maxStar = 5;

	this.tryGeolocation = function (){
		// var self = this;
		if (navigator.geolocation) {
			var watchPos = navigator.geolocation.watchPosition((function(position){
				this.usrPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				this.initMap();
			}).bind(this), this.error);
  		} else {
  			alert("Your browser does not support Geolocation.");
		};
	};

	this.error = function(err) {
		console.log("error " + err.code + " : " + err.message);
	};

	this.initMap = function (){
		this.map = new google.maps.Map(document.getElementById('map'), {
    		zoom: 15,
    		disableDefaultUI: true,
    		mapTypeId: google.maps.MapTypeId.ROADMAP,
    		center : this.usrPos
  		});

  		this.addMarker(this.map, this.usrPos);
	};

	this.setStars = function(){
		$('input[type=range][name=selectStars]').on('change', function(){
			this.minStar = $(this).val();

		});
	};

	this.displayRestos = function(){


	};

	this.isOnMap = function(){


	};

	this.addMarker = function(map, position, image){
		new google.maps.Marker({
			icon : image,
	    	map: map,
	    	position: position,
	    	animation: google.maps.Animation.DROP
  		});

	};

	this.removeMarker = function(){

	}











};

