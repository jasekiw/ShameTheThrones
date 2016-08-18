using System.ComponentModel.DataAnnotations;
using System.Linq;
using ShameTheThrones.Models.DbContext;
using ShameTheThrones.Models.DbModels;

namespace ShameTheThrones.Models.rating
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
            using (var db = new shamethethronesContext())
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
            using (var db = new shamethethronesContext())
            {
                var ratings = db.Ratings.Take(50).OrderByDescending(e => e.id).ToList();
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