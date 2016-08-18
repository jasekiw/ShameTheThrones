using System;
using System.Collections.Generic;

namespace ShameTheThrones.Models.DbModels
{
    public partial class User
    {
        public User()
        {
            this.Ratings = new List<Rating>();
            this.Restrooms = new List<Restroom>();
        }

        public int id { get; set; }
        public string username { get; set; }
        public string email { get; set; }
        public string pasword { get; set; }
        public Nullable<System.DateTime> deletedAt { get; set; }
        public virtual ICollection<Rating> Ratings { get; set; }
        public virtual ICollection<Restroom> Restrooms { get; set; }
    }
}
