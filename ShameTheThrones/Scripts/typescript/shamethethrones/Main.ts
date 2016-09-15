import {HomePage} from  "./home/HomePage";
import {AddRestroomPage} from "./restroom/AddRestroomPage";
import {ShowRestroomPage} from "restroom/ShowRestroomPage";

export class Main {

        public homePage: HomePage;
        public addRestroomPage: AddRestroomPage;
        public showRestroomPage : ShowRestroomPage;
        private classes: string;
        private static basedir: string;
        constructor() {
            this.initHandleHeight();
                this.classes = $("body").attr("class");
            if (this.contains("home")) {
                this.constructHomePage();
            }
                
            if (this.contains("restroom-add")) {
                this.constructAddRestroomPage();
            }
            if (this.contains("show-restroom")) {
                this.showRestroomPage = new ShowRestroomPage();
            }
                

            Main.loadCompleted();
        }
        public constructHomePage = (): void => {
            this.homePage = new HomePage();

        }
      
        public constructAddRestroomPage() {
            this.addRestroomPage = new AddRestroomPage();
        }
        public static setBaseDir(basedir: string) {
            Main.basedir = basedir;
        }
        public static getBaseDir() {
            return Main.basedir;
        }
        /**
         * Disabled the spinner to show that the page is loaded
         */
        public static loadCompleted() {
            $(".spinner").hide();

        }
        public static showLoader(): void {
            $(".spinner").show();
        }
        private contains( toFind: string) {
            if (this.classes.indexOf(toFind) === -1)
                return false;
            else
                return true;
        }
        private handleHeight() {
            $(".body-wrapper").css("min-height", "0");
            setTimeout(() => {
                if (window.outerWidth < 500 && $("body").outerHeight() < window.innerHeight) {
                    let bodyHeight = $("body").outerHeight();
                    let wrapperHeight = $(".body-wrapper").outerHeight();
                    let offset = $("body").height() - $(".body-wrapper").height();
                    $(".body-wrapper").css("min-height", window.innerHeight - offset);
                }
            }, 3);
        }
        private initHandleHeight() {
            this.handleHeight();
            let lastResizeTime = 0;
            $(window).resize(() => { // debounce the resize to 300 milliseconds
                lastResizeTime = new Date().getTime();
                setTimeout(() => {
                    let offset = (new Date()).getTime() - lastResizeTime;

                    if (offset >= 300)
                        this.handleHeight();

                },
                    300);
            });

        }
    }
Main.setBaseDir("/");
var main = new Main();