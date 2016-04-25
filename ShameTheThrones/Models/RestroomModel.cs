using ShameTheThrones.Models.DbContext;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Moq;
using ShameTheThrones.Models.rating;

namespace ShameTheThrones.Models
{
    public class RestroomModel
    {
        public int id;
        public string Address { get; set; }

        public int userId;

        [Required]
        public string City { get; set; }

        [Required]
        public string State { get; set; }

        [Required]
        public string ZipCode{ get; set; }

        [Required]
        public byte Gender { get; set; }


        [Required]
        public string Description { get; set; }
        [Required]
        public decimal coordX { get; set; }
        [Required]
        public decimal coordY { get; set; }

        public DateTime DeletedAt;

        public RestroomModel()
        {
            
        }

        public RestroomModel(Restroom restroom)
        {
            this.id = restroom.id;
            this.Address = restroom.address;
            this.City = restroom.city;
            this.Description = restroom.description;
            this.Gender = restroom.gender;
            this.State = restroom.state;
            this.ZipCode = restroom.zipCode.HasValue ? "" + restroom.zipCode.Value : "";
            this.userId = restroom.userId;
        }

        public RestroomModel(int id)
        {
            using (shamethethronesEntities db = new shamethethronesEntities())
            {
                Restroom restroom = db.Restrooms.Where(x => x.id == id).First(x => x.deletedAt == null);
               
                this.id = restroom.id;
                this.Address = restroom.address;
                this.City = restroom.city;
                this.Description = restroom.description;
                this.Gender = restroom.gender;
                this.State = restroom.state;
                this.ZipCode = restroom.zipCode.HasValue ? "" + restroom.zipCode.Value : "";
                this.userId = restroom.userId;
            }
        }

        public void AddRestroom(RestroomModel bathroom)
        {
            using (shamethethronesEntities db = new shamethethronesEntities())
            {
                Restroom newBathroom = new Restroom();
                newBathroom.userId = bathroom.userId;
                newBathroom.address = bathroom.Address;
                newBathroom.city = bathroom.City; // commented out until db is changed 
                newBathroom.state = bathroom.State; 
                newBathroom.zipCode = Int32.Parse(bathroom.ZipCode); 
                newBathroom.gender = bathroom.Gender;
                newBathroom.description = bathroom.Description;
                newBathroom.coordX = bathroom.coordX;
                newBathroom.coordY = bathroom.coordY;
                db.Restrooms.Add(newBathroom);
                db.SaveChanges(); //until testing is done
                bathroom.id = newBathroom.id; // sets the id so we can get it later
            }
        }

        public double getAverageRating()
        {
            double average = -1;
            using (shamethethronesEntities db = new shamethethronesEntities())
            {
                var ratingAverageResult =
                    db.Database.SqlQuery<RatingAverageModel>(
                        "SELECT SUM(dbo.Rating.ratingValue) as sumOfRatings, COUNT(*) as total FROM dbo.Rating WHERE dbo.Rating.restroomId = " +
                        this.id).First();
                average = Math.Truncate((100 * ratingAverageResult.getAverage()) / 100);
            }
            return average;
        }
     
        public static RatingAverageModel getRatingObject(int id)
        {
            double average = -1;
            using (shamethethronesEntities db = new shamethethronesEntities())
            {
                var ratingAverageResult =
                    db.Database.SqlQuery<RatingAverageModel>(
                        "SELECT SUM(dbo.Rating.ratingValue) as sumOfRatings, COUNT(*) as total FROM dbo.Rating WHERE dbo.Rating.restroomId = " +
                        id).First();
                return ratingAverageResult;
            }
        }

        public RestroomModel getRestroom(int restroomId)
        {
            using (shamethethronesEntities db = new shamethethronesEntities())
            {
                Restroom restroomModel = db.Restrooms.Where(x => x.id == restroomId).Single();

                var restroom = new RestroomModel();

                restroom.id = restroomModel.id;
                restroom.Address = restroomModel.address;
                restroom.City = restroomModel.city;
                restroom.Description = restroomModel.description;
                restroom.Gender = restroomModel.gender;
               

                return restroom;
            } 
        }


    }// RestroomModel
}