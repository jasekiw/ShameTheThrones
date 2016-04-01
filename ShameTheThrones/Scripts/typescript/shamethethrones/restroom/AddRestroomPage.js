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
})();
//# sourceMappingURL=AddRestroomPage.js.map