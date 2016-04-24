import {Map} from "../google/Map";
import maps = google.maps;

export class AddRestroomPage {

    private geocoder: maps.Geocoder;
    private map: Map;
    private form: JQuery;
    private setAddressHandlerSet = false;
    constructor() {
        this.geocoder = new maps.Geocoder();
        this.map = new Map(".map_container");
        this.map.showMap();
        this.map.addMarkerForCurrent();
        this.map.getCurrentMarker()
            .addListener("dragend",
            () => {
                var position = this.map.getCurrentMarker().getPosition();
                this.setLocation(position.lat(), position.lng());
            });
        var infowindow = new google.maps.InfoWindow({
            content: `<div class="flexible-btn-container"><a href="javascript:void(0);" id="SetAddress" class="btn btn-default">Set address to this location</a></div>`
        });
        this.map.getCurrentMarker()
            .addListener("click",
            () => {
                infowindow.open(this.map.map, this.map.getCurrentMarker());
                if (!this.setAddressHandlerSet) {
                    $("#SetAddress")
                        .click(() => {
                            var position = this.map.getCurrentMarker().getPosition();
                            this.showPosition(position.lat(), position.lng(), true);
                            this.setLocation(position.lat(), position.lng());
                        });
                    this.setAddressHandlerSet = true;
                }
              
            });

        this.form = $("#NewRestroom");
        $("#fillByLocation").click(() => this.map.getLocation(() => {
            this.showPosition(this.map.currentLatitude, this.map.currentLongitude);
            this.map.setCurrentMarkerPosition(this.map.currentLatitude, this.map.currentLongitude);
            this.setLocation(this.map.currentLatitude, this.map.currentLongitude);
                
        }));
        $("#Address").keyup(() => this.calculateAddress());
        $("#City").keyup(() => this.calculateAddress());
        $("#State").keyup(() => this.calculateAddress());
        $("#ZipCode").keyup(() => this.calculateAddress());
    }

    
    public showPosition = (latitude: number, longitude: number, calledByMarker: boolean = false) => {
        var location = { lat: latitude, lng: longitude };
        this.geocoder.geocode({ location: location }, (results: maps.GeocoderResult[]) => {
            if (results[0]) {
                this.addAddressToForm(results[0], calledByMarker);
            } else {
                console.log("no results found");
            }
        });
    }
    /**
     *
     * Searches bathrooms by the address entered and also sets the location
     */
    public calculateAddress() {
        if ($("#Address").val().length > 3 && $("#City").val().length > 3 && $("#State").val().length >= 2 && $("#ZipCode").val().length > 3) {
            var address: string = $("#Address").val().trim() + " " + $("#City").val().trim() + ", " + $("#State").val().trim() + " " + $("#ZipCode").val().trim();
            this.map.searchZip(address, () => {
                this.setLocation(this.map.currentLatitude, this.map.currentLongitude);
                this.map.setCurrentMarkerPosition(this.map.currentLatitude, this.map.currentLongitude );
            } , true ,20);
        }
    }

    /**
     *
     * Sets the Form's position for submition
     * @param lat
     * @param lng
     */
    public setLocation(lat : number, lng : number) {
        $("#coordX").val(lat);
        $("#coordY").val(lng);
    }
    public locationDeclined() {
        console.log("location declined");
    }

    public addAddressToForm(address: maps.GeocoderResult, calledByMarker: boolean = false ) {
        var isAddress = false;
        address.types.forEach((addressType) => {
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

    }
    public submit(e : JQueryEventObject) {
        console.log($("#coordX").val());
        console.log($("#coordY").val());
        e.preventDefault();

    }
}

