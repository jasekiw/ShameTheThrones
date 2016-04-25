using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShameTheThrones.Models
{
    public class RestroomWithRatingModel
    {
        public RestroomModel restroomModel { get; set; }
        public rating.RatingModel ratingModel { get; set; }
    }
}