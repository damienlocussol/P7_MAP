function User(){
	
	this.pos = {};

	this.tryGeolocation = function (){
		if (navigator.geolocation) {
			var watchPos = navigator.geolocation.watchPosition(this.success, this.error);
  		} else {
  			alert("Your browser does not support Geolocation.");
		};
	};

	this.success = function(position){
		this.pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	};

	this.error = function(err) {
  		console.log("error " + err.code + " : " + err.message);
	};

};