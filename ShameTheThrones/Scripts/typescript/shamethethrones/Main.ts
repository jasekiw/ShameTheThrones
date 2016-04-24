import {HomePage} from  "./home/HomePage";
import {AddRestroomPage} from "./restroom/AddRestroomPage";


export class Main {

        public homePage: HomePage;
        public addRestroomPage: AddRestroomPage;
        private classes: string;
        private static basedir: string;
        constructor() {
           
                this.classes = $("body").attr("class");
            if (this.contains("home")) {
                this.constructHomePage();
            }
                
            if (this.contains("restroom-add")) {
                this.constructAddRestroomPage();
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
            $(".spinner").css("display", "none");

        }
        public static showLoader(): void {
            $(".spinner").css("dispay", "block");
        }
        private contains( toFind: string) {
            if (this.classes.indexOf(toFind) === -1)
                return false;
            else
                return true;
        }
    }
Main.setBaseDir("/");
var main = new Main();