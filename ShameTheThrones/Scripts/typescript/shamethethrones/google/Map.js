define(["require", "exports", "../restroom/RestroomInfoBuilder", "../Main", "../restroom/RestroomIcon", "../restroom/RestroomMarker"], function (require, exports, RestroomInfoBuilder_1, Main_1, RestroomIcon_1, RestroomMarker_1) {
    var Map = (function () {
        function Map(selector) {
            var _this = this;
            this.currentLatitude = 38; // default values to give a map a location to preload
            this.currentLongitude = -85;
            this.showLocationMarker = false;
            /**
            * Gets the location of the user and initializes the map
            * @param {Function} functionWhenComplete Optional function to pass to know when it completed
            *
            */
            this.getLocation = function (functionWhenComplete, showLocationMarker) {
                if (functionWhenComplete === void 0) { functionWhenComplete = undefined; }
                if (showLocationMarker === void 0) { showLocationMarker = false; }
                Main_1.Main.showLoader();
                _this.showLocationMarker = showLocationMarker;
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) { return _this.showPosition(position, functionWhenComplete); }, function (error) { return _this.locationDeclined(error, functionWhenComplete); });
                }
                else {
                    console.log("Geolocation is not supported by this browser.");
                }
            };
            this.container = $(selector);
            this.mapElement = this.container.find(".map");
            this.markers = {};
            this.geocoder = new google.maps.Geocoder();
            this.initMap();
        }
        /**
         * When the user shares their location we will show the position and load the map
         * @param position
         */
        Map.prototype.showPosition = function (position, functionWhenComplete) {
            if (functionWhenComplete === void 0) { functionWhenComplete = undefined; }
            this.currentLatitude = position.coords.latitude;
            this.currentLongitude = position.coords.longitude;
            if (this.locationMarker == null && this.showLocationMarker)
                this.locationMarker = new GeolocationMarker(this.map);
            this.showMap();
            this.map.setZoom(14);
            this.map.setCenter(new google.maps.LatLng(this.currentLatitude, this.currentLongitude, true));
            this.search();
            Main_1.Main.loadCompleted();
            if (functionWhenComplete != undefined)
                functionWhenComplete();
        };
        /**
         * Scrolls the page to the map
         */
        Map.prototype.scrollToMap = function () {
            $("html, body").animate({ scrollTop: this.mapElement.position().top }, 1000);
        };
        /**
         * This is the funciton that handles what happens when the user declines position
         * @param error The error that is given when the user declines giving their position
         */
        Map.prototype.locationDeclined = function (error, functionWhenComplete) {
            if (functionWhenComplete === void 0) { functionWhenComplete = undefined; }
            Main_1.Main.loadCompleted();
            if (error.code === error.PERMISSION_DENIED) {
                console.log("Location permission denied");
            }
            else {
                console.log("unkown error occured when getting location ERRORCODE: " + error.code + " ERRORMESSAGE: " + error.message);
            }
            if (functionWhenComplete != undefined)
                functionWhenComplete();
        };
        Map.prototype.showMap = function () {
            this.container.show();
            this.mapElement.css("min-height", "400px");
            google.maps.event.trigger(this.map, "resize"); // allow the map to resize to the new height
        };
        /**
         * Initializes the map for quicker use later
         */
        Map.prototype.initMap = function () {
            this.map = new google.maps.Map(this.mapElement[0], {
                center: new google.maps.LatLng(this.currentLatitude, this.currentLongitude),
                zoom: 14
            });
            console.log("map ready");
        };
        /**
         * Allows search to run when the user moves the map
         */
        Map.prototype.enableAutomaticSearch = function () {
            var _this = this;
            this.map.addListener('dragend', function () { return _this.search(); });
            this.map.addListener('zoom_changed', function () { return _this.search(); });
        };
        /**
             * Searches the database for restrooms in the map's border
             */
        Map.prototype.search = function () {
            var _this = this;
            // the search object to post to the server
            console.log("searching...");
            var searchObject = {
                SWLat: this.map.getBounds().getSouthWest().lat(),
                SWLong: this.map.getBounds().getSouthWest().lng(),
                NELat: this.map.getBounds().getNorthEast().lat(),
                NELong: this.map.getBounds().getNorthEast().lng()
            };
            $.ajax({
                url: '/restroom/search',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(searchObject),
                contentType: 'application/json; charset=utf-8',
                success: function (data) { return _this.updateMarkers(data); }
            });
        };
        Map.prototype.addMarkerForCurrent = function () {
        };
        /**
         * Updates the map with restrooms that were returned from the search.
         * @param restrooms The restrooms returned from the search results
         */
        Map.prototype.updateMarkers = function (restrooms) {
            var _this = this;
            restrooms.forEach(function (restroom) {
                if (_this.getMarker(restroom.coordX, restroom.coordY) == undefined) {
                    var restroomIcon = new RestroomIcon_1.RestroomIcon();
                    var markerImgUrl = restroomIcon.getIcon(restroom.rating, restroom.gender, restroom.rated);
                    var contentBuilder = new RestroomInfoBuilder_1.RestroomInfoBuilder(restroom);
                    var infowindow = new google.maps.InfoWindow({
                        content: contentBuilder.getContent()
                    });
                    var toiletMarker = new google.maps.Marker({
                        position: new google.maps.LatLng(restroom.coordX, restroom.coordY),
                        map: _this.map,
                        icon: markerImgUrl,
                        animation: google.maps.Animation.DROP,
                        title: restroom.address
                    });
                    var restroomMarker = new RestroomMarker_1.RestroomMarker(toiletMarker, restroom, infowindow);
                    toiletMarker.addListener('click', function () { return restroomMarker.infoWindow.open(_this.map, restroomMarker.marker); });
                    _this.setMarker(restroomMarker);
                }
            });
        };
        /**
         * Sets a RestroomMarker at the correct position
         * @param marker The restroom marker to set
         */
        Map.prototype.setMarker = function (marker) {
            this.markers["" + marker.restroom.coordX + "," + marker.restroom.coordY] = marker;
        };
        /**
         * Gets a cached marker
         * @param lat the latitude of the marker to get
         * @param lng the longitude of the marker to get
         */
        Map.prototype.getMarker = function (lat, lng) {
            return this.markers["" + lat + "," + lng];
        };
        /**
         * Searches by an address or zip code and moves the map to that location
         * @param {number} zipcode
         * @param {Function} whenComplete default is null
         * @param {boolean} doSearch default is true
         * @param {number} zoom default is 15
         */
        Map.prototype.searchZip = function (zipcode, whenComplete, doSearch, zoom) {
            var _this = this;
            if (whenComplete === void 0) { whenComplete = null; }
            if (doSearch === void 0) { doSearch = true; }
            if (zoom === void 0) { zoom = 15; }
            this.geocoder.geocode({ address: zipcode }, function (results, status) {
                if (results && results[0]) {
                    _this.currentLatitude = results[0].geometry.location.lat();
                    _this.currentLongitude = results[0].geometry.location.lng();
                    _this.showMap();
                    _this.map.setCenter(new google.maps.LatLng(_this.currentLatitude, _this.currentLongitude, true));
                    if (results[0].types[0] !== null && results[0].types[0] == "postal_code")
                        _this.map.fitBounds(results[0].geometry.bounds);
                    else if (results[0].types[0] && results[0].types[0] == "street_address")
                        _this.map.setZoom(zoom);
                    else
                        _this.map.setZoom(12);
                    if (whenComplete != null)
                        whenComplete();
                    if (doSearch)
                        _this.search();
                }
                else {
                    console.log("no results found");
                }
            });
        };
        return Map;
    })();
    exports.Map = Map;
});
//# sourceMappingURL=Map.js.map