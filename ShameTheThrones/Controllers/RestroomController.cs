﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ShameTheThrones.Infrastructure;
using ShameTheThrones.Models;
using ShameTheThrones.Models.rating;

namespace ShameTheThrones.Controllers
{
    public class RestroomController : Controller
    {
        // GET: Restroom
        public ActionResult Index(int id)
        {
            var model = new RestroomModel();
            var viewModel = model.getRestroomWithRating(id);
            
            return View(viewModel);
        }
        [HttpGet, Authorize]
        public ActionResult Add()
        {
            return View();
        }
        [HttpPost, Authorize]
        public ActionResult New(RestroomModel restroom)
        {
            restroom.userId = User.Identity.getUser().Id;
            restroom.AddRestroom(restroom);
            return RedirectToAction("Rate", new { id = restroom.id });
        }
        [Authorize]
        public ActionResult Rate(int id)
        {
            RatingModel rating = new RatingModel();
            rating.RestroomId = id;
            return View(rating);
        }
        
        [HttpPost, Authorize]
        public ActionResult NewRating(RatingModel ratingModel)
        {
            string val1 = System.Web.HttpContext.Current.User.Identity.Name;
            int userId = Int32.Parse(val1);
            ratingModel.UserId = userId;
            ratingModel.add();

            var model = new RestroomModel();
            var viewModel = model.getRestroomWithRating(ratingModel.RestroomId);


            return RedirectToAction("Show", "Restroom", new { id = viewModel.restroomModel.id });
        }
      
        public ActionResult Search(RestroomSearchModel search)
        {
            return Json(search.GetRestrooms().ToArray(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult Show(int id)
        {
            var model = new RestroomModel();
            var viewModel = model.getRestroomWithRating(id);

            return View(viewModel);
        }

        public ActionResult Ratings()
        {

            return View(RatingModel.getLatestRatings());
        }

    }
}
