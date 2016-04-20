using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using ShameTheThrones.Models;
using System.Web.Security;
//using Newtonsoft.Json;

namespace ShameTheThrones.Controllers
{
    public class UserController : Controller
    {
        // GET: User
        public ActionResult Index()
        {
            return View();
        }
        
        [HttpGet]
        public ActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Register(UserModel user)
        {
            if (ModelState.IsValid)
            {
                user.Register(user);
                return RedirectToAction("Index", "Home");
            }
            
            return View(user);
        }
        
        [HttpGet]
        public ActionResult LogIn()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(UserModel user)
        {
          
//            if (ModelState.IsValid)
//            {
                if (user.isValid(user.Email, user.Password))
                {

                    var userDat = new UserData();
                    userDat.UserName = user.UserName;
                    userDat.Email = user.Email;
                    userDat.Id = user.getId();

                string userData = new JavaScriptSerializer().Serialize(userDat);

                FormsAuthenticationTicket authTicket = new
                    FormsAuthenticationTicket(1, //version
                                              userDat.Id.ToString(), // user name
                                              DateTime.Now,             //creation
                                              DateTime.Now.AddMinutes(30), //Expiration
                                              true, userData); //storing the json data

                string encTicket = FormsAuthentication.Encrypt(authTicket);

                var cookie = new HttpCookie(FormsAuthentication.FormsCookieName, encTicket)
                {
                    Expires = authTicket.Expiration,
                    Path = FormsAuthentication.FormsCookiePath
                };
             
               
                Response.Cookies.Add(cookie);
              

                return RedirectToAction("Index", "Home");
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Log In information is incorrect");
                }
//            }
            return View(user);
        }

        public ActionResult LogOut()
        {
            FormsAuthentication.SignOut();
            Session.Clear();
            return RedirectToAction("Index", "Home");
        }
        [Authorize]
        public ActionResult Account()
        {
            return View();
        }
    }
}