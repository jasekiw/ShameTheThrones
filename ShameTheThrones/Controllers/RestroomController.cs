using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ShameTheThrones.Models;
using ShameTheThrones.Models.DbContext;

namespace ShameTheThrones.Controllers
{
    public class RestroomController : Controller
    {
        // GET: Restroom
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AddBathroom()
        {
            return View();
        }

        public ActionResult RateBathroom()
        {
            return View();
        }

        public ActionResult Search(RestroomSearchModel search)
        {
            shamethethronesEntities db = new shamethethronesEntities();
            List<Restroom> restrooms = new List<Restroom>();

            var query =
                db.Restrooms
                    .Where(x => search.SWLat <= x.coordX)
                    .Where(x => search.SWLong <= x.coordY)
                    .Where(x => search.NELat >= x.coordX)
                    .Where(x => search.NELong >= x.coordY)
                    .Take(100);
            restrooms = query.ToList();
            List<RestroomSearchResultModel> restroomsResults = new List<RestroomSearchResultModel>();
            foreach (var restroom in restrooms)
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
                restroomsResults.Add(restroomResult);
            }

            return Json(restroomsResults.ToArray(), JsonRequestBehavior.AllowGet);
        }

    }
}
