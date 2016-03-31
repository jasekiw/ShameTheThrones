var HomePage = (function () {
    function HomePage() {
        var _this = this;
        this.currentLatitude = 38; // default values to give a map a location to preload
        this.currentLongitude = -85;
        /**
         *
         * Gets the location of the user
         */
        this.getLocation = function () {
            Main.showLoader();
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(_this.showPosition, _this.locationDeclined);
            }
            else {
                console.log("Geolocation is not supported by this browser.");
            }
        };
        this.showPosition = function (position) {
            _this.currentLatitude = position.coords.latitude;
            _this.currentLongitude = position.coords.longitude;
            $('#map').css("min-height", "400px");
            google.maps.event.trigger(_this.map, "resize");
            _this.map.setCenter(new google.maps.LatLng(_this.currentLatitude, _this.currentLongitude, true));
            if (_this.locationMarker == null)
                _this.locationMarker = new GeolocationMarker(_this.map);
            $(window).scrollTop(jQuery("#map").position().top);
            _this.search();
            Main.loadCompleted();
        };
        /**
         *
         * Initializes the map
         */
        this.initMap = function () {
            _this.map = new google.maps.Map(document.getElementById('map'), {
                center: new google.maps.LatLng(_this.currentLatitude, _this.currentLongitude),
                zoom: 14
            });
            // ReSharper disable once TsNotResolved
            //        console.log("TIMETAKEN: ");
            //        console.log(Window.stopTimer());
            console.log("map ready");
            _this.map.addListener('dragend', function () { return _this.search(); });
            _this.map.addListener('zoom_changed', function () { return _this.search(); });
            var spinnerBackground = $(".spinner");
            spinnerBackground.css("display", "none");
        };
        this.search = function () {
            var searchObject = {
                SWLat: _this.map.getBounds().getSouthWest().lat(),
                SWLong: _this.map.getBounds().getSouthWest().lng(),
                NELat: _this.map.getBounds().getNorthEast().lat(),
                NELong: _this.map.getBounds().getNorthEast().lng()
            };
            $.ajax({
                url: '/restroom/search',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(searchObject),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    // get the result and do some magic with it
                    _this.updateMarkers(data);
                }
            });
        };
        this.updateMarkers = function (restrooms) {
            restrooms.forEach(function (restroom) {
                if (_this.markers["" + restroom.coordX + "," + restroom.coordY] == undefined) {
                    var toiletMarker = new google.maps.Marker({
                        position: new google.maps.LatLng(restroom.coordX, restroom.coordY),
                        map: _this.map,
                        icon: _this.markerImg,
                        animation: google.maps.Animation.DROP,
                        title: restroom.address
                    });
                    toiletMarker.addListener('click', function () { return _this.toggleBounce(toiletMarker); });
                    _this.markers["" + restroom.coordX + "," + restroom.coordY] = toiletMarker;
                }
            });
        };
        this.markerImg = Main.getBaseDir() + "Content/img/toilet.png";
        console.log(this.markerImg);
        this.markers = [];
        this.initMap();
    }
    HomePage.prototype.locationDeclined = function (error) {
        Main.loadCompleted();
        if (error.code === error.PERMISSION_DENIED) {
            console.log("Location permission denied");
        }
        else {
            console.log("unkown error occured when getting location ERRORCODE: " + error.code + " ERRORMESSAGE: " + error.message);
        }
    };
    HomePage.prototype.toggleBounce = function (marker) {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        }
        else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    };
    return HomePage;
})();
//# sourceMappingURL=HomePage.js.map