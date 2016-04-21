define(["require", "exports", "../Main"], function (require, exports, Main_1) {
    var RestroomIcon = (function () {
        function RestroomIcon() {
        }
        RestroomIcon.prototype.getIcon = function (rating, gender, rated) {
            var baseDir = Main_1.Main.getBaseDir();
            var baseIconUrl = baseDir + "Content/img/restroom-markers/";
            switch (gender) {
                case 0:
                    baseIconUrl += "men/";
                    break;
                case 1:
                    baseIconUrl += "women/";
                    break;
                case 2:
                    baseIconUrl += "unisex/";
                    break;
                default:
                    baseIconUrl += "men/";
                    break;
            }
            if (!rated) {
                baseIconUrl += "gray.png";
                return baseIconUrl;
            }
            if (rating < 1)
                baseIconUrl += "red.png";
            else if (rating < 2)
                baseIconUrl += "purple.png";
            else if (rating < 3)
                baseIconUrl += "blue.png";
            else if (rating < 4)
                baseIconUrl += "green.png";
            else if (rating <= 5)
                baseIconUrl += "yellow.png";
            return baseIconUrl;
        };
        return RestroomIcon;
    })();
    exports.RestroomIcon = RestroomIcon;
});
//# sourceMappingURL=RestroomIcon.js.map