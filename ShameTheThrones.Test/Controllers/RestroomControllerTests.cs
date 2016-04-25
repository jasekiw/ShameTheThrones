using Microsoft.VisualStudio.TestTools.UnitTesting;
using ShameTheThrones.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Moq;
using ShameTheThrones.Models.DbContext;
using ShameTheThrones.Models.rating;

namespace ShameTheThrones.Controllers.Tests
{
    [TestClass()]
    public class RestroomControllerTests
    {
        private Mock<RatingModel> _mockRatingModel;
        private Mock<Rating> _rating1;

        [TestInitialize]
        public void Initialize()
        {
            _mockRatingModel = new Mock<RatingModel>(_rating1);
            _rating1 = new Mock<Rating>();
            _mockRatingModel.SetupAllProperties();
            _rating1.SetupAllProperties();
            _mockRatingModel.Setup(rate => rate.add());
        }

        [TestMethod()]
        public void RateBathroomTest()
        {
            _mockRatingModel.Object.add();
            Assert.AreEqual(_mockRatingModel.Object.Rating, _rating1);
        }
    }
}