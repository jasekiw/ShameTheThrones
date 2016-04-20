
import {RestroomResponse} from "./RestroomResponse"
export class RestroomMarker {

    public marker: google.maps.Marker;
    public restroom: RestroomResponse;
    public infoWindow: google.maps.InfoWindow;

    constructor(marker: google.maps.Marker, restroom: RestroomResponse, infoWindow: google.maps.InfoWindow) {
        this.marker = marker;
        this.restroom = restroom;
        this.infoWindow = infoWindow;
    }
       
}
