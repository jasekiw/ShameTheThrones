import {RestroomResponse} from "../restroom/RestroomResponse";
import {MarkerCollection} from "../google/MarkerCollection";
import {RestroomInfoBuilder} from "../restroom/RestroomInfoBuilder";
import {RestroomSearchObject} from "../restroom/RestroomSearchObject";
import {Main} from "../Main";
import {RestroomIcon} from "../restroom/RestroomIcon";
import {RestroomMarker} from "../restroom/RestroomMarker";
import {Map} from "../google/Map";
import maps = google.maps;
 
export class HomePage {

    private map: Map;

    constructor() {

        this.map = new Map(".map_container");
        this.map.enableAutomaticSearch();
        $(".zip-code-search").on("keyup", (e) => {
            var zipcode : string = $(e.target).val();
            if (zipcode.length > 3)
              this.map.searchZip(zipcode);
        });
        $("#bathroomsAroundMe").click(() => this.map.getLocation(() => {
            this.map.scrollToMap();
        }));
    }
}


