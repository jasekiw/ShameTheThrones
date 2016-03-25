///<reference path="../../typings/jquery/jquery.d.ts"/>
///<reference path="RestroomSearchObject.ts"/>
///<reference path="../libraries/restrooms/RestroomResponse.ts"/>
///<reference path="../../typings/global.d.ts"/>
class HomePage {

    private markerImg: string;
    private map: google.maps.Map;
    private currentLatitude: number = 38; // default values to give a map a location to preload
    private currentLongitude: number = -85;
    public markers: google.maps.Marker[];

    constructor(markerImg: string) {
        this.markerImg = markerImg;
        this.markers = [];
        this.initMap();
    }
    /**
     * 
     * Gets the location of the user
     */
    public getLocation = () : void => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition, this.locationDeclined);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }
    public showPosition = (position): void => {
        
        this.currentLatitude = position.coords.latitude;
        this.currentLongitude = position.coords.longitude; 
        this.map.setCenter(new google.maps.LatLng(this.currentLatitude, this.currentLongitude, true));
        $('#map').css("min-height", "400px");
        google.maps.event.trigger(this.map, "resize");
        jQuery(window).scrollTop(jQuery("#map").position().top);
        this.search();
    }
    public locationDeclined(error): void {
        if (error.code === error.PERMISSION_DENIED) {
            console.log("Location permission denied");
        } else {
            console.log("unkown error occured when getting location ERRORCODE: " + error.code + " ERRORMESSAGE: " + error.message);
        }
    }
   
    /**
     * 
     * Initializes the map
     */
    public initMap = () : void => {
        this.map = new google.maps.Map(document.getElementById('map'),   {
            center: new google.maps.LatLng(this.currentLatitude, this.currentLongitude),
            zoom: 14
        });
// ReSharper disable once TsNotResolved
//        console.log("TIMETAKEN: ");
//        console.log(Window.stopTimer());
        console.log("map ready");
        this.map.addListener('dragend', () => this.search() );
        this.map.addListener('zoom_changed', () => this.search() );
    }

    public search = () : void =>  {
        var searchObject : RestroomSearchObject = {
            SWLat: this.map.getBounds().getSouthWest().lat(),
            SWLong: this.map.getBounds().getSouthWest().lng(),
            NELat: this.map.getBounds().getNorthEast().lat(),
            NELong: this.map.getBounds().getNorthEast().lng()
        }
        $.ajax({
            url: '/restroom/search',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(searchObject),
            contentType: 'application/json; charset=utf-8',
            success: (data: RestroomResponse[]) => {
                // get the result and do some magic with it
                console.log(this.markers);
                data.forEach((restroom: RestroomResponse) => {
                    if (this.markers["" + restroom.coordX + "," + restroom.coordY] == undefined) {
                        var toiletMarker = new google.maps.Marker({
                            position: new google.maps.LatLng(restroom.coordX, restroom.coordY),
                            map: this.map,
                            icon: this.markerImg
                        });
                        this.markers["" + restroom.coordX + "," + restroom.coordY] = toiletMarker;
                        
                    }
                   
                });
               
            }
        });
    }
}
