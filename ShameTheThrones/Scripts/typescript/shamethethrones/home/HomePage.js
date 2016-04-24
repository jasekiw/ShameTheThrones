define(["require", "exports", "../google/Map"], function (require, exports, Map_1) {
    var HomePage = (function () {
        function HomePage() {
            var _this = this;
            this.map = new Map_1.Map(".map_container");
            this.map.enableAutomaticSearch();
            $(".spinner").css("display", "none");
            $(".zip-code-search").on("keyup", function (e) {
                var zipcode = $(e.target).val();
                if (zipcode.length > 3)
                    _this.map.searchZip(zipcode);
            });
            $("#bathroomsAroundMe").click(function () { return _this.map.getLocation(function () {
                console.log("got here");
                _this.map.scrollToMap();
            }); });
        }
        return HomePage;
    })();
    exports.HomePage = HomePage;
});
//# sourceMappingURL=HomePage.js.map