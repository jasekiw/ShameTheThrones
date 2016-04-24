define(["require", "exports", "../restroom/RestroomInfoBuilder", "../Main", "../restroom/RestroomIcon", "../restroom/RestroomMarker"], function (require, exports, RestroomInfoBuilder_1, Main_1, RestroomIcon_1, RestroomMarker_1) {
    "use strict";
    var Map = (function () {
        function Map(selector) {
            var _this = this;
            this.currentLatitude = 38; // default values to give a map a location to preload
            this.currentLongitude = -85;
            this.showLocationMarker = false;
            this.currentPositionMarkerForNewRestroom = null;
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
            this.container.css("display", "none");
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
            if (this.currentPositionMarkerForNewRestroom == null)
                this.currentPositionMarkerForNewRestroom = new google.maps.Marker({
                    position: new google.maps.LatLng(this.currentLatitude, this.currentLongitude),
                    map: this.map,
                    draggable: true,
                    animation: google.maps.Animation.DROP
                });
        };
        Map.prototype.setCurrentMarkerPosition = function (lat, lng) {
            this.currentPositionMarkerForNewRestroom.setPosition({ lat: lat, lng: lng });
        };
        Map.prototype.getCurrentMarker = function () {
            return this.currentPositionMarkerForNewRestroom;
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
                    var content = contentBuilder.getContent();
                    var infowindow = new google.maps.InfoWindow({
                        content: content
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
    }());
    exports.Map = Map;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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WUFDTCxDQUFDLENBQUMsQ0FBQztRQUVQLENBQUM7UUFDTCxVQUFDO0lBQUQsQ0E3TkEsQUE2TkMsSUFBQTtJQTdOWSxXQUFHLE1BNk5mLENBQUEiLCJmaWxlIjoiZ29vZ2xlL01hcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQge1Jlc3Ryb29tUmVzcG9uc2V9IGZyb20gXCIuLi9yZXN0cm9vbS9SZXN0cm9vbVJlc3BvbnNlXCI7XHJcbmltcG9ydCB7TWFya2VyQ29sbGVjdGlvbn0gZnJvbSBcIi4vTWFya2VyQ29sbGVjdGlvblwiO1xyXG5pbXBvcnQge1Jlc3Ryb29tSW5mb0J1aWxkZXJ9IGZyb20gXCIuLi9yZXN0cm9vbS9SZXN0cm9vbUluZm9CdWlsZGVyXCI7XHJcbmltcG9ydCB7UmVzdHJvb21TZWFyY2hPYmplY3R9IGZyb20gXCIuLi9yZXN0cm9vbS9SZXN0cm9vbVNlYXJjaE9iamVjdFwiO1xyXG5pbXBvcnQge01haW59IGZyb20gXCIuLi9NYWluXCI7XHJcbmltcG9ydCB7UmVzdHJvb21JY29ufSBmcm9tIFwiLi4vcmVzdHJvb20vUmVzdHJvb21JY29uXCI7XHJcbmltcG9ydCB7UmVzdHJvb21NYXJrZXJ9IGZyb20gXCIuLi9yZXN0cm9vbS9SZXN0cm9vbU1hcmtlclwiO1xyXG5pbXBvcnQgbWFwcyA9IGdvb2dsZS5tYXBzO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBNYXAge1xyXG4gICAgcHVibGljIG1hcDogbWFwcy5NYXA7XHJcbiAgICBwdWJsaWMgY3VycmVudExhdGl0dWRlOiBudW1iZXIgPSAzODsgLy8gZGVmYXVsdCB2YWx1ZXMgdG8gZ2l2ZSBhIG1hcCBhIGxvY2F0aW9uIHRvIHByZWxvYWRcclxuICAgIHB1YmxpYyBjdXJyZW50TG9uZ2l0dWRlOiBudW1iZXIgPSAtODU7XHJcbiAgICBwcml2YXRlIG1hcmtlcnM6IE1hcmtlckNvbGxlY3Rpb247XHJcbiAgICBwcml2YXRlIGxvY2F0aW9uTWFya2VyOiBHZW9sb2NhdGlvbk1hcmtlcjtcclxuICAgIHByaXZhdGUgZ2VvY29kZXI6IG1hcHMuR2VvY29kZXI7XHJcbiAgICBwcml2YXRlIGNvbnRhaW5lcjogSlF1ZXJ5O1xyXG4gICAgcHJpdmF0ZSBtYXBFbGVtZW50OiBKUXVlcnk7XHJcbiAgICBwcml2YXRlIHNob3dMb2NhdGlvbk1hcmtlciA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBjdXJyZW50UG9zaXRpb25NYXJrZXJGb3JOZXdSZXN0cm9vbTogZ29vZ2xlLm1hcHMuTWFya2VyID0gbnVsbDtcclxuICAgXHJcbiAgICBjb25zdHJ1Y3RvcihzZWxlY3Rvcjogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSAkKHNlbGVjdG9yKTtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcclxuICAgICAgICB0aGlzLm1hcEVsZW1lbnQgPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLm1hcFwiKTtcclxuICAgICAgICB0aGlzLm1hcmtlcnMgPSB7fTtcclxuICAgICAgICB0aGlzLmdlb2NvZGVyID0gbmV3IGdvb2dsZS5tYXBzLkdlb2NvZGVyKCk7XHJcbiAgICAgICAgdGhpcy5pbml0TWFwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICogR2V0cyB0aGUgbG9jYXRpb24gb2YgdGhlIHVzZXIgYW5kIGluaXRpYWxpemVzIHRoZSBtYXBcclxuICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuY3Rpb25XaGVuQ29tcGxldGUgT3B0aW9uYWwgZnVuY3Rpb24gdG8gcGFzcyB0byBrbm93IHdoZW4gaXQgY29tcGxldGVkXHJcbiAgICAqXHJcbiAgICAqL1xyXG4gICAgcHVibGljIGdldExvY2F0aW9uID0gKGZ1bmN0aW9uV2hlbkNvbXBsZXRlIDogKCkgPT4gdm9pZCA9IHVuZGVmaW5lZCwgc2hvd0xvY2F0aW9uTWFya2VyIDogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCA9PiB7XHJcbiAgICAgICAgTWFpbi5zaG93TG9hZGVyKCk7XHJcbiAgICAgICAgdGhpcy5zaG93TG9jYXRpb25NYXJrZXIgPSBzaG93TG9jYXRpb25NYXJrZXI7XHJcbiAgICAgICAgaWYgKG5hdmlnYXRvci5nZW9sb2NhdGlvbikge1xyXG4gICAgICAgICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKChwb3NpdGlvbikgPT4gdGhpcy5zaG93UG9zaXRpb24ocG9zaXRpb24sIGZ1bmN0aW9uV2hlbkNvbXBsZXRlKSwgKGVycm9yKSA9PiB0aGlzLmxvY2F0aW9uRGVjbGluZWQoZXJyb3IsIGZ1bmN0aW9uV2hlbkNvbXBsZXRlKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHZW9sb2NhdGlvbiBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoaXMgYnJvd3Nlci5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGVuIHRoZSB1c2VyIHNoYXJlcyB0aGVpciBsb2NhdGlvbiB3ZSB3aWxsIHNob3cgdGhlIHBvc2l0aW9uIGFuZCBsb2FkIHRoZSBtYXBcclxuICAgICAqIEBwYXJhbSBwb3NpdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2hvd1Bvc2l0aW9uKHBvc2l0aW9uOiBQb3NpdGlvbiwgZnVuY3Rpb25XaGVuQ29tcGxldGUgOiAoKSA9PiB2b2lkID0gdW5kZWZpbmVkKTogdm9pZCB7XHJcblxyXG4gICAgICAgIHRoaXMuY3VycmVudExhdGl0dWRlID0gcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlO1xyXG4gICAgICAgIHRoaXMuY3VycmVudExvbmdpdHVkZSA9IHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmxvY2F0aW9uTWFya2VyID09IG51bGwgJiYgdGhpcy5zaG93TG9jYXRpb25NYXJrZXIpXHJcbiAgICAgICAgICAgIHRoaXMubG9jYXRpb25NYXJrZXIgPSBuZXcgR2VvbG9jYXRpb25NYXJrZXIodGhpcy5tYXApO1xyXG4gICAgICAgIHRoaXMuc2hvd01hcCgpO1xyXG4gICAgICAgIHRoaXMubWFwLnNldFpvb20oMTQpO1xyXG4gICAgICAgIHRoaXMubWFwLnNldENlbnRlcihuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKHRoaXMuY3VycmVudExhdGl0dWRlLCB0aGlzLmN1cnJlbnRMb25naXR1ZGUsIHRydWUpKTtcclxuXHJcblxyXG4gICAgICAgXHJcbiAgICAgICAgdGhpcy5zZWFyY2goKTtcclxuICAgICAgICBNYWluLmxvYWRDb21wbGV0ZWQoKTtcclxuICAgICAgICBpZiAoZnVuY3Rpb25XaGVuQ29tcGxldGUgIT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICBmdW5jdGlvbldoZW5Db21wbGV0ZSgpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBTY3JvbGxzIHRoZSBwYWdlIHRvIHRoZSBtYXBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNjcm9sbFRvTWFwKCkge1xyXG4gICAgICAgICQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IHRoaXMubWFwRWxlbWVudC5wb3NpdGlvbigpLnRvcCB9LCAxMDAwKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBpcyB0aGUgZnVuY2l0b24gdGhhdCBoYW5kbGVzIHdoYXQgaGFwcGVucyB3aGVuIHRoZSB1c2VyIGRlY2xpbmVzIHBvc2l0aW9uXHJcbiAgICAgKiBAcGFyYW0gZXJyb3IgVGhlIGVycm9yIHRoYXQgaXMgZ2l2ZW4gd2hlbiB0aGUgdXNlciBkZWNsaW5lcyBnaXZpbmcgdGhlaXIgcG9zaXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvY2F0aW9uRGVjbGluZWQoZXJyb3I6IFBvc2l0aW9uRXJyb3IsIGZ1bmN0aW9uV2hlbkNvbXBsZXRlIDogKCkgPT4gdm9pZCA9IHVuZGVmaW5lZCk6IHZvaWQge1xyXG4gICAgICAgIE1haW4ubG9hZENvbXBsZXRlZCgpO1xyXG4gICAgICAgIGlmIChlcnJvci5jb2RlID09PSBlcnJvci5QRVJNSVNTSU9OX0RFTklFRCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxvY2F0aW9uIHBlcm1pc3Npb24gZGVuaWVkXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidW5rb3duIGVycm9yIG9jY3VyZWQgd2hlbiBnZXR0aW5nIGxvY2F0aW9uIEVSUk9SQ09ERTogXCIgKyBlcnJvci5jb2RlICsgXCIgRVJST1JNRVNTQUdFOiBcIiArIGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZnVuY3Rpb25XaGVuQ29tcGxldGUgIT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICBmdW5jdGlvbldoZW5Db21wbGV0ZSgpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNob3dNYXAoKSA6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLnNob3coKTtcclxuICAgICAgICB0aGlzLm1hcEVsZW1lbnQuY3NzKFwibWluLWhlaWdodFwiLCBcIjQwMHB4XCIpO1xyXG4gICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIodGhpcy5tYXAsIFwicmVzaXplXCIpOyAvLyBhbGxvdyB0aGUgbWFwIHRvIHJlc2l6ZSB0byB0aGUgbmV3IGhlaWdodFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIG1hcCBmb3IgcXVpY2tlciB1c2UgbGF0ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGluaXRNYXAoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIHRoaXMubWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcCh0aGlzLm1hcEVsZW1lbnRbMF0sIHtcclxuICAgICAgICAgICAgY2VudGVyOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKHRoaXMuY3VycmVudExhdGl0dWRlLCB0aGlzLmN1cnJlbnRMb25naXR1ZGUpLFxyXG4gICAgICAgICAgICB6b29tOiAxNFxyXG4gICAgICAgIH0pO1xyXG4gICAgICBcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQWxsb3dzIHNlYXJjaCB0byBydW4gd2hlbiB0aGUgdXNlciBtb3ZlcyB0aGUgbWFwXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlbmFibGVBdXRvbWF0aWNTZWFyY2goKSA6IHZvaWR7XHJcbiAgICAgICAgdGhpcy5tYXAuYWRkTGlzdGVuZXIoJ2RyYWdlbmQnLCAoKSA9PiB0aGlzLnNlYXJjaCgpKTtcclxuICAgICAgICB0aGlzLm1hcC5hZGRMaXN0ZW5lcignem9vbV9jaGFuZ2VkJywgKCkgPT4gdGhpcy5zZWFyY2goKSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAgICAgKiBTZWFyY2hlcyB0aGUgZGF0YWJhc2UgZm9yIHJlc3Ryb29tcyBpbiB0aGUgbWFwJ3MgYm9yZGVyXHJcbiAgICAgICAgICovXHJcbiAgICBwdWJsaWMgc2VhcmNoKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIHRoZSBzZWFyY2ggb2JqZWN0IHRvIHBvc3QgdG8gdGhlIHNlcnZlclxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2VhcmNoaW5nLi4uXCIpO1xyXG4gICAgICAgIHZhciBzZWFyY2hPYmplY3Q6IFJlc3Ryb29tU2VhcmNoT2JqZWN0ID0ge1xyXG4gICAgICAgICAgICBTV0xhdDogdGhpcy5tYXAuZ2V0Qm91bmRzKCkuZ2V0U291dGhXZXN0KCkubGF0KCksXHJcbiAgICAgICAgICAgIFNXTG9uZzogdGhpcy5tYXAuZ2V0Qm91bmRzKCkuZ2V0U291dGhXZXN0KCkubG5nKCksXHJcbiAgICAgICAgICAgIE5FTGF0OiB0aGlzLm1hcC5nZXRCb3VuZHMoKS5nZXROb3J0aEVhc3QoKS5sYXQoKSxcclxuICAgICAgICAgICAgTkVMb25nOiB0aGlzLm1hcC5nZXRCb3VuZHMoKS5nZXROb3J0aEVhc3QoKS5sbmcoKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJC5hamF4KHsgLy8gcGVyZm9ybSBzZWFyY2ggb24gdGhlIGRhdGFiYXNlIGFuZCB1cGRhdGUgbWFwXHJcbiAgICAgICAgICAgIHVybDogJy9yZXN0cm9vbS9zZWFyY2gnLFxyXG4gICAgICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHNlYXJjaE9iamVjdCksXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhOiBSZXN0cm9vbVJlc3BvbnNlW10pID0+IHRoaXMudXBkYXRlTWFya2VycyhkYXRhKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFkZE1hcmtlckZvckN1cnJlbnQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFBvc2l0aW9uTWFya2VyRm9yTmV3UmVzdHJvb20gPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UG9zaXRpb25NYXJrZXJGb3JOZXdSZXN0cm9vbSA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IG5ldyBnb29nbGUubWFwcy5MYXRMbmcodGhpcy5jdXJyZW50TGF0aXR1ZGUsIHRoaXMuY3VycmVudExvbmdpdHVkZSksXHJcbiAgICAgICAgICAgICAgICBtYXA6IHRoaXMubWFwLFxyXG4gICAgICAgICAgICAgICAgZHJhZ2dhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiBnb29nbGUubWFwcy5BbmltYXRpb24uRFJPUFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgIFxyXG4gICAgfVxyXG4gICAgcHVibGljIHNldEN1cnJlbnRNYXJrZXJQb3NpdGlvbihsYXQ6IG51bWJlciwgbG5nOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQb3NpdGlvbk1hcmtlckZvck5ld1Jlc3Ryb29tLnNldFBvc2l0aW9uKCB7IGxhdDogbGF0LCBsbmc6IGxuZyB9ICk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXRDdXJyZW50TWFya2VyKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRQb3NpdGlvbk1hcmtlckZvck5ld1Jlc3Ryb29tO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBtYXAgd2l0aCByZXN0cm9vbXMgdGhhdCB3ZXJlIHJldHVybmVkIGZyb20gdGhlIHNlYXJjaC4gXHJcbiAgICAgKiBAcGFyYW0gcmVzdHJvb21zIFRoZSByZXN0cm9vbXMgcmV0dXJuZWQgZnJvbSB0aGUgc2VhcmNoIHJlc3VsdHNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVwZGF0ZU1hcmtlcnMocmVzdHJvb21zOiBSZXN0cm9vbVJlc3BvbnNlW10pOiB2b2lkIHtcclxuXHJcbiAgICAgICAgcmVzdHJvb21zLmZvckVhY2goKHJlc3Ryb29tOiBSZXN0cm9vbVJlc3BvbnNlKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5nZXRNYXJrZXIocmVzdHJvb20uY29vcmRYLCByZXN0cm9vbS5jb29yZFkpID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3Ryb29tSWNvbiA9IG5ldyBSZXN0cm9vbUljb24oKTtcclxuICAgICAgICAgICAgICAgIHZhciBtYXJrZXJJbWdVcmwgPSByZXN0cm9vbUljb24uZ2V0SWNvbihyZXN0cm9vbS5yYXRpbmcsIHJlc3Ryb29tLmdlbmRlciwgcmVzdHJvb20ucmF0ZWQpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbnRlbnRCdWlsZGVyOiBSZXN0cm9vbUluZm9CdWlsZGVyID0gbmV3IFJlc3Ryb29tSW5mb0J1aWxkZXIocmVzdHJvb20pO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSBjb250ZW50QnVpbGRlci5nZXRDb250ZW50KCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5mb3dpbmRvdyA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBjb250ZW50XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdG9pbGV0TWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IG5ldyBnb29nbGUubWFwcy5MYXRMbmcocmVzdHJvb20uY29vcmRYLCByZXN0cm9vbS5jb29yZFkpLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcDogdGhpcy5tYXAsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogbWFya2VySW1nVXJsLFxyXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogZ29vZ2xlLm1hcHMuQW5pbWF0aW9uLkRST1AsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHJlc3Ryb29tLmFkZHJlc3NcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3Ryb29tTWFya2VyOiBSZXN0cm9vbU1hcmtlciA9IG5ldyBSZXN0cm9vbU1hcmtlcih0b2lsZXRNYXJrZXIsIHJlc3Ryb29tLCBpbmZvd2luZG93KTtcclxuICAgICAgICAgICAgICAgIHRvaWxldE1hcmtlci5hZGRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiByZXN0cm9vbU1hcmtlci5pbmZvV2luZG93Lm9wZW4odGhpcy5tYXAsIHJlc3Ryb29tTWFya2VyLm1hcmtlcikpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNYXJrZXIocmVzdHJvb21NYXJrZXIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIGEgUmVzdHJvb21NYXJrZXIgYXQgdGhlIGNvcnJlY3QgcG9zaXRpb25cclxuICAgICAqIEBwYXJhbSBtYXJrZXIgVGhlIHJlc3Ryb29tIG1hcmtlciB0byBzZXRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRNYXJrZXIobWFya2VyOiBSZXN0cm9vbU1hcmtlcikge1xyXG4gICAgICAgIHRoaXMubWFya2Vyc1tcIlwiICsgbWFya2VyLnJlc3Ryb29tLmNvb3JkWCArIFwiLFwiICsgbWFya2VyLnJlc3Ryb29tLmNvb3JkWV0gPSBtYXJrZXI7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEdldHMgYSBjYWNoZWQgbWFya2VyXHJcbiAgICAgKiBAcGFyYW0gbGF0IHRoZSBsYXRpdHVkZSBvZiB0aGUgbWFya2VyIHRvIGdldFxyXG4gICAgICogQHBhcmFtIGxuZyB0aGUgbG9uZ2l0dWRlIG9mIHRoZSBtYXJrZXIgdG8gZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0TWFya2VyKGxhdDogbnVtYmVyLCBsbmc6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1hcmtlcnNbXCJcIiArIGxhdCArIFwiLFwiICsgbG5nXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlYXJjaGVzIGJ5IGFuIGFkZHJlc3Mgb3IgemlwIGNvZGUgYW5kIG1vdmVzIHRoZSBtYXAgdG8gdGhhdCBsb2NhdGlvblxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHppcGNvZGVcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHdoZW5Db21wbGV0ZSBkZWZhdWx0IGlzIG51bGxcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZG9TZWFyY2ggZGVmYXVsdCBpcyB0cnVlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gem9vbSBkZWZhdWx0IGlzIDE1XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZWFyY2haaXAoemlwY29kZSA6IHN0cmluZywgd2hlbkNvbXBsZXRlIDogKCkgPT4gdm9pZCA9IG51bGwsIGRvU2VhcmNoID0gdHJ1ZSwgem9vbSA6IG51bWJlciA9IDE1KSA6IHZvaWQge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZ2VvY29kZXIuZ2VvY29kZSh7IGFkZHJlc3M6IHppcGNvZGUgfSwgKHJlc3VsdHM6IG1hcHMuR2VvY29kZXJSZXN1bHRbXSwgc3RhdHVzKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHRzICYmIHJlc3VsdHNbMF0pIHtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TGF0aXR1ZGUgPSByZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uLmxhdCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TG9uZ2l0dWRlID0gcmVzdWx0c1swXS5nZW9tZXRyeS5sb2NhdGlvbi5sbmcoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd01hcCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXAuc2V0Q2VudGVyKG5ldyBnb29nbGUubWFwcy5MYXRMbmcodGhpcy5jdXJyZW50TGF0aXR1ZGUsIHRoaXMuY3VycmVudExvbmdpdHVkZSwgdHJ1ZSkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdHNbMF0udHlwZXNbMF0gIT09IG51bGwgJiYgcmVzdWx0c1swXS50eXBlc1swXSA9PSBcInBvc3RhbF9jb2RlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXAuZml0Qm91bmRzKHJlc3VsdHNbMF0uZ2VvbWV0cnkuYm91bmRzKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJlc3VsdHNbMF0udHlwZXNbMF0gJiYgcmVzdWx0c1swXS50eXBlc1swXSA9PSBcInN0cmVldF9hZGRyZXNzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXAuc2V0Wm9vbSh6b29tKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcC5zZXRab29tKDEyKTtcclxuICAgICAgICAgICAgICAgIGlmICh3aGVuQ29tcGxldGUgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB3aGVuQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgIGlmIChkb1NlYXJjaClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJubyByZXN1bHRzIGZvdW5kXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG59Il19
