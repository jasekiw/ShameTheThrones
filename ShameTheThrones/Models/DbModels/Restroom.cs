using System;

namespace ShameTheThrones.Models.DbModels
{
    public partial class Restroom
    {
        public int id { get; set; }
        public Nullable<decimal> coordX { get; set; }
        public Nullable<decimal> coordY { get; set; }
        public string address { get; set; }
        public string city { get; set; }
        public Nullable<int> zipCode { get; set; }
        public string state { get; set; }
        public int userId { get; set; }
        public string description { get; set; }
        public byte gender { get; set; }
        public Nullable<System.DateTime> deletedAt { get; set; }
        public virtual User User { get; set; }
    }
}
