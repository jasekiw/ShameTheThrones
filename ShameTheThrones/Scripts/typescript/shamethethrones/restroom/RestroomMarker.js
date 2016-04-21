define(["require", "exports"], function (require, exports) {
    var RestroomMarker = (function () {
        function RestroomMarker(marker, restroom, infoWindow) {
            this.marker = marker;
            this.restroom = restroom;
            this.infoWindow = infoWindow;
        }
        return RestroomMarker;
    })();
    exports.RestroomMarker = RestroomMarker;
});
//# sourceMappingURL=RestroomMarker.js.map