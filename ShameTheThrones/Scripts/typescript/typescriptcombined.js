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
                console.log(this.restroom.rated);
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
///<reference path="../restroom/RestroomInfoBuilder.ts"/>
///<reference path="../google/MarkerCollection.ts"/>
var shamethethrones;
(function (shamethethrones) {
    var home;
    (function (home) {
        var RestroomInfoBuilder = shamethethrones.restroom.RestroomInfoBuilder;
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
                    shamethethrones.Main.showLoader();
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
                    google.maps.event.trigger(_this.map, "resize"); // allow the map to resize to the new height
                    _this.map.setCenter(new google.maps.LatLng(_this.currentLatitude, _this.currentLongitude, true));
                    if (_this.locationMarker == null)
                        _this.locationMarker = new GeolocationMarker(_this.map);
                    $(window).scrollTop(jQuery("#map").position().top);
                    _this.search();
                    shamethethrones.Main.loadCompleted();
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
                            var restroomIcon = new shamethethrones.restroom.RestroomIcon();
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
                            var restroomMarker = { marker: toiletMarker, restroom: restroom, infoWindow: infowindow };
                            toiletMarker.addListener('click', function () { return _this.markerClicked(restroomMarker); });
                            _this.markers["" + restroom.coordX + "," + restroom.coordY] = restroomMarker;
                        }
                    });
                };
                this.markerImg = shamethethrones.Main.getBaseDir() + "Content/img/toilet.png";
                this.markers = {};
                this.initMap();
            }
            HomePage.prototype.locationDeclined = function (error) {
                shamethethrones.Main.loadCompleted();
                if (error.code === error.PERMISSION_DENIED) {
                    console.log("Location permission denied");
                }
                else {
                    console.log("unkown error occured when getting location ERRORCODE: " + error.code + " ERRORMESSAGE: " + error.message);
                }
            };
            HomePage.prototype.markerClicked = function (marker) {
                marker.infoWindow.open(this.map, marker.marker);
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