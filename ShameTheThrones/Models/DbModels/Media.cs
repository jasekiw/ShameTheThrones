using System;

namespace ShameTheThrones.Models.DbModels
{
    public partial class Media
    {
        public int id { get; set; }
        public string src { get; set; }
        public int parentId { get; set; }
        public byte parentTable { get; set; }
        public Nullable<System.DateTime> deletedAt { get; set; }
    }
}
