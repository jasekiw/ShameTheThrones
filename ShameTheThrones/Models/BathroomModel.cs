using ShameTheThrones.Models.DbContext;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ShameTheThrones.Models
{
    public class BathroomModel
    {

        public string Address { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string State { get; set; }

        [Required]
        public string ZipCode{ get; set; }

        [Required]
        public Byte Gender { get; set; }

        //public IEnumerable<String> = // may not need

        [Required]
        public string Descritption { get; set; }

        public DateTime DeletedAt;

        public void AddBathroom(BathroomModel bathroom)
        {
            using (shamethethronesEntities db = new shamethethronesEntities())
            {
                Restroom newBathroom = new Restroom();

                newBathroom.address = bathroom.Address;
                //newBathroom.city= bathroom.City; // commented out until db is changed 
                //newBathroom.state = bathroom.State; 
                //newBathroom.zip = bathroom.ZipCode; 
                newBathroom.gender = bathroom.Gender;
                newBathroom.description = bathroom.Descritption;
                
                db.Restrooms.Add(newBathroom);
                //db.SaveChanges(); //until testing is done
            }
        }

        
    }// BathroomModel
}