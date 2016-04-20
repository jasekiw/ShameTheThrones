using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

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