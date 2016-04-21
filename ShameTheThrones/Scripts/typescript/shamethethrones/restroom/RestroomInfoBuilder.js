define(["require", "exports", "../Main"], function (require, exports, Main_1) {
    var RestroomInfoBuilder = (function () {
        function RestroomInfoBuilder(restroom) {
            this.restroom = restroom;
        }
        RestroomInfoBuilder.prototype.getContent = function () {
            var genderName = "";
            if (this.restroom.gender == 0)
                genderName = "Mens";
            else if (this.restroom.gender == 1)
                genderName = "Womens";
            else if (this.restroom.gender == 2)
                genderName = "Both";
            var ratingText = "";
            if (this.restroom.rated)
                ratingText = this.restroom.rating.toString();
            else
                ratingText = "Not Yet Rated";
            var header = "<h3>" + this.restroom.address + "</h3>";
            var description = "<p><strong>Description:</strong> " + this.restroom.description + "</p>";
            var gender = "<p><strong>Gender:</strong> " + genderName + "</p>";
            var rating = "<p><strong>rating:</strong> " + ratingText + "</p>";
            var rateButton = "<div class=\"ratebutton_container\"><a class=\"btn btn-primary\" href=\"" + Main_1.Main.getBaseDir() + "restroom/rate/" + this.restroom.id + "\">Rate</a></div>";
            return header + description + gender + rating + rateButton;
        };
        return RestroomInfoBuilder;
    })();
    exports.RestroomInfoBuilder = RestroomInfoBuilder;
});
//# sourceMappingURL=RestroomInfoBuilder.js.map