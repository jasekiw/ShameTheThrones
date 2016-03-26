using Microsoft.VisualStudio.TestTools.UnitTesting;
using ShameTheThrones.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Moq;
using ShameTheThrones.Models.DbContext;


namespace ShameTheThrones.Models.Tests
{
    [TestClass()]
    public class BathroomModelTests
    {
        private Mock<BathroomModel> _mockDb;
        private Mock<BathroomModel> _mockRR1;
        private Mock<BathroomModel> _mockRR2;

        [TestInitialize]
        public void Initialize()
        {
            _mockDb = new Mock<BathroomModel>();
            _mockRR1 = new Mock<BathroomModel>();
            _mockRR2 = new Mock<BathroomModel>();
            _mockDb.SetupAllProperties();
            _mockRR1.SetupAllProperties();
            _mockRR2.SetupAllProperties();
            _mockDb.Setup(add => add.AddBathroom(new Mock<BathroomModel>().Object));
        }
        [TestMethod()]
        public void AddBathroomModelTest()
        {
            _mockDb.Object.AddBathroom(_mockRR2.Object);
            Assert.AreEqual(_mockDb.Object, _mockRR2.Object);
        }
    }
}