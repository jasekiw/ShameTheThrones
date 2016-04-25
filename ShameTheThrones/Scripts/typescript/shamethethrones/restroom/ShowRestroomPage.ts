
import {Map} from "../google/Map";

export class ShowRestroomPage {
    private map: Map;
    private initialized = false;
    constructor() {
        this.map = new Map(".map_container");
        google.maps.event.addListener(this.map.map,
            'bounds_changed',
            () => {
                if (!this.initialized)
                    this.map.search();
                this.initialized = true;
            });
        this.map.showMap();
        var coordY : number = parseFloat($("#restroomModel_coordY").val());
        var coordX: number = parseFloat($("#restroomModel_coordX").val());
       
        this.map.map.setCenter({ lat: coordX, lng: coordY });
        this.map.map.setZoom(20);
      
 
        this.map.enableAutomaticSearch();
        
    }
}