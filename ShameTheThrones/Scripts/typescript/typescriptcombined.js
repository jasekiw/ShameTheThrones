var shamethethrones;
(function (shamethethrones) {
    var restroom;
    (function (restroom_1) {
        var RestroomInfoBuilder = (function () {
            function RestroomInfoBuilder(restroom) {
                this.restroom = restroom;
            }
            RestroomInfoBuilder.prototype.getContent = function () {
                var genderName = "";
                if (this.restroom.gender == 0)
                    genderName = "Mens";
                else if (this.restroom.gender == 1)
                    genderName = "Womens";
                else if (this.restroom.gender == 2)
                    genderName = "Both";
                var ratingText = "";
                if (this.restroom.rated)
                    ratingText = this.restroom.rating.toString();
                else
                    ratingText = "Not Yet Rated";
                var header = "<h3>" + this.restroom.address + "</h3>";
                var description = "<p><strong>Description:</strong> " + this.restroom.description + "</p>";
                var gender = "<p><strong>Gender:</strong> " + genderName + "</p>";
                var rating = "<p><strong>rating:</strong> " + ratingText + "</p>";
                var rateButton = "<div class=\"ratebutton_container\"><a class=\"btn btn-primary\" href=\"" + shamethethrones.Main.getBaseDir() + "restroom/rate/" + this.restroom.id + "\">Rate</a></div>";
                return header + description + gender + rating + rateButton;
            };
            return RestroomInfoBuilder;
        }());
        restroom_1.RestroomInfoBuilder = RestroomInfoBuilder;
    })(restroom = shamethethrones.restroom || (shamethethrones.restroom = {}));
})(shamethethrones || (shamethethrones = {}));
var shamethethrones;
(function (shamethethrones) {
    var restroom;
    (function (restroom) {
        var RestroomIcon = (function () {
            function RestroomIcon() {
            }
            RestroomIcon.prototype.getIcon = function (rating, gender, rated) {
                var baseDir = shamethethrones.Main.getBaseDir();
                var baseIconUrl = baseDir + "Content/img/restroom-markers/";
                switch (gender) {
                    case 0:
                        baseIconUrl += "men/";
                        break;
                    case 1:
                        baseIconUrl += "women/";
                        break;
                    case 2:
                        baseIconUrl += "unisex/";
                        break;
                    default:
                        baseIconUrl += "men/";
                        break;
                }
                if (!rated) {
                    baseIconUrl += "gray.png";
                    return baseIconUrl;
                }
                if (rating < 1)
                    baseIconUrl += "red.png";
                else if (rating < 2)
                    baseIconUrl += "purple.png";
                else if (rating < 3)
                    baseIconUrl += "blue.png";
                else if (rating < 4)
                    baseIconUrl += "green.png";
                else if (rating <= 5)
                    baseIconUrl += "yellow.png";
                return baseIconUrl;
            };
            return RestroomIcon;
        }());
        restroom.RestroomIcon = RestroomIcon;
    })(restroom = shamethethrones.restroom || (shamethethrones.restroom = {}));
})(shamethethrones || (shamethethrones = {}));
var shamethethrones;
(function (shamethethrones) {
    var restroom;
    (function (restroom_2) {
        var RestroomMarker = (function () {
            function RestroomMarker(marker, restroom, infoWindow) {
                this.marker = marker;
                this.restroom = restroom;
                this.infoWindow = infoWindow;
            }
            return RestroomMarker;
        }());
        restroom_2.RestroomMarker = RestroomMarker;
    })(restroom = shamethethrones.restroom || (shamethethrones.restroom = {}));
})(shamethethrones || (shamethethrones = {}));
///<reference path="../restroom/RestroomInfoBuilder.ts"/>
///<reference path="../google/MarkerCollection.ts"/>
///<reference path="../restroom/RestroomIcon.ts"/>
///<reference path="../restroom/RestroomMarker.ts"/>
var shamethethrones;
(function (shamethethrones) {
    var home;
    (function (home) {
        var RestroomInfoBuilder = shamethethrones.restroom.RestroomInfoBuilder;
        var RestroomMarker = shamethethrones.restroom.RestroomMarker;
        var RestroomIcon = shamethethrones.restroom.RestroomIcon;
        var HomePage = (function () {
            function HomePage() {
                var _this = this;
                this.currentLatitude = 38; // default values to give a map a location to preload
                this.currentLongitude = -85;
                /**
                 * Gets the location of the user and initializes the map
                 */
                this.getLocation = function () {
                    shamethethrones.Main.showLoader();
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function (position) { return _this.showPosition(position); }, function (error) { return _this.locationDeclined(error); });
                    }
                    else {
                        console.log("Geolocation is not supported by this browser.");
                    }
                };
                this.markers = {};
                this.initMap();
                this.geocoder = new google.maps.Geocoder();
                $(".zip-code-search").on("keyup", function (e) {
                    if ($(e.target).val().length > 3)
                        _this.searchZip();
                });
            }
            /**
             * When the user shares their location we will show the position and load the map
             * @param position
             */
            HomePage.prototype.showPosition = function (position) {
                this.currentLatitude = position.coords.latitude;
                this.currentLongitude = position.coords.longitude;
                if (this.locationMarker == null)
                    this.locationMarker = new GeolocationMarker(this.map);
                $(".map_container").show();
                $('#map').css("min-height", "400px");
                google.maps.event.trigger(this.map, "resize"); // allow the map to resize to the new height
                this.map.setZoom(14);
                this.map.setCenter(new google.maps.LatLng(this.currentLatitude, this.currentLongitude, true));
                $(window).scrollTop(jQuery("#map").position().top);
                this.search();
                shamethethrones.Main.loadCompleted();
            };
            /**
             * This is the funciton that handles what happens when the user declines position
             * @param error The error that is given when the user declines giving their position
             */
            HomePage.prototype.locationDeclined = function (error) {
                shamethethrones.Main.loadCompleted();
                if (error.code === error.PERMISSION_DENIED) {
                    console.log("Location permission denied");
                }
                else {
                    console.log("unkown error occured when getting location ERRORCODE: " + error.code + " ERRORMESSAGE: " + error.message);
                }
            };
            /**
             * Initializes the map for quicker use later
             */
            HomePage.prototype.initMap = function () {
                var _this = this;
                this.map = new google.maps.Map(document.getElementById('map'), {
                    center: new google.maps.LatLng(this.currentLatitude, this.currentLongitude),
                    zoom: 14
                });
                console.log("map ready");
                this.map.addListener('dragend', function () { return _this.search(); });
                this.map.addListener('zoom_changed', function () { return _this.search(); });
                $(".spinner").css("display", "none");
            };
            /**
             * Searches the database for restrooms in the map's border
             */
            HomePage.prototype.search = function () {
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
            /**
             * Updates the map with restrooms that were returned from the search.
             * @param restrooms The restrooms returned from the search results
             */
            HomePage.prototype.updateMarkers = function (restrooms) {
                var _this = this;
                restrooms.forEach(function (restroom) {
                    if (_this.getMarker(restroom.coordX, restroom.coordY) == undefined) {
                        var restroomIcon = new RestroomIcon();
                        var markerImgUrl = restroomIcon.getIcon(restroom.rating, restroom.gender, restroom.rated);
                        var contentBuilder = new RestroomInfoBuilder(restroom);
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
                        var restroomMarker = new RestroomMarker(toiletMarker, restroom, infowindow);
                        toiletMarker.addListener('click', function () { return restroomMarker.infoWindow.open(_this.map, restroomMarker.marker); });
                        _this.setMarker(restroomMarker);
                    }
                });
            };
            /**
             * Sets a RestroomMarker at the correct position
             * @param marker The restroom marker to set
             */
            HomePage.prototype.setMarker = function (marker) {
                this.markers["" + marker.restroom.coordX + "," + marker.restroom.coordY] = marker;
            };
            /**
             * Gets a cached marker
             * @param lat the latitude of the marker to get
             * @param lng the longitude of the marker to get
             */
            HomePage.prototype.getMarker = function (lat, lng) {
                return this.markers["" + lat + "," + lng];
            };
            HomePage.prototype.searchZip = function () {
                var _this = this;
                var zipcode = $(".zip-code-search").val();
                this.geocoder.geocode({ address: zipcode }, function (results, status) {
                    if (results && results[0]) {
                        _this.currentLatitude = results[0].geometry.location.lat();
                        _this.currentLongitude = results[0].geometry.location.lng();
                        $(".map_container").show();
                        $('#map').css("min-height", "400px");
                        google.maps.event.trigger(_this.map, "resize"); // allow the map to resize to the new height
                        _this.map.setCenter(new google.maps.LatLng(_this.currentLatitude, _this.currentLongitude, true));
                        if (results[0].types[0] !== null && results[0].types[0] == "postal_code")
                            _this.map.fitBounds(results[0].geometry.bounds);
                        else if (results[0].types[0] && results[0].types[0] == "street_address")
                            _this.map.setZoom(15);
                        else
                            _this.map.setZoom(12);
                        _this.search();
                    }
                    else {
                        console.log("no results found");
                    }
                });
            };
            return HomePage;
        }());
        home.HomePage = HomePage;
    })(home = shamethethrones.home || (shamethethrones.home = {}));
})(shamethethrones || (shamethethrones = {}));
var shamethethrones;
(function (shamethethrones) {
    var restroom;
    (function (restroom) {
        var AddRestroomPage = (function () {
            function AddRestroomPage() {
                var _this = this;
                this.getLocation = function () {
                    _this.geocoder = new google.maps.Geocoder();
                    if (navigator.geolocation) {
                        _this.geocoder = new google.maps.Geocoder();
                        navigator.geolocation.getCurrentPosition(_this.showPosition, _this.locationDeclined);
                    }
                    else {
                        console.log("Geolocation is not supported by this browser.");
                    }
                };
                this.showPosition = function (position) {
                    var location = { lat: position.coords.latitude, lng: position.coords.longitude };
                    _this.geocoder.geocode({ location: location }, function (results, status) {
                        if (results[0]) {
                            _this.addAddressToForm(results[0]);
                        }
                        else {
                            console.log("no results found");
                        }
                    });
                };
            }
            AddRestroomPage.prototype.locationDeclined = function () {
            };
            AddRestroomPage.prototype.addAddressToForm = function (address) {
                var isAddress = true;
                address.types.forEach(function (addressType) {
                    if (addressType == "locality")
                        isAddress = true;
                });
                if (isAddress) {
                    $("#Address").val(address.address_components[0].short_name + " " + address.address_components[1].short_name);
                    $("#City").val(address.address_components[2].short_name);
                    $("#State").val(address.address_components[5].short_name);
                    $("#ZipCode").val(address.address_components[7].short_name);
                }
                else
                    console.log("not an address");
            };
            return AddRestroomPage;
        }());
        restroom.AddRestroomPage = AddRestroomPage;
    })(restroom = shamethethrones.restroom || (shamethethrones.restroom = {}));
})(shamethethrones || (shamethethrones = {}));
///<reference path="home/HomePage.ts"/>
///<reference path="restroom/AddRestroomPage.ts"/>
var shamethethrones;
(function (shamethethrones) {
    var HomePage = shamethethrones.home.HomePage;
    var AddRestroomPage = shamethethrones.restroom.AddRestroomPage;
    var Main = (function () {
        function Main(waitUntilLoaded) {
            var _this = this;
            this.constructHomePage = function () {
                _this.homePage = new HomePage();
            };
            if (waitUntilLoaded == undefined)
                Main.loadCompleted();
            else if (!waitUntilLoaded)
                Main.loadCompleted();
        }
        Main.prototype.constructAddRestroomPage = function () {
            this.addRestroomPage = new AddRestroomPage();
        };
        Main.setBaseDir = function (basedir) {
            Main.basedir = basedir;
        };
        Main.getBaseDir = function () {
            return Main.basedir;
        };
        /**
         * Disabled the spinner to show that the page is loaded
         */
        Main.loadCompleted = function () {
            $(".spinner").css("dispay", "none");
        };
        Main.showLoader = function () {
            $(".spinner").css("dispay", "block");
        };
        return Main;
    }());
    shamethethrones.Main = Main;
})(shamethethrones || (shamethethrones = {}));
var shamethethrones;
(function (shamethethrones) {
    var restroom;
    (function (restroom) {
        var RestroomResponse = (function () {
            function RestroomResponse() {
            }
            return RestroomResponse;
        }());
        restroom.RestroomResponse = RestroomResponse;
    })(restroom = shamethethrones.restroom || (shamethethrones.restroom = {}));
})(shamethethrones || (shamethethrones = {}));
//# sourceMappingURL=typescriptcombined.js.map