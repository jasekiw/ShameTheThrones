import {RestroomResponse} from "./RestroomResponse"
import {Main} from "../Main";
export class RestroomInfoBuilder {
    private restroom : RestroomResponse;
    constructor(restroom: RestroomResponse) {
        this.restroom = restroom;
    }

    public getContent() : string {

        var genderName = "";
        if (this.restroom.gender == 0)
            genderName = "Mens";
        else if (this.restroom.gender == 1)
            genderName = "Womens";
        else if (this.restroom.gender == 2)
            genderName = "Both";

        var ratingText: string = "";
        if (this.restroom.rated)
            ratingText = this.restroom.rating.toString();
        else
            ratingText = "Not Yet Rated";
        var header: string = "<h3>" + this.restroom.address + "</h3>";
        var description: string = "<p><strong>Description:</strong> " + this.restroom.description + "</p>";
        var gender: string = "<p><strong>Gender:</strong> " + genderName + "</p>";
        var rating: string = "<p><strong>rating:</strong> " + ratingText + "</p>";
        var rateButton: string = `<div class="flexible-btn-container"><a class="btn btn-default" href="` + Main.getBaseDir() + "restroom/rate/" + this.restroom.id + `">Rate</a></div>`;
        return header + description + gender + rating + rateButton;
    }
}
