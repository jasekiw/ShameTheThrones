define(["require", "exports", "../google/Map"], function (require, exports, Map_1) {
    "use strict";
    var HomePage = (function () {
        function HomePage() {
            var _this = this;
            this.map = new Map_1.Map(".map_container");
            this.map.enableAutomaticSearch();
            $(".zip-code-search").on("keyup", function (e) {
                var zipcode = $(e.target).val();
                if (zipcode.length > 3)
                    _this.map.searchZip(zipcode);
            });
            $("#bathroomsAroundMe").click(function () { return _this.map.getLocation(function () {
                _this.map.scrollToMap();
            }); });
            $("#SearchAddress").click(function () { return _this.map.searchZip($(".zip-code-search").val()); });
        }
        return HomePage;
    }());
    exports.HomePage = HomePage;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUvSG9tZVBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFVQTtRQUlJO1lBSkosaUJBa0JDO1lBWk8sSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLFNBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUNqQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUMsQ0FBQztnQkFDaEMsSUFBSSxPQUFPLEdBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDekMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7b0JBQ3JCLEtBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsS0FBSyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQztnQkFDckQsS0FBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUMzQixDQUFDLENBQUMsRUFGa0MsQ0FFbEMsQ0FBQyxDQUFDO1lBQ0osQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsS0FBSyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBRSxFQUFoRCxDQUFnRCxDQUFFLENBQUM7UUFDdkYsQ0FBQztRQUNMLGVBQUM7SUFBRCxDQWxCQSxBQWtCQyxJQUFBO0lBbEJZLGdCQUFRLFdBa0JwQixDQUFBIiwiZmlsZSI6ImhvbWUvSG9tZVBhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1Jlc3Ryb29tUmVzcG9uc2V9IGZyb20gXCIuLi9yZXN0cm9vbS9SZXN0cm9vbVJlc3BvbnNlXCI7XHJcbmltcG9ydCB7TWFya2VyQ29sbGVjdGlvbn0gZnJvbSBcIi4uL2dvb2dsZS9NYXJrZXJDb2xsZWN0aW9uXCI7XHJcbmltcG9ydCB7UmVzdHJvb21JbmZvQnVpbGRlcn0gZnJvbSBcIi4uL3Jlc3Ryb29tL1Jlc3Ryb29tSW5mb0J1aWxkZXJcIjtcclxuaW1wb3J0IHtSZXN0cm9vbVNlYXJjaE9iamVjdH0gZnJvbSBcIi4uL3Jlc3Ryb29tL1Jlc3Ryb29tU2VhcmNoT2JqZWN0XCI7XHJcbmltcG9ydCB7TWFpbn0gZnJvbSBcIi4uL01haW5cIjtcclxuaW1wb3J0IHtSZXN0cm9vbUljb259IGZyb20gXCIuLi9yZXN0cm9vbS9SZXN0cm9vbUljb25cIjtcclxuaW1wb3J0IHtSZXN0cm9vbU1hcmtlcn0gZnJvbSBcIi4uL3Jlc3Ryb29tL1Jlc3Ryb29tTWFya2VyXCI7XHJcbmltcG9ydCB7TWFwfSBmcm9tIFwiLi4vZ29vZ2xlL01hcFwiO1xyXG5pbXBvcnQgbWFwcyA9IGdvb2dsZS5tYXBzO1xyXG4gXHJcbmV4cG9ydCBjbGFzcyBIb21lUGFnZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBtYXA6IE1hcDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICAgICAgdGhpcy5tYXAgPSBuZXcgTWFwKFwiLm1hcF9jb250YWluZXJcIik7XHJcbiAgICAgICAgdGhpcy5tYXAuZW5hYmxlQXV0b21hdGljU2VhcmNoKCk7XHJcbiAgICAgICAgJChcIi56aXAtY29kZS1zZWFyY2hcIikub24oXCJrZXl1cFwiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgemlwY29kZSA6IHN0cmluZyA9ICQoZS50YXJnZXQpLnZhbCgpO1xyXG4gICAgICAgICAgICBpZiAoemlwY29kZS5sZW5ndGggPiAzKVxyXG4gICAgICAgICAgICAgIHRoaXMubWFwLnNlYXJjaFppcCh6aXBjb2RlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiI2JhdGhyb29tc0Fyb3VuZE1lXCIpLmNsaWNrKCgpID0+IHRoaXMubWFwLmdldExvY2F0aW9uKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tYXAuc2Nyb2xsVG9NYXAoKTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgJChcIiNTZWFyY2hBZGRyZXNzXCIpLmNsaWNrKCgpID0+IHRoaXMubWFwLnNlYXJjaFppcCgkKFwiLnppcC1jb2RlLXNlYXJjaFwiKS52YWwoKSApICk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iXX0=
