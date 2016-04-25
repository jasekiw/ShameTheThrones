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
        private Mock<shamethethronesEntities> _mockDb;
        private Mock<Restroom> _mockRR1;
        private Mock<Restroom> _mockRR2;
        private Mock<RatingModel> _mockRatingModel;
        private Mock<Rating> _rating1;
        private Mock<Rating> _rating2;
        private Mock<Rating> _rating3;
        private Mock<Rating> _rating4;

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