///<reference path="../restroom/RestroomInfoBuilder.ts"/>
///<reference path="../google/MarkerCollection.ts"/>
namespace shamethethrones.home {
    import RestroomSearchObject = restroom.RestroomSearchObject;
    import RestroomResponse = restroom.RestroomResponse;
    import maps = google.maps;
    import RestroomInfoBuilder = restroom.RestroomInfoBuilder;
    export class HomePage {

        private markerImg: string;
        private basedir: string;
        private map: maps.Map;
        private currentLatitude: number = 38; // default values to give a map a location to preload
        private currentLongitude: number = -85;
        public markers: shamethethrones_google.MarkerCollection;
        private locationMarker: any;

        constructor() {
            this.markerImg = Main.getBaseDir() + "Content/img/toilet.png";
            this.markers = {};
            this.initMap();
        }
        /**
         * 
         * Gets the location of the user
         */
        public getLocation = (): void => {
            Main.showLoader();
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.showPosition, this.locationDeclined);
            } else {
                console.log("Geolocation is not supported by this browser.");
            }
        }
        public showPosition = (position): void => {

            this.currentLatitude = position.coords.latitude;
            this.currentLongitude = position.coords.longitude;
            $('#map').css("min-height", "400px");
            google.maps.event.trigger(this.map, "resize"); // allow the map to resize to the new height
            this.map.setCenter(new google.maps.LatLng(this.currentLatitude, this.currentLongitude, true));
            if (this.locationMarker == null)
                this.locationMarker = new GeolocationMarker(this.map);

            $(window).scrollTop(jQuery("#map").position().top);
            this.search();
            Main.loadCompleted();
        }
        public locationDeclined(error): void {
            Main.loadCompleted();
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
        public initMap = (): void => {
            this.map = new google.maps.Map(document.getElementById('map'), {
                center: new google.maps.LatLng(this.currentLatitude, this.currentLongitude),
                zoom: 14
            });
            // ReSharper disable once TsNotResolved
            //        console.log("TIMETAKEN: ");
            //        console.log(Window.stopTimer());
            console.log("map ready");
            this.map.addListener('dragend', () => this.search());
            this.map.addListener('zoom_changed', () => this.search());
            var spinnerBackground = $(".spinner");
            spinnerBackground.css("display", "none");
        }

        public search = (): void => {
            var searchObject: RestroomSearchObject = {
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

                    this.updateMarkers(data);

                }
            });
        }

        public updateMarkers = (restrooms: RestroomResponse[]) => {

            restrooms.forEach((restroom: RestroomResponse) => {
               
                if (this.markers["" + restroom.coordX + "," + restroom.coordY] == undefined) {
                    var restroomIcon = new shamethethrones.restroom.RestroomIcon();
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
                    var restroomMarker: restroom.RestroomMarker = { marker: toiletMarker, restroom: restroom, infoWindow: infowindow };
                    toiletMarker.addListener('click', () => this.markerClicked(restroomMarker));
                    this.markers["" + restroom.coordX + "," + restroom.coordY] = restroomMarker;

                }

            });
        }
        public markerClicked(marker: restroom.RestroomMarker): void {

            marker.infoWindow.open(this.map, marker.marker);

        }
    }
}

