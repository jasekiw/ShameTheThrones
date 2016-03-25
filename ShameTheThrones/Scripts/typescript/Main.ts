///<reference path="HomePage/HomePage.ts"/>
class Main {
    
    public homePage: HomePage;
    public constructHomePage(markerImg : string): void {
        this.homePage = new HomePage(markerImg);
      
    }
}