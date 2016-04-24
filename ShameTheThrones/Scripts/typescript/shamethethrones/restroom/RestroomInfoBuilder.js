define(["require", "exports", "../Main"], function (require, exports, Main_1) {
    "use strict";
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
            var rateButton = "<div class=\"flexible-btn-container\"><a class=\"btn btn-default\" href=\"" + Main_1.Main.getBaseDir() + "restroom/rate/" + this.restroom.id + "\">Rate</a></div>";
            return header + description + gender + rating + rateButton;
        };
        return RestroomInfoBuilder;
    }());
    exports.RestroomInfoBuilder = RestroomInfoBuilder;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3Ryb29tL1Jlc3Ryb29tSW5mb0J1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFFQTtRQUVJLDZCQUFZLFFBQTBCO1lBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQzdCLENBQUM7UUFFTSx3Q0FBVSxHQUFqQjtZQUVJLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztZQUNwQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7Z0JBQzFCLFVBQVUsR0FBRyxNQUFNLENBQUM7WUFDeEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztnQkFDL0IsVUFBVSxHQUFHLFFBQVEsQ0FBQztZQUMxQixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO2dCQUMvQixVQUFVLEdBQUcsTUFBTSxDQUFDO1lBRXhCLElBQUksVUFBVSxHQUFXLEVBQUUsQ0FBQztZQUM1QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztnQkFDcEIsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2pELElBQUk7Z0JBQ0EsVUFBVSxHQUFHLGVBQWUsQ0FBQztZQUNqQyxJQUFJLE1BQU0sR0FBVyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQzlELElBQUksV0FBVyxHQUFXLG1DQUFtQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQztZQUNuRyxJQUFJLE1BQU0sR0FBVyw4QkFBOEIsR0FBRyxVQUFVLEdBQUcsTUFBTSxDQUFDO1lBQzFFLElBQUksTUFBTSxHQUFXLDhCQUE4QixHQUFHLFVBQVUsR0FBRyxNQUFNLENBQUM7WUFDMUUsSUFBSSxVQUFVLEdBQVcsNEVBQXVFLEdBQUcsV0FBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLGdCQUFnQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLG1CQUFrQixDQUFDO1lBQ2hMLE1BQU0sQ0FBQyxNQUFNLEdBQUcsV0FBVyxHQUFHLE1BQU0sR0FBRyxNQUFNLEdBQUcsVUFBVSxDQUFDO1FBQy9ELENBQUM7UUFDTCwwQkFBQztJQUFELENBNUJBLEFBNEJDLElBQUE7SUE1QlksMkJBQW1CLHNCQTRCL0IsQ0FBQSIsImZpbGUiOiJyZXN0cm9vbS9SZXN0cm9vbUluZm9CdWlsZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZXN0cm9vbVJlc3BvbnNlfSBmcm9tIFwiLi9SZXN0cm9vbVJlc3BvbnNlXCJcclxuaW1wb3J0IHtNYWlufSBmcm9tIFwiLi4vTWFpblwiO1xyXG5leHBvcnQgY2xhc3MgUmVzdHJvb21JbmZvQnVpbGRlciB7XHJcbiAgICBwcml2YXRlIHJlc3Ryb29tIDogUmVzdHJvb21SZXNwb25zZTtcclxuICAgIGNvbnN0cnVjdG9yKHJlc3Ryb29tOiBSZXN0cm9vbVJlc3BvbnNlKSB7XHJcbiAgICAgICAgdGhpcy5yZXN0cm9vbSA9IHJlc3Ryb29tO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDb250ZW50KCkgOiBzdHJpbmcge1xyXG5cclxuICAgICAgICB2YXIgZ2VuZGVyTmFtZSA9IFwiXCI7XHJcbiAgICAgICAgaWYgKHRoaXMucmVzdHJvb20uZ2VuZGVyID09IDApXHJcbiAgICAgICAgICAgIGdlbmRlck5hbWUgPSBcIk1lbnNcIjtcclxuICAgICAgICBlbHNlIGlmICh0aGlzLnJlc3Ryb29tLmdlbmRlciA9PSAxKVxyXG4gICAgICAgICAgICBnZW5kZXJOYW1lID0gXCJXb21lbnNcIjtcclxuICAgICAgICBlbHNlIGlmICh0aGlzLnJlc3Ryb29tLmdlbmRlciA9PSAyKVxyXG4gICAgICAgICAgICBnZW5kZXJOYW1lID0gXCJCb3RoXCI7XHJcblxyXG4gICAgICAgIHZhciByYXRpbmdUZXh0OiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIGlmICh0aGlzLnJlc3Ryb29tLnJhdGVkKVxyXG4gICAgICAgICAgICByYXRpbmdUZXh0ID0gdGhpcy5yZXN0cm9vbS5yYXRpbmcudG9TdHJpbmcoKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJhdGluZ1RleHQgPSBcIk5vdCBZZXQgUmF0ZWRcIjtcclxuICAgICAgICB2YXIgaGVhZGVyOiBzdHJpbmcgPSBcIjxoMz5cIiArIHRoaXMucmVzdHJvb20uYWRkcmVzcyArIFwiPC9oMz5cIjtcclxuICAgICAgICB2YXIgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiPHA+PHN0cm9uZz5EZXNjcmlwdGlvbjo8L3N0cm9uZz4gXCIgKyB0aGlzLnJlc3Ryb29tLmRlc2NyaXB0aW9uICsgXCI8L3A+XCI7XHJcbiAgICAgICAgdmFyIGdlbmRlcjogc3RyaW5nID0gXCI8cD48c3Ryb25nPkdlbmRlcjo8L3N0cm9uZz4gXCIgKyBnZW5kZXJOYW1lICsgXCI8L3A+XCI7XHJcbiAgICAgICAgdmFyIHJhdGluZzogc3RyaW5nID0gXCI8cD48c3Ryb25nPnJhdGluZzo8L3N0cm9uZz4gXCIgKyByYXRpbmdUZXh0ICsgXCI8L3A+XCI7XHJcbiAgICAgICAgdmFyIHJhdGVCdXR0b246IHN0cmluZyA9IGA8ZGl2IGNsYXNzPVwiZmxleGlibGUtYnRuLWNvbnRhaW5lclwiPjxhIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgaHJlZj1cImAgKyBNYWluLmdldEJhc2VEaXIoKSArIFwicmVzdHJvb20vcmF0ZS9cIiArIHRoaXMucmVzdHJvb20uaWQgKyBgXCI+UmF0ZTwvYT48L2Rpdj5gO1xyXG4gICAgICAgIHJldHVybiBoZWFkZXIgKyBkZXNjcmlwdGlvbiArIGdlbmRlciArIHJhdGluZyArIHJhdGVCdXR0b247XHJcbiAgICB9XHJcbn1cclxuIl19
