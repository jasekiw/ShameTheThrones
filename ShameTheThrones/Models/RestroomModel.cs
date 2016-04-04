﻿using ShameTheThrones.Models.DbContext;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Moq;

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

        //public IEnumerable<String> = // may not need

        [Required]
        public string Descritption { get; set; }

        public DateTime DeletedAt;

        public RestroomModel()
        {
            
        }

        public RestroomModel(int id)
        {
            using (shamethethronesEntities db = new shamethethronesEntities())
            {
                Restroom restroom = db.Restrooms.Where(x => x.id == id).First(x => x.deletedAt == null);
               
                this.id = restroom.id;
                this.Address = restroom.address;
                this.City = restroom.city;
                this.Descritption = restroom.description;
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

                newBathroom.address = bathroom.Address;
                newBathroom.city = bathroom.City; // commented out until db is changed 
                newBathroom.state = bathroom.State; 
                newBathroom.zipCode = Int32.Parse(bathroom.ZipCode); 
                newBathroom.gender = bathroom.Gender;
                newBathroom.description = bathroom.Descritption;
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
                        "SELECT SUM(dbo.Rating.rating) as sumOfRatings, COUNT(*) as total FROM dbo.Rating WHERE dbo.Rating.restroomId = " +
                        this.id).First();
                average = ratingAverageResult.getAverage();
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
                        "SELECT SUM(dbo.Rating.rating) as sumOfRatings, COUNT(*) as total FROM dbo.Rating WHERE dbo.Rating.restroomId = " +
                        id).First();
                return ratingAverageResult;
            }
        }
        

    }// BathroomModel
}