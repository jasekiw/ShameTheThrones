using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Microsoft.SqlServer.Server;
using ShameTheThrones.Models.DbContext;
using ShameTheThrones.Models.rating;

namespace ShameTheThrones.Models
{
    public class RatingModel
    {
        public RatingModel()
        {
            
        }

        public RatingModel(Rating rating)
        {
            this.RestroomId = rating.restroomId;
            this.Comment = rating.comment;
            this.Rating = rating.ratingValue;
            this.Title = rating.title;
            this.UserId = rating.userId;
        }
        [Required]
        public int RestroomId { get; set; }
        [Required]
        public string Title { get; set; }
        public string Comment { get; set; }
        [Required]
        public int Rating { get; set; }
        public int UserId; // later on will be required

        public void add()
        {
            using (var db = new shamethethronesEntities())
            {
                var rating = new Rating();
                rating.userId = this.UserId;
                rating.comment = this.Comment;
                rating.restroomId = this.RestroomId;
                rating.title = this.Title;
                rating.ratingValue = (byte) this.Rating;
                db.Ratings.Add(rating);
                db.SaveChanges();
            }
        }

        public static RatingListModel getLatestRatings()
        {
            var ratingList = new RatingListModel();
            using (var db = new shamethethronesEntities())
            {
                var ratings = db.Ratings.Take(50).ToList();
                foreach(var rating in ratings)
                {
                    var ratingModel = new RatingModel(rating);
                    ratingList.add(ratingModel);
                }
            }
            return ratingList;
        }
    

    }
}