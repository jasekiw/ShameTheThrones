using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Common.EntitySql;
using System.Linq;
using System.Web;

namespace ShameTheThrones.Models
{
    public class RatingAverageModel
    {
        public int? sumOfRatings { get; set; }
        public int? total { get; set; }

        public double getAverage()
        {
            if(sumOfRatings.HasValue)
            return (double) sumOfRatings/(double) total;
            else
                return 0;
            
        }

        public bool rated()
        {
            return sumOfRatings.HasValue;
        }
    }
}