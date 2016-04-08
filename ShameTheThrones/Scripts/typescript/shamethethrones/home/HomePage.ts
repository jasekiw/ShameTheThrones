///<reference path="../restroom/RestroomInfoBuilder.ts"/>
///<reference path="../google/MarkerCollection.ts"/>
///<reference path="../restroom/RestroomIcon.ts"/>
///<reference path="../restroom/RestroomMarker.ts"/>
namespace shamethethrones.home {

    import RestroomSearchObject = restroom.RestroomSearchObject;
    import RestroomResponse = restroom.RestroomResponse;
    import maps = google.maps;
    import RestroomInfoBuilder = restroom.RestroomInfoBuilder;
    import RestroomMarker = restroom.RestroomMarker;
    import RestroomIcon = restroom.RestroomIcon;

    export class HomePage {

        private map: maps.Map;
        private currentLatitude: number = 38; // default values to give a map a location to preload
        private currentLongitude: number = -85;
        private markers: shamethethrones_google.MarkerCollection;
        private locationMarker: GeolocationMarker;
        private geocoder: maps.Geocoder;
        constructor() {
            this.markers = {};
            this.initMap();
            this.geocoder = new google.maps.Geocoder();
            $(".zip-code-search").on("keyup", (e: JQueryEventObject) => {
                if ($(e.target).val().length > 3)
                    this.searchZip();
            });
        }
        /**
         * Gets the location of the user and initializes the map
         */
        public getLocation = (): void => {
            Main.showLoader();
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => this.showPosition(position),(error) =>  this.locationDeclined(error));
            } else {
                console.log("Geolocation is not supported by this browser.");
            }
        }
        /**
         * When the user shares their location we will show the position and load the map
         * @param position
         */
        public showPosition(position: Position): void {

            this.currentLatitude = position.coords.latitude;
            this.currentLongitude = position.coords.longitude;
            
            if (this.locationMarker == null)
                this.locationMarker = new GeolocationMarker(this.map);
            $(".map_container").show();
            $('#map').css("min-height", "400px");
            google.maps.event.trigger(this.map, "resize"); // allow the map to resize to the new height
            this.map.setZoom(14);
            this.map.setCenter(new google.maps.LatLng(this.currentLatitude, this.currentLongitude, true));
           

            $(window).scrollTop(jQuery("#map").position().top);
            this.search();
            Main.loadCompleted();
        }
        /**
         * This is the funciton that handles what happens when the user declines position
         * @param error The error that is given when the user declines giving their position
         */
        public locationDeclined(error: PositionError): void {
            Main.loadCompleted();
            if (error.code === error.PERMISSION_DENIED) {
                console.log("Location permission denied");
            } else {
                console.log("unkown error occured when getting location ERRORCODE: " + error.code + " ERRORMESSAGE: " + error.message);
            }
        }

        /**
         * Initializes the map for quicker use later
         */
        public initMap(): void  {

            this.map = new google.maps.Map(document.getElementById('map'), {
                center: new google.maps.LatLng(this.currentLatitude, this.currentLongitude),
                zoom: 14
            });
            console.log("map ready");
            this.map.addListener('dragend', () => this.search());
            this.map.addListener('zoom_changed', () => this.search());
            $(".spinner").css("display", "none");
           
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
                success: (data: RestroomResponse[]) =>  this.updateMarkers(data)
            });
        }
        /**
         * Updates the map with restrooms that were returned from the search. 
         * @param restrooms The restrooms returned from the search results
         */
        public updateMarkers (restrooms: RestroomResponse[]) : void {

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
                    var restroomMarker: restroom.RestroomMarker = new RestroomMarker(toiletMarker, restroom, infowindow);
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
        public searchZip() {
            var zipcode = $(".zip-code-search").val();
            this.geocoder.geocode({ address: zipcode }, (results: maps.GeocoderResult[], status) => {
                if (results && results[0]) {
                 
                   
                    this.currentLatitude = results[0].geometry.location.lat();
                    this.currentLongitude = results[0].geometry.location.lng();
                    $(".map_container").show();
                    $('#map').css("min-height", "400px");
                    google.maps.event.trigger(this.map, "resize"); // allow the map to resize to the new height
                    this.map.setCenter(new google.maps.LatLng(this.currentLatitude, this.currentLongitude, true));
                    if (results[0].types[0] !== null && results[0].types[0] == "postal_code")
                        this.map.fitBounds(results[0].geometry.bounds);
                    else if (results[0].types[0] && results[0].types[0] == "street_address")
                        this.map.setZoom(15);
                    else 
                        this.map.setZoom(12);
                    this.search();
                } else {
                    console.log("no results found");
                }
            });
           
        }
    }
}

