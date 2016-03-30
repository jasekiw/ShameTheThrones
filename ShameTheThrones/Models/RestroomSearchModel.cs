using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ShameTheThrones.Models.DbContext;

namespace ShameTheThrones.Models
{
    public class RestroomSearchModel
    {
        public decimal NELong { get; set; }
        public decimal NELat { get; set; }
        public decimal SWLong { get; set; }
        public decimal SWLat { get; set; }

        public List<RestroomSearchResultModel> GetRestrooms()
        {
            List<RestroomSearchResultModel> restroomResults = new List<RestroomSearchResultModel>();
            using (var db = new shamethethronesEntities())
            {
                List<Restroom> restrooms = new List<Restroom>();

                var query =
                    db.Restrooms
                        .Where(x => this.SWLat <= x.coordX)
                        .Where(x => this.SWLong <= x.coordY)
                        .Where(x => this.NELat >= x.coordX)
                        .Where(x => this.NELong >= x.coordY)
                        .Take(100);
                restrooms = query.ToList();
                restroomResults = RestroomSearchResultModel.getListFromDatabaseModelsList(restrooms);
            }
            return restroomResults;
        } 
    }
}