///<reference path="HomePage/HomePage.ts"/>
class Main {
    
    public homePage: HomePage;
    public addRestroomPage : AddRestroomPage;
    private static basedir : string;
    constructor(waitUntilLoaded) {
        if (waitUntilLoaded == undefined)
            Main.loadCompleted();
        else if (!waitUntilLoaded)
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
        $(".spinner").css("dispay", "none");
    }
    public static showLoader() : void {
        $(".spinner").css("dispay", "block");
    }
}