declare class GeolocationMarker extends google.maps.MVCObject {
    constructor(any: any);
    public getAccuracy(): number;
    public getBounds(): google.maps.LatLngBounds;
    public getMap(): google.maps.Map;
    public getPosition(): google.maps.LatLng;
}