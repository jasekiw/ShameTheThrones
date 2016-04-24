define(["require", "exports", "./home/HomePage", "./restroom/AddRestroomPage"], function (require, exports, HomePage_1, AddRestroomPage_1) {
    "use strict";
    var Main = (function () {
        function Main() {
            var _this = this;
            this.constructHomePage = function () {
                _this.homePage = new HomePage_1.HomePage();
            };
            this.classes = $("body").attr("class");
            if (this.contains("home")) {
                this.constructHomePage();
            }
            if (this.contains("restroom-add")) {
                this.constructAddRestroomPage();
            }
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
            $(".spinner").css("display", "none");
        };
        Main.showLoader = function () {
            $(".spinner").css("dispay", "block");
        };
        Main.prototype.contains = function (toFind) {
            if (this.classes.indexOf(toFind) === -1)
                return false;
            else
                return true;
        };
        return Main;
    }());
    exports.Main = Main;
    Main.setBaseDir("/");
    var main = new Main();
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFJQTtRQU1RO1lBTlIsaUJBa0RLO1lBOUJVLHNCQUFpQixHQUFHO2dCQUN2QixLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksbUJBQVEsRUFBRSxDQUFDO1lBRW5DLENBQUMsQ0FBQTtZQWZPLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDN0IsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztZQUNwQyxDQUFDO1lBR0QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3pCLENBQUM7UUFNTSx1Q0FBd0IsR0FBL0I7WUFDSSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksaUNBQWUsRUFBRSxDQUFDO1FBQ2pELENBQUM7UUFDYSxlQUFVLEdBQXhCLFVBQXlCLE9BQWU7WUFDcEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDM0IsQ0FBQztRQUNhLGVBQVUsR0FBeEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDO1FBQ0Q7O1dBRUc7UUFDVyxrQkFBYSxHQUEzQjtZQUNJLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRXpDLENBQUM7UUFDYSxlQUFVLEdBQXhCO1lBQ0ksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDekMsQ0FBQztRQUNPLHVCQUFRLEdBQWhCLFVBQWtCLE1BQWM7WUFDNUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDakIsSUFBSTtnQkFDQSxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3BCLENBQUM7UUFDTCxXQUFDO0lBQUQsQ0FsREosQUFrREssSUFBQTtJQWxEUSxZQUFJLE9Ba0RaLENBQUE7SUFDTCxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMiLCJmaWxlIjoiTWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SG9tZVBhZ2V9IGZyb20gIFwiLi9ob21lL0hvbWVQYWdlXCI7XHJcbmltcG9ydCB7QWRkUmVzdHJvb21QYWdlfSBmcm9tIFwiLi9yZXN0cm9vbS9BZGRSZXN0cm9vbVBhZ2VcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgTWFpbiB7XHJcblxyXG4gICAgICAgIHB1YmxpYyBob21lUGFnZTogSG9tZVBhZ2U7XHJcbiAgICAgICAgcHVibGljIGFkZFJlc3Ryb29tUGFnZTogQWRkUmVzdHJvb21QYWdlO1xyXG4gICAgICAgIHByaXZhdGUgY2xhc3Nlczogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGJhc2VkaXI6IHN0cmluZztcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NlcyA9ICQoXCJib2R5XCIpLmF0dHIoXCJjbGFzc1wiKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29udGFpbnMoXCJob21lXCIpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnN0cnVjdEhvbWVQYWdlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAodGhpcy5jb250YWlucyhcInJlc3Ryb29tLWFkZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25zdHJ1Y3RBZGRSZXN0cm9vbVBhZ2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICBNYWluLmxvYWRDb21wbGV0ZWQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGNvbnN0cnVjdEhvbWVQYWdlID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmhvbWVQYWdlID0gbmV3IEhvbWVQYWdlKCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgXHJcbiAgICAgICAgcHVibGljIGNvbnN0cnVjdEFkZFJlc3Ryb29tUGFnZSgpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRSZXN0cm9vbVBhZ2UgPSBuZXcgQWRkUmVzdHJvb21QYWdlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc2V0QmFzZURpcihiYXNlZGlyOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgTWFpbi5iYXNlZGlyID0gYmFzZWRpcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBnZXRCYXNlRGlyKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTWFpbi5iYXNlZGlyO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEaXNhYmxlZCB0aGUgc3Bpbm5lciB0byBzaG93IHRoYXQgdGhlIHBhZ2UgaXMgbG9hZGVkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBsb2FkQ29tcGxldGVkKCkge1xyXG4gICAgICAgICAgICAkKFwiLnNwaW5uZXJcIikuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHNob3dMb2FkZXIoKTogdm9pZCB7XHJcbiAgICAgICAgICAgICQoXCIuc3Bpbm5lclwiKS5jc3MoXCJkaXNwYXlcIiwgXCJibG9ja1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBjb250YWlucyggdG9GaW5kOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2xhc3Nlcy5pbmRleE9mKHRvRmluZCkgPT09IC0xKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbk1haW4uc2V0QmFzZURpcihcIi9cIik7XHJcbnZhciBtYWluID0gbmV3IE1haW4oKTsiXX0=
