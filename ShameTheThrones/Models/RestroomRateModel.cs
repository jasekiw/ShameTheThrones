using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShameTheThrones.Models
{
    public class RestroomRateModel
    {
        public string Address { get; set; }
       
        public string City { get; set; }
      
        public string State { get; set; }

        public string ZipCode { get; set; }
   
        public byte Gender { get; set; }
     
        public string Descritption { get; set; }

        public DateTime DeletedAt;
    }
}