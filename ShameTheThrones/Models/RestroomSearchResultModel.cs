using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ShameTheThrones.Models.DbContext;

namespace ShameTheThrones.Models
{
    public class RestroomSearchResultModel
    {
        public int id;
        public decimal coordX;
        public decimal coordY;
        public string address;
        public string description;
        public byte gender;

        public static RestroomSearchResultModel getFromDatabaseModel(Restroom restroom)
        {
            var restroomResult = new RestroomSearchResultModel();
            restroomResult.coordX = restroom.coordX.Value;
            restroomResult.coordY = restroom.coordY.Value;
            restroomResult.id = restroom.id;
            restroomResult.address = restroom.address;
            restroomResult.gender = restroom.gender;
            restroomResult.description = restroom.description.Length > 100
                ? restroom.description.Substring(0, 100) + "..."
                : restroom.description;
            return restroomResult;
        }

        public static List<RestroomSearchResultModel> getListFromDatabaseModelsList(List<Restroom> restrooms)
        {
            List<RestroomSearchResultModel> restroomsResults = new List<RestroomSearchResultModel>();
            foreach (var restroom in restrooms)  
                restroomsResults.Add(RestroomSearchResultModel.getFromDatabaseModel(restroom));
            return restroomsResults;
        }
    }
}