define(["require", "exports", "../Main"], function (require, exports, Main_1) {
    "use strict";
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
    }());
    exports.RestroomIcon = RestroomIcon;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3Ryb29tL1Jlc3Ryb29tSWNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQUdBO1FBQUE7UUFxQ0EsQ0FBQztRQW5DVSw4QkFBTyxHQUFkLFVBQWUsTUFBYyxFQUFFLE1BQWUsRUFBRSxLQUFjO1lBQzFELElBQUksT0FBTyxHQUFXLFdBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUN4QyxJQUFJLFdBQVcsR0FBRyxPQUFPLEdBQUcsK0JBQStCLENBQUM7WUFDNUQsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDYixLQUFLLENBQUM7b0JBQ0YsV0FBVyxJQUFJLE1BQU0sQ0FBQztvQkFDdEIsS0FBSyxDQUFDO2dCQUNWLEtBQUssQ0FBQztvQkFDRixXQUFXLElBQUksUUFBUSxDQUFDO29CQUN4QixLQUFLLENBQUM7Z0JBQ1YsS0FBSyxDQUFDO29CQUNGLFdBQVcsSUFBSSxTQUFTLENBQUM7b0JBQ3pCLEtBQUssQ0FBQztnQkFDVjtvQkFDSSxXQUFXLElBQUksTUFBTSxDQUFDO29CQUN0QixLQUFLLENBQUM7WUFDZCxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNULFdBQVcsSUFBSSxVQUFVLENBQUM7Z0JBQzFCLE1BQU0sQ0FBQyxXQUFXLENBQUM7WUFDdkIsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQ1gsV0FBVyxJQUFJLFNBQVMsQ0FBQztZQUM3QixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDaEIsV0FBVyxJQUFJLFlBQVksQ0FBQztZQUNoQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDaEIsV0FBVyxJQUFJLFVBQVUsQ0FBQztZQUM5QixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDaEIsV0FBVyxJQUFJLFdBQVcsQ0FBQztZQUMvQixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztnQkFDakIsV0FBVyxJQUFJLFlBQVksQ0FBQztZQUNoQyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQ3ZCLENBQUM7UUFDTCxtQkFBQztJQUFELENBckNBLEFBcUNDLElBQUE7SUFyQ1ksb0JBQVksZUFxQ3hCLENBQUEiLCJmaWxlIjoicmVzdHJvb20vUmVzdHJvb21JY29uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7TWFpbn0gZnJvbSBcIi4uL01haW5cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSZXN0cm9vbUljb24ge1xyXG4gICAgICBcclxuICAgIHB1YmxpYyBnZXRJY29uKHJhdGluZzogbnVtYmVyLCBnZW5kZXIgOiBudW1iZXIsIHJhdGVkOiBib29sZWFuKSA6IHN0cmluZyB7XHJcbiAgICAgICAgdmFyIGJhc2VEaXI6IHN0cmluZyA9IE1haW4uZ2V0QmFzZURpcigpO1xyXG4gICAgICAgIHZhciBiYXNlSWNvblVybCA9IGJhc2VEaXIgKyBcIkNvbnRlbnQvaW1nL3Jlc3Ryb29tLW1hcmtlcnMvXCI7XHJcbiAgICAgICAgc3dpdGNoIChnZW5kZXIpIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgYmFzZUljb25VcmwgKz0gXCJtZW4vXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgYmFzZUljb25VcmwgKz0gXCJ3b21lbi9cIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICBiYXNlSWNvblVybCArPSBcInVuaXNleC9cIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYmFzZUljb25VcmwgKz0gXCJtZW4vXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghcmF0ZWQpIHtcclxuICAgICAgICAgICAgYmFzZUljb25VcmwgKz0gXCJncmF5LnBuZ1wiO1xyXG4gICAgICAgICAgICByZXR1cm4gYmFzZUljb25Vcmw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocmF0aW5nIDwgMSkgXHJcbiAgICAgICAgICAgIGJhc2VJY29uVXJsICs9IFwicmVkLnBuZ1wiO1xyXG4gICAgICAgIGVsc2UgaWYgKHJhdGluZyA8IDIpIFxyXG4gICAgICAgICAgICBiYXNlSWNvblVybCArPSBcInB1cnBsZS5wbmdcIjtcclxuICAgICAgICBlbHNlIGlmIChyYXRpbmcgPCAzKSBcclxuICAgICAgICAgICAgYmFzZUljb25VcmwgKz0gXCJibHVlLnBuZ1wiO1xyXG4gICAgICAgIGVsc2UgaWYgKHJhdGluZyA8IDQpIFxyXG4gICAgICAgICAgICBiYXNlSWNvblVybCArPSBcImdyZWVuLnBuZ1wiO1xyXG4gICAgICAgIGVsc2UgaWYgKHJhdGluZyA8PSA1KSBcclxuICAgICAgICAgICAgYmFzZUljb25VcmwgKz0gXCJ5ZWxsb3cucG5nXCI7XHJcbiAgICAgICAgcmV0dXJuIGJhc2VJY29uVXJsO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
