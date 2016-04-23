
import {RestroomResponse} from "../restroom/RestroomResponse";
import {MarkerCollection} from "./MarkerCollection";
import {RestroomInfoBuilder} from "../restroom/RestroomInfoBuilder";
import {RestroomSearchObject} from "../restroom/RestroomSearchObject";
import {Main} from "../Main";
import {RestroomIcon} from "../restroom/RestroomIcon";
import {RestroomMarker} from "../restroom/RestroomMarker";
import maps = google.maps;


export class Map {
    private map: maps.Map;
    public currentLatitude: number = 38; // default values to give a map a location to preload
    public currentLongitude: number = -85;
    private markers: MarkerCollection;
    private locationMarker: GeolocationMarker;
    private geocoder: maps.Geocoder;
    private container: JQuery;
    private mapElement: JQuery;
    private showLocationMarker = false;
    private currentPositionMarkerForNewRestroom;

    constructor(selector: string) {
        this.container = $(selector);
        this.container.css("display", "none");
        this.mapElement = this.container.find(".map");
        this.markers = {};
        this.geocoder = new google.maps.Geocoder();
        this.initMap();
    }

    
    /**
    * Gets the location of the user and initializes the map
    * @param {Function} functionWhenComplete Optional function to pass to know when it completed
    *
    */
    public getLocation = (functionWhenComplete : () => void = undefined, showLocationMarker : boolean = false): void => {
        Main.showLoader();
        this.showLocationMarker = showLocationMarker;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => this.showPosition(position, functionWhenComplete), (error) => this.locationDeclined(error, functionWhenComplete));
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }
    /**
     * When the user shares their location we will show the position and load the map
     * @param position
     */
    public showPosition(position: Position, functionWhenComplete : () => void = undefined): void {

        this.currentLatitude = position.coords.latitude;
        this.currentLongitude = position.coords.longitude;

        if (this.locationMarker == null && this.showLocationMarker)
            this.locationMarker = new GeolocationMarker(this.map);
        this.showMap();
        this.map.setZoom(14);
        this.map.setCenter(new google.maps.LatLng(this.currentLatitude, this.currentLongitude, true));


       
        this.search();
        Main.loadCompleted();
        if (functionWhenComplete != undefined)
            functionWhenComplete();
    }
    /**
     * Scrolls the page to the map
     */
    public scrollToMap() {
        $("html, body").animate({ scrollTop: this.mapElement.position().top }, 1000);
    }
    /**
     * This is the funciton that handles what happens when the user declines position
     * @param error The error that is given when the user declines giving their position
     */
    public locationDeclined(error: PositionError, functionWhenComplete : () => void = undefined): void {
        Main.loadCompleted();
        if (error.code === error.PERMISSION_DENIED) {
            console.log("Location permission denied");
        } else {
            console.log("unkown error occured when getting location ERRORCODE: " + error.code + " ERRORMESSAGE: " + error.message);
        }
        if (functionWhenComplete != undefined)
            functionWhenComplete();
    }
    public showMap() : void {
        this.container.show();
        this.mapElement.css("min-height", "400px");
        google.maps.event.trigger(this.map, "resize"); // allow the map to resize to the new height
    }

    /**
     * Initializes the map for quicker use later
     */
    public initMap(): void {

        this.map = new google.maps.Map(this.mapElement[0], {
            center: new google.maps.LatLng(this.currentLatitude, this.currentLongitude),
            zoom: 14
        });
      
    }
    /**
     * Allows search to run when the user moves the map
     */
    public enableAutomaticSearch() : void{
        this.map.addListener('dragend', () => this.search());
        this.map.addListener('zoom_changed', () => this.search());
    }
    /**
         * Searches the database for restrooms in the map's border
         */
    public search(): void {
        // the search object to post to the server
        console.log("searching...");
        var searchObject: RestroomSearchObject = {
            SWLat: this.map.getBounds().getSouthWest().lat(),
            SWLong: this.map.getBounds().getSouthWest().lng(),
            NELat: this.map.getBounds().getNorthEast().lat(),
            NELong: this.map.getBounds().getNorthEast().lng()
        }

        $.ajax({ // perform search on the database and update map
            url: '/restroom/search',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(searchObject),
            contentType: 'application/json; charset=utf-8',
            success: (data: RestroomResponse[]) => this.updateMarkers(data)
        });
    }
    public addMarkerForCurrent() {
        
    }
    /**
     * Updates the map with restrooms that were returned from the search. 
     * @param restrooms The restrooms returned from the search results
     */
    public updateMarkers(restrooms: RestroomResponse[]): void {

        restrooms.forEach((restroom: RestroomResponse) => {

            if (this.getMarker(restroom.coordX, restroom.coordY) == undefined) {
                var restroomIcon = new RestroomIcon();
                var markerImgUrl = restroomIcon.getIcon(restroom.rating, restroom.gender, restroom.rated);
                var contentBuilder: RestroomInfoBuilder = new RestroomInfoBuilder(restroom);
                var infowindow = new google.maps.InfoWindow({
                    content: contentBuilder.getContent()
                });

                var toiletMarker = new google.maps.Marker({
                    position: new google.maps.LatLng(restroom.coordX, restroom.coordY),
                    map: this.map,
                    icon: markerImgUrl,
                    animation: google.maps.Animation.DROP,
                    title: restroom.address
                });
                var restroomMarker: RestroomMarker = new RestroomMarker(toiletMarker, restroom, infowindow);
                toiletMarker.addListener('click', () => restroomMarker.infoWindow.open(this.map, restroomMarker.marker));
                this.setMarker(restroomMarker);
            }

        });
    }
    /**
     * Sets a RestroomMarker at the correct position
     * @param marker The restroom marker to set
     */
    private setMarker(marker: RestroomMarker) {
        this.markers["" + marker.restroom.coordX + "," + marker.restroom.coordY] = marker;
    }
    /**
     * Gets a cached marker
     * @param lat the latitude of the marker to get
     * @param lng the longitude of the marker to get
     */
    private getMarker(lat: number, lng: number) {
        return this.markers["" + lat + "," + lng];
    }

    /**
     * Searches by an address or zip code and moves the map to that location
     * @param {number} zipcode
     * @param {Function} whenComplete default is null
     * @param {boolean} doSearch default is true
     * @param {number} zoom default is 15
     */
    public searchZip(zipcode : string, whenComplete : () => void = null, doSearch = true, zoom : number = 15) : void {
        
        this.geocoder.geocode({ address: zipcode }, (results: maps.GeocoderResult[], status) => {
            if (results && results[0]) {


                this.currentLatitude = results[0].geometry.location.lat();
                this.currentLongitude = results[0].geometry.location.lng();
                this.showMap();
                this.map.setCenter(new google.maps.LatLng(this.currentLatitude, this.currentLongitude, true));
                if (results[0].types[0] !== null && results[0].types[0] == "postal_code")
                    this.map.fitBounds(results[0].geometry.bounds);
                else if (results[0].types[0] && results[0].types[0] == "street_address")
                    this.map.setZoom(zoom);
                else
                    this.map.setZoom(12);
                if (whenComplete != null)
                    whenComplete();
                if (doSearch)
                    this.search();
            } else {
                console.log("no results found");
            }
        });

    }
}