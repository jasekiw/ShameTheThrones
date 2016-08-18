using System;

namespace ShameTheThrones.Models.DbModels
{
    public partial class Rating
    {
        public int id { get; set; }
        public string title { get; set; }
        public string comment { get; set; }
        public int restroomId { get; set; }
        public byte ratingValue { get; set; }
        public int userId { get; set; }
        public Nullable<System.DateTime> deletedAt { get; set; }
        public virtual User User { get; set; }
    }
}
