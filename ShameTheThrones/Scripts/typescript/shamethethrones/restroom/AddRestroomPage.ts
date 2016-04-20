import {Map} from "../google/Map";
import maps = google.maps;
export class AddRestroomPage {

    private geocoder: maps.Geocoder;
    private map: Map;

    constructor() {
        this.geocoder = new maps.Geocoder();
            this.map = new Map(".map_container");
            this.map.showMap();
            $("#fillByLocation").click(() => this.map.getLocation(() => {
                this.showPosition(this.map.currentLatitude, this.map.currentLongitude);
              
                this.calculateAddress();
            }));
            $("#Address").keyup((e) => this.calculateAddress());
            $("#City").keyup((e) => this.calculateAddress());
            $("#State").keyup((e) => this.calculateAddress());
            $("#ZipCode").keyup((e) => this.calculateAddress());
    }

    
    public showPosition = (latitude : number, longitude : number) => {
        var location = { lat: latitude, lng: longitude };
        this.geocoder.geocode({ location: location }, (results: maps.GeocoderResult[], status) => {
            if (results[0]) {
                this.addAddressToForm(results[0]);
            } else {
                console.log("no results found");
            }
        });
    }
    public calculateAddress() {
        if ($("#Address").val().length > 3 && $("#City").val().length > 3 && $("#State").val().length >= 2 && $("#ZipCode").val().length > 3) {
            var address: string = $("#Address").val().trim() + " " + $("#City").val().trim() + ", " + $("#State").val().trim() + " " + $("#ZipCode").val().trim();
            this.map.searchZip(address, () => {
                $("#coordX").val(this.map.currentLatitude);
                $("#coordY").val(this.map.currentLongitude);
            } , true ,20);
        }
    }

    public locationDeclined() {
        console.log("location declined");
    }

    public addAddressToForm(address: maps.GeocoderResult) {
        var isAddress = false;
        address.types.forEach((addressType) => {
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

    }
}

