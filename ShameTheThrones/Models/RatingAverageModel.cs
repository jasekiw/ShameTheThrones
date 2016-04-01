using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Common.EntitySql;
using System.Linq;
using System.Web;

namespace ShameTheThrones.Models
{
    public class RatingAverageModel
    {
        public int sumOfRatings { get; set; }
        public int total { get; set; }

        public double getAverage()
        {
            return (double) sumOfRatings/(double) total;
        }

        public bool rated()
        {
            return total > 0;
        }
    }
}