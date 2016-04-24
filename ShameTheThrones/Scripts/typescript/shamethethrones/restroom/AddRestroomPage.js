define(["require", "exports", "../google/Map"], function (require, exports, Map_1) {
    "use strict";
    var maps = google.maps;
    var AddRestroomPage = (function () {
        function AddRestroomPage() {
            var _this = this;
            this.setAddressHandlerSet = false;
            this.showPosition = function (latitude, longitude, calledByMarker) {
                if (calledByMarker === void 0) { calledByMarker = false; }
                var location = { lat: latitude, lng: longitude };
                _this.geocoder.geocode({ location: location }, function (results) {
                    if (results[0]) {
                        _this.addAddressToForm(results[0], calledByMarker);
                    }
                    else {
                        console.log("no results found");
                    }
                });
            };
            this.geocoder = new maps.Geocoder();
            this.map = new Map_1.Map(".map_container");
            this.map.showMap();
            this.map.addMarkerForCurrent();
            this.map.getCurrentMarker()
                .addListener("dragend", function () {
                var position = _this.map.getCurrentMarker().getPosition();
                _this.setLocation(position.lat(), position.lng());
            });
            var infowindow = new google.maps.InfoWindow({
                content: "<div class=\"flexible-btn-container\"><a href=\"javascript:void(0);\" id=\"SetAddress\" class=\"btn btn-default\">Set address to this location</a></div>"
            });
            this.map.getCurrentMarker()
                .addListener("click", function () {
                infowindow.open(_this.map.map, _this.map.getCurrentMarker());
                if (!_this.setAddressHandlerSet) {
                    $("#SetAddress")
                        .click(function () {
                        var position = _this.map.getCurrentMarker().getPosition();
                        _this.showPosition(position.lat(), position.lng(), true);
                        _this.setLocation(position.lat(), position.lng());
                    });
                    _this.setAddressHandlerSet = true;
                }
            });
            this.form = $("#NewRestroom");
            $("#fillByLocation").click(function () { return _this.map.getLocation(function () {
                _this.showPosition(_this.map.currentLatitude, _this.map.currentLongitude);
                _this.map.setCurrentMarkerPosition(_this.map.currentLatitude, _this.map.currentLongitude);
                _this.setLocation(_this.map.currentLatitude, _this.map.currentLongitude);
            }); });
            $("#Address").keyup(function () { return _this.calculateAddress(); });
            $("#City").keyup(function () { return _this.calculateAddress(); });
            $("#State").keyup(function () { return _this.calculateAddress(); });
            $("#ZipCode").keyup(function () { return _this.calculateAddress(); });
        }
        /**
         *
         * Searches bathrooms by the address entered and also sets the location
         */
        AddRestroomPage.prototype.calculateAddress = function () {
            var _this = this;
            if ($("#Address").val().length > 3 && $("#City").val().length > 3 && $("#State").val().length >= 2 && $("#ZipCode").val().length > 3) {
                var address = $("#Address").val().trim() + " " + $("#City").val().trim() + ", " + $("#State").val().trim() + " " + $("#ZipCode").val().trim();
                this.map.searchZip(address, function () {
                    _this.setLocation(_this.map.currentLatitude, _this.map.currentLongitude);
                    _this.map.setCurrentMarkerPosition(_this.map.currentLatitude, _this.map.currentLongitude);
                }, true, 20);
            }
        };
        /**
         *
         * Sets the Form's position for submition
         * @param lat
         * @param lng
         */
        AddRestroomPage.prototype.setLocation = function (lat, lng) {
            $("#coordX").val(lat);
            $("#coordY").val(lng);
        };
        AddRestroomPage.prototype.locationDeclined = function () {
            console.log("location declined");
        };
        AddRestroomPage.prototype.addAddressToForm = function (address, calledByMarker) {
            if (calledByMarker === void 0) { calledByMarker = false; }
            var isAddress = false;
            address.types.forEach(function (addressType) {
                if (addressType === "street_address")
                    isAddress = true;
            });
            if (isAddress) {
                $("#Address").val(address.address_components[0].short_name + " " + address.address_components[1].short_name);
                $("#City").val(address.address_components[2].short_name);
                $("#State").val(address.address_components[5].short_name);
                $("#ZipCode").val(address.address_components[7].short_name);
                if (!calledByMarker)
                    this.calculateAddress();
            }
            else
                console.log("not an address");
        };
        AddRestroomPage.prototype.submit = function (e) {
            console.log($("#coordX").val());
            console.log($("#coordY").val());
            e.preventDefault();
        };
        return AddRestroomPage;
    }());
    exports.AddRestroomPage = AddRestroomPage;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3Ryb29tL0FkZFJlc3Ryb29tUGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQUNBLElBQU8sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFFMUI7UUFNSTtZQU5KLGlCQWdIQztZQTNHVyx5QkFBb0IsR0FBRyxLQUFLLENBQUM7WUE2QzlCLGlCQUFZLEdBQUcsVUFBQyxRQUFnQixFQUFFLFNBQWlCLEVBQUUsY0FBK0I7Z0JBQS9CLDhCQUErQixHQUEvQixzQkFBK0I7Z0JBQ3ZGLElBQUksUUFBUSxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLENBQUM7Z0JBQ2pELEtBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxFQUFFLFVBQUMsT0FBOEI7b0JBQ3pFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2IsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxjQUFjLENBQUMsQ0FBQztvQkFDdEQsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7b0JBQ3BDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUE7WUFwREcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNwQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksU0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTtpQkFDdEIsV0FBVyxDQUFDLFNBQVMsRUFDdEI7Z0JBQ0ksSUFBSSxRQUFRLEdBQUcsS0FBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUN6RCxLQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUNyRCxDQUFDLENBQUMsQ0FBQztZQUNQLElBQUksVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQ3hDLE9BQU8sRUFBRSwwSkFBa0o7YUFDOUosQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTtpQkFDdEIsV0FBVyxDQUFDLE9BQU8sRUFDcEI7Z0JBQ0ksVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztnQkFDM0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO29CQUM3QixDQUFDLENBQUMsYUFBYSxDQUFDO3lCQUNYLEtBQUssQ0FBQzt3QkFDSCxJQUFJLFFBQVEsR0FBRyxLQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7d0JBQ3pELEtBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQzt3QkFDeEQsS0FBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7b0JBQ3JELENBQUMsQ0FBQyxDQUFDO29CQUNQLEtBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7Z0JBQ3JDLENBQUM7WUFFTCxDQUFDLENBQUMsQ0FBQztZQUVQLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzlCLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7Z0JBQ2xELEtBQUksQ0FBQyxZQUFZLENBQUMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsS0FBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUN2RSxLQUFJLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLEtBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLEtBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDdkYsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxLQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFMUUsQ0FBQyxDQUFDLEVBTCtCLENBSy9CLENBQUMsQ0FBQztZQUNKLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUF2QixDQUF1QixDQUFDLENBQUM7WUFDbkQsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGdCQUFnQixFQUFFLEVBQXZCLENBQXVCLENBQUMsQ0FBQztZQUNoRCxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBdkIsQ0FBdUIsQ0FBQyxDQUFDO1lBQ2pELENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUF2QixDQUF1QixDQUFDLENBQUM7UUFDdkQsQ0FBQztRQWFEOzs7V0FHRztRQUNJLDBDQUFnQixHQUF2QjtZQUFBLGlCQVFDO1lBUEcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuSSxJQUFJLE9BQU8sR0FBVyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3RKLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRTtvQkFDeEIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxLQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7b0JBQ3RFLEtBQUksQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsS0FBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBRSxDQUFDO2dCQUM1RixDQUFDLEVBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2xCLENBQUM7UUFDTCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSSxxQ0FBVyxHQUFsQixVQUFtQixHQUFZLEVBQUUsR0FBWTtZQUN6QyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RCLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUIsQ0FBQztRQUNNLDBDQUFnQixHQUF2QjtZQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBRU0sMENBQWdCLEdBQXZCLFVBQXdCLE9BQTRCLEVBQUUsY0FBK0I7WUFBL0IsOEJBQStCLEdBQS9CLHNCQUErQjtZQUNqRixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxXQUFXO2dCQUM5QixFQUFFLENBQUMsQ0FBQyxXQUFXLEtBQUssZ0JBQWdCLENBQUM7b0JBQzdCLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDN0IsQ0FBQyxDQUFDLENBQUM7WUFDSCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNaLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUM3RyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDekQsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzFELENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUM1RCxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQztvQkFDaEIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDaEMsQ0FBQztZQUNELElBQUk7Z0JBQ0EsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXRDLENBQUM7UUFDTSxnQ0FBTSxHQUFiLFVBQWMsQ0FBcUI7WUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ2hDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUV2QixDQUFDO1FBQ0wsc0JBQUM7SUFBRCxDQWhIQSxBQWdIQyxJQUFBO0lBaEhZLHVCQUFlLGtCQWdIM0IsQ0FBQSIsImZpbGUiOiJyZXN0cm9vbS9BZGRSZXN0cm9vbVBhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01hcH0gZnJvbSBcIi4uL2dvb2dsZS9NYXBcIjtcclxuaW1wb3J0IG1hcHMgPSBnb29nbGUubWFwcztcclxuXHJcbmV4cG9ydCBjbGFzcyBBZGRSZXN0cm9vbVBhZ2Uge1xyXG5cclxuICAgIHByaXZhdGUgZ2VvY29kZXI6IG1hcHMuR2VvY29kZXI7XHJcbiAgICBwcml2YXRlIG1hcDogTWFwO1xyXG4gICAgcHJpdmF0ZSBmb3JtOiBKUXVlcnk7XHJcbiAgICBwcml2YXRlIHNldEFkZHJlc3NIYW5kbGVyU2V0ID0gZmFsc2U7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmdlb2NvZGVyID0gbmV3IG1hcHMuR2VvY29kZXIoKTtcclxuICAgICAgICB0aGlzLm1hcCA9IG5ldyBNYXAoXCIubWFwX2NvbnRhaW5lclwiKTtcclxuICAgICAgICB0aGlzLm1hcC5zaG93TWFwKCk7XHJcbiAgICAgICAgdGhpcy5tYXAuYWRkTWFya2VyRm9yQ3VycmVudCgpO1xyXG4gICAgICAgIHRoaXMubWFwLmdldEN1cnJlbnRNYXJrZXIoKVxyXG4gICAgICAgICAgICAuYWRkTGlzdGVuZXIoXCJkcmFnZW5kXCIsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBwb3NpdGlvbiA9IHRoaXMubWFwLmdldEN1cnJlbnRNYXJrZXIoKS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRMb2NhdGlvbihwb3NpdGlvbi5sYXQoKSwgcG9zaXRpb24ubG5nKCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB2YXIgaW5mb3dpbmRvdyA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KHtcclxuICAgICAgICAgICAgY29udGVudDogYDxkaXYgY2xhc3M9XCJmbGV4aWJsZS1idG4tY29udGFpbmVyXCI+PGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKTtcIiBpZD1cIlNldEFkZHJlc3NcIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiPlNldCBhZGRyZXNzIHRvIHRoaXMgbG9jYXRpb248L2E+PC9kaXY+YFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubWFwLmdldEN1cnJlbnRNYXJrZXIoKVxyXG4gICAgICAgICAgICAuYWRkTGlzdGVuZXIoXCJjbGlja1wiLFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpbmZvd2luZG93Lm9wZW4odGhpcy5tYXAubWFwLCB0aGlzLm1hcC5nZXRDdXJyZW50TWFya2VyKCkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnNldEFkZHJlc3NIYW5kbGVyU2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNTZXRBZGRyZXNzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbGljaygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9zaXRpb24gPSB0aGlzLm1hcC5nZXRDdXJyZW50TWFya2VyKCkuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Bvc2l0aW9uKHBvc2l0aW9uLmxhdCgpLCBwb3NpdGlvbi5sbmcoKSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldExvY2F0aW9uKHBvc2l0aW9uLmxhdCgpLCBwb3NpdGlvbi5sbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QWRkcmVzc0hhbmRsZXJTZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5mb3JtID0gJChcIiNOZXdSZXN0cm9vbVwiKTtcclxuICAgICAgICAkKFwiI2ZpbGxCeUxvY2F0aW9uXCIpLmNsaWNrKCgpID0+IHRoaXMubWFwLmdldExvY2F0aW9uKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zaG93UG9zaXRpb24odGhpcy5tYXAuY3VycmVudExhdGl0dWRlLCB0aGlzLm1hcC5jdXJyZW50TG9uZ2l0dWRlKTtcclxuICAgICAgICAgICAgdGhpcy5tYXAuc2V0Q3VycmVudE1hcmtlclBvc2l0aW9uKHRoaXMubWFwLmN1cnJlbnRMYXRpdHVkZSwgdGhpcy5tYXAuY3VycmVudExvbmdpdHVkZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TG9jYXRpb24odGhpcy5tYXAuY3VycmVudExhdGl0dWRlLCB0aGlzLm1hcC5jdXJyZW50TG9uZ2l0dWRlKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH0pKTtcclxuICAgICAgICAkKFwiI0FkZHJlc3NcIikua2V5dXAoKCkgPT4gdGhpcy5jYWxjdWxhdGVBZGRyZXNzKCkpO1xyXG4gICAgICAgICQoXCIjQ2l0eVwiKS5rZXl1cCgoKSA9PiB0aGlzLmNhbGN1bGF0ZUFkZHJlc3MoKSk7XHJcbiAgICAgICAgJChcIiNTdGF0ZVwiKS5rZXl1cCgoKSA9PiB0aGlzLmNhbGN1bGF0ZUFkZHJlc3MoKSk7XHJcbiAgICAgICAgJChcIiNaaXBDb2RlXCIpLmtleXVwKCgpID0+IHRoaXMuY2FsY3VsYXRlQWRkcmVzcygpKTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHB1YmxpYyBzaG93UG9zaXRpb24gPSAobGF0aXR1ZGU6IG51bWJlciwgbG9uZ2l0dWRlOiBudW1iZXIsIGNhbGxlZEJ5TWFya2VyOiBib29sZWFuID0gZmFsc2UpID0+IHtcclxuICAgICAgICB2YXIgbG9jYXRpb24gPSB7IGxhdDogbGF0aXR1ZGUsIGxuZzogbG9uZ2l0dWRlIH07XHJcbiAgICAgICAgdGhpcy5nZW9jb2Rlci5nZW9jb2RlKHsgbG9jYXRpb246IGxvY2F0aW9uIH0sIChyZXN1bHRzOiBtYXBzLkdlb2NvZGVyUmVzdWx0W10pID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdHNbMF0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQWRkcmVzc1RvRm9ybShyZXN1bHRzWzBdLCBjYWxsZWRCeU1hcmtlcik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vIHJlc3VsdHMgZm91bmRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIFNlYXJjaGVzIGJhdGhyb29tcyBieSB0aGUgYWRkcmVzcyBlbnRlcmVkIGFuZCBhbHNvIHNldHMgdGhlIGxvY2F0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVBZGRyZXNzKCkge1xyXG4gICAgICAgIGlmICgkKFwiI0FkZHJlc3NcIikudmFsKCkubGVuZ3RoID4gMyAmJiAkKFwiI0NpdHlcIikudmFsKCkubGVuZ3RoID4gMyAmJiAkKFwiI1N0YXRlXCIpLnZhbCgpLmxlbmd0aCA+PSAyICYmICQoXCIjWmlwQ29kZVwiKS52YWwoKS5sZW5ndGggPiAzKSB7XHJcbiAgICAgICAgICAgIHZhciBhZGRyZXNzOiBzdHJpbmcgPSAkKFwiI0FkZHJlc3NcIikudmFsKCkudHJpbSgpICsgXCIgXCIgKyAkKFwiI0NpdHlcIikudmFsKCkudHJpbSgpICsgXCIsIFwiICsgJChcIiNTdGF0ZVwiKS52YWwoKS50cmltKCkgKyBcIiBcIiArICQoXCIjWmlwQ29kZVwiKS52YWwoKS50cmltKCk7XHJcbiAgICAgICAgICAgIHRoaXMubWFwLnNlYXJjaFppcChhZGRyZXNzLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldExvY2F0aW9uKHRoaXMubWFwLmN1cnJlbnRMYXRpdHVkZSwgdGhpcy5tYXAuY3VycmVudExvbmdpdHVkZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcC5zZXRDdXJyZW50TWFya2VyUG9zaXRpb24odGhpcy5tYXAuY3VycmVudExhdGl0dWRlLCB0aGlzLm1hcC5jdXJyZW50TG9uZ2l0dWRlICk7XHJcbiAgICAgICAgICAgIH0gLCB0cnVlICwyMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIFNldHMgdGhlIEZvcm0ncyBwb3NpdGlvbiBmb3Igc3VibWl0aW9uXHJcbiAgICAgKiBAcGFyYW0gbGF0XHJcbiAgICAgKiBAcGFyYW0gbG5nXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRMb2NhdGlvbihsYXQgOiBudW1iZXIsIGxuZyA6IG51bWJlcikge1xyXG4gICAgICAgICQoXCIjY29vcmRYXCIpLnZhbChsYXQpO1xyXG4gICAgICAgICQoXCIjY29vcmRZXCIpLnZhbChsbmcpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGxvY2F0aW9uRGVjbGluZWQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJsb2NhdGlvbiBkZWNsaW5lZFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkQWRkcmVzc1RvRm9ybShhZGRyZXNzOiBtYXBzLkdlb2NvZGVyUmVzdWx0LCBjYWxsZWRCeU1hcmtlcjogYm9vbGVhbiA9IGZhbHNlICkge1xyXG4gICAgICAgIHZhciBpc0FkZHJlc3MgPSBmYWxzZTtcclxuICAgICAgICBhZGRyZXNzLnR5cGVzLmZvckVhY2goKGFkZHJlc3NUeXBlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChhZGRyZXNzVHlwZSA9PT0gXCJzdHJlZXRfYWRkcmVzc1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIGlzQWRkcmVzcyA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGlzQWRkcmVzcykge1xyXG4gICAgICAgICAgICAkKFwiI0FkZHJlc3NcIikudmFsKGFkZHJlc3MuYWRkcmVzc19jb21wb25lbnRzWzBdLnNob3J0X25hbWUgKyBcIiBcIiArIGFkZHJlc3MuYWRkcmVzc19jb21wb25lbnRzWzFdLnNob3J0X25hbWUpO1xyXG4gICAgICAgICAgICAkKFwiI0NpdHlcIikudmFsKGFkZHJlc3MuYWRkcmVzc19jb21wb25lbnRzWzJdLnNob3J0X25hbWUpO1xyXG4gICAgICAgICAgICAkKFwiI1N0YXRlXCIpLnZhbChhZGRyZXNzLmFkZHJlc3NfY29tcG9uZW50c1s1XS5zaG9ydF9uYW1lKTtcclxuICAgICAgICAgICAgJChcIiNaaXBDb2RlXCIpLnZhbChhZGRyZXNzLmFkZHJlc3NfY29tcG9uZW50c1s3XS5zaG9ydF9uYW1lKTtcclxuICAgICAgICAgICAgaWYgKCFjYWxsZWRCeU1hcmtlcilcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlQWRkcmVzcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGFuIGFkZHJlc3NcIik7XHJcblxyXG4gICAgfVxyXG4gICAgcHVibGljIHN1Ym1pdChlIDogSlF1ZXJ5RXZlbnRPYmplY3QpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygkKFwiI2Nvb3JkWFwiKS52YWwoKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJChcIiNjb29yZFlcIikudmFsKCkpO1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==
