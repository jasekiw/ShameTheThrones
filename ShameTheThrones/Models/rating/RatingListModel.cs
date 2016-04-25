using System.Collections.Generic;
using ShameTheThrones.Models.DbContext;

namespace ShameTheThrones.Models.rating
{
    public class RatingListModel
    {
        public List<RatingModel> ratings { get; set; }

        public RatingListModel()
        {
            this.ratings = new List<RatingModel>();
        }

        public RatingListModel(List<Rating> ratings)
        {
            this.ratings = new List<RatingModel>();
            foreach (var rating in ratings)
                this.ratings.Add(new RatingModel(rating));
        }

        public void add(RatingModel rating)
        {
            this.ratings.Add(rating);
        }
    }
}