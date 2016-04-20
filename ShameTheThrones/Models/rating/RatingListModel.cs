using System.Collections.Generic;

namespace ShameTheThrones.Models.rating
{
    public class RatingListModel
    {
        public List<RatingModel> ratings { get; set; }

        public RatingListModel()
        {
            this.ratings = new List<RatingModel>();
        }

        public void add(RatingModel rating)
        {
            this.ratings.Add(rating);
        }
    }
}