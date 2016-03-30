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
        [HttpGet]
        public ActionResult Add()
        {
            return View();
        }
        [HttpPost]
        public ActionResult New(RestroomModel restroom)
        {
            
            restroom.AddRestroom(restroom);
            return RedirectToAction("Rate", new { id = restroom.id });
        }

        public ActionResult Rate(int id)
        {
            RestroomModel restroom = new RestroomModel();
            restroom.id = id;
            double averageRating = restroom.getAverageRating();
            return View();
        }
      
        public ActionResult Search(RestroomSearchModel search)
        {
            return Json(search.GetRestrooms().ToArray(), JsonRequestBehavior.AllowGet);
        }

    }
}
