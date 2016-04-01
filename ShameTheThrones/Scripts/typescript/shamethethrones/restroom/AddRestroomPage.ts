namespace shamethethrones.restroom {
    export class AddRestroomPage {
        private geocoder: google.maps.Geocoder;
        constructor() {

        }
        public getLocation = () => {
            this.geocoder = new google.maps.Geocoder();
            if (navigator.geolocation) {
                this.geocoder = new google.maps.Geocoder();
                navigator.geolocation.getCurrentPosition(this.showPosition, this.locationDeclined);
            } else {
                console.log("Geolocation is not supported by this browser.");
            }

        }
        public showPosition = (position) => {
            var location = { lat: position.coords.latitude, lng: position.coords.longitude };
            this.geocoder.geocode({ location: location }, (results: google.maps.GeocoderResult[], status) => {
                if (results[0]) {
                    this.addAddressToForm(results[0]);
                } else {
                    console.log("no results found");
                }
            });
        }
        public locationDeclined() {

        }
        public addAddressToForm(address: google.maps.GeocoderResult) {
            var isAddress = true;
            address.types.forEach((addressType) => {
                if (addressType == "locality")
                    isAddress = true;
            });
            if (isAddress) {
                $("#Address").val(address.address_components[0].short_name + " " + address.address_components[1].short_name);
                $("#City").val(address.address_components[2].short_name);
                $("#State").val(address.address_components[5].short_name);
                $("#ZipCode").val(address.address_components[7].short_name);
            } else
                console.log("not an address");

        }
    }
}
