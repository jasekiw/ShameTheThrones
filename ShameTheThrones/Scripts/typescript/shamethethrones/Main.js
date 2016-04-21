///<reference path="home/HomePage.ts"/>
///<reference path="restroom/AddRestroomPage.ts"/>
define(["require", "exports", "./home/HomePage", "./restroom/AddRestroomPage"], function (require, exports, HomePage_1, AddRestroomPage_1) {
    var Main = (function () {
        function Main(waitUntilLoaded) {
            var _this = this;
            this.constructHomePage = function () {
                _this.homePage = new HomePage_1.HomePage();
            };
            if (waitUntilLoaded == undefined)
                Main.loadCompleted();
            else if (!waitUntilLoaded)
                Main.loadCompleted();
        }
        Main.prototype.constructAddRestroomPage = function () {
            this.addRestroomPage = new AddRestroomPage_1.AddRestroomPage();
        };
        Main.setBaseDir = function (basedir) {
            Main.basedir = basedir;
        };
        Main.getBaseDir = function () {
            return Main.basedir;
        };
        /**
         * Disabled the spinner to show that the page is loaded
         */
        Main.loadCompleted = function () {
            $(".spinner").css("dispay", "none");
        };
        Main.showLoader = function () {
            $(".spinner").css("dispay", "block");
        };
        return Main;
    })();
    exports.Main = Main;
});
//# sourceMappingURL=Main.js.map