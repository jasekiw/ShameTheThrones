﻿using System;
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
            RatingModel rating = new RatingModel();
            rating.RestroomId = id;
            return View(rating);
        }

        [HttpPost]
        public ActionResult NewRating(RatingModel ratingModel)
        {
            string val1 = System.Web.HttpContext.Current.User.Identity.Name;
            int userId = Int32.Parse(val1);
            ratingModel.UserId = userId;
            ratingModel.add();
            return RedirectToAction("Index", "Restroom");
        }
      
        public ActionResult Search(RestroomSearchModel search)
        {
            return Json(search.GetRestrooms().ToArray(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult Show(int id)
        {
            RestroomModel restroom = new RestroomModel(id);
            return View(restroom);
        }

    }
}
