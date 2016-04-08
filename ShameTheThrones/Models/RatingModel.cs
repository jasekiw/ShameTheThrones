using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Microsoft.SqlServer.Server;
using ShameTheThrones.Models.DbContext;

namespace ShameTheThrones.Models
{
    public class RatingModel
    {
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
                rating.rating1 = (byte) this.Rating;
                db.Ratings.Add(rating);
                db.SaveChanges();
            }
        }

    }
}