//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ShameTheThrones.Models.DbContext
{
    using System;
    using System.Collections.Generic;
    
    public partial class Restroom
    {
        public int id { get; set; }
        public Nullable<decimal> coordX { get; set; }
        public Nullable<decimal> coordY { get; set; }
        public string address { get; set; }
        public int userId { get; set; }
        public string description { get; set; }
        public byte gender { get; set; }
        public Nullable<System.DateTime> deletedAt { get; set; }
    
        public virtual User User { get; set; }
    }
}