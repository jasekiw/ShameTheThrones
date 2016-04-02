namespace shamethethrones.restroom {
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
            console.log(this.restroom.rated);
            if (this.restroom.rated)
                ratingText = this.restroom.rating.toString();
            else
                ratingText = "Not Yet Rated";
            var header: string = "<h3>" + this.restroom.address + "</h3>";
            var description: string = "<p><strong>Description:</strong> " + this.restroom.description + "</p>";
            var gender: string = "<p><strong>Gender:</strong> " + genderName + "</p>";
            var rating: string = "<p><strong>rating:</strong> " + ratingText + "</p>";
            return header + description + gender + rating;
        }
    }
}