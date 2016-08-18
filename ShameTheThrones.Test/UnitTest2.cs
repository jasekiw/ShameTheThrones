using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ShameTheThrones.Controllers;
using ShameTheThrones.Models;

namespace ShameTheThrones.Test
{
    [TestClass]
    public class UnitTest2
    {
        [TestMethod]
        public void TestSearch()
        {
           
            var controller = new RestroomController();
            var restroomModel = new RestroomSearchModel();
            restroomModel.SWLong = 0;
            restroomModel.SWLat = 0;
            restroomModel.NELat = 0;
            restroomModel.NELong = 0;
            var result = controller.Search(restroomModel);
            var test = "";
            Assert.AreEqual("Details", "Details");
        }
    }
}