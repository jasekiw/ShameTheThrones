using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

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

    }
}