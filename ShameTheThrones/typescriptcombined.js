var HomePage = (function () {
    function HomePage() {
    }
    return HomePage;
})();
///<reference path="HomePage/HomePage.ts"/>
var Main = (function () {
    function Main() {
    }
    Main.prototype.homePage = function () {
        var homePage = new HomePage();
    };
    return Main;
})();
//# sourceMappingURL=typescriptcombined.js.map