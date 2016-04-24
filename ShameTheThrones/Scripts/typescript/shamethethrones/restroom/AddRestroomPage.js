define(["require", "exports", "../google/Map"], function (require, exports, Map_1) {
    var maps = google.maps;
    var AddRestroomPage = (function () {
        function AddRestroomPage() {
            var _this = this;
            this.showPosition = function (latitude, longitude) {
                var location = { lat: latitude, lng: longitude };
                _this.geocoder.geocode({ location: location }, function (results, status) {
                    if (results[0]) {
                        _this.addAddressToForm(results[0]);
                    }
                    else {
                        console.log("no results found");
                    }
                });
            };
            this.geocoder = new maps.Geocoder();
            this.map = new Map_1.Map(".map_container");
            this.map.showMap();
            $("#fillByLocation").click(function () { return _this.map.getLocation(function () {
                _this.showPosition(_this.map.currentLatitude, _this.map.currentLongitude);
                _this.calculateAddress();
            }); });
            $("#Address").keyup(function (e) { return _this.calculateAddress(); });
            $("#City").keyup(function (e) { return _this.calculateAddress(); });
            $("#State").keyup(function (e) { return _this.calculateAddress(); });
            $("#ZipCode").keyup(function (e) { return _this.calculateAddress(); });
        }
        AddRestroomPage.prototype.calculateAddress = function () {
            var _this = this;
            if ($("#Address").val().length > 3 && $("#City").val().length > 3 && $("#State").val().length >= 2 && $("#ZipCode").val().length > 3) {
                var address = $("#Address").val().trim() + " " + $("#City").val().trim() + ", " + $("#State").val().trim() + " " + $("#ZipCode").val().trim();
                this.map.searchZip(address, function () {
                    $("#coordX").val(_this.map.currentLatitude);
                    $("#coordY").val(_this.map.currentLongitude);
                }, true, 20);
            }
        };
        AddRestroomPage.prototype.locationDeclined = function () {
            console.log("location declined");
        };
        AddRestroomPage.prototype.addAddressToForm = function (address) {
            var isAddress = false;
            address.types.forEach(function (addressType) {
                if (addressType == "street_address")
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
    })();
    exports.AddRestroomPage = AddRestroomPage;
});
//# sourceMappingURL=AddRestroomPage.js.map