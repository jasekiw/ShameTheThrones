using Microsoft.VisualStudio.TestTools.UnitTesting;
using ShameTheThrones.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace ShameTheThrones.Controllers.Tests
{
    [TestClass()]
    public class HomeControllerTests
    {
        [TestMethod()]
        public void IndexTest()
        {
            HomeController controller = new HomeController();
            ActionResult result = controller.Index();
            Assert.AreEqual("Index", result.GetType());
        }

        [TestMethod()]
        public void HallofShameTest()
        {
            HomeController controller = new HomeController();
            ActionResult result = controller.HallofShame();
            Assert.AreEqual("HallofShame", result.GetType());
        }

        [TestMethod()]
        public void AboutTest()
        {
            HomeController controller = new HomeController();
            ActionResult result = controller.About();
            Assert.AreEqual("About", result.GetType());
        }
    }
}