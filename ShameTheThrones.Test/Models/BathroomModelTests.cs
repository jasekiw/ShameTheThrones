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
        private Mock<shamethethronesEntities> _mockDb;
        private Mock<Restroom> _mockRR1;
        private Mock<Restroom> _mockRR2;

        [TestInitialize]
        public void Initialize()
        {
            _mockDb = new Mock<shamethethronesEntities>();
            _mockRR1 = new Mock<Restroom>();
            _mockRR2 = new Mock<Restroom>();
            _mockDb.SetupAllProperties();
            _mockRR1.SetupAllProperties();
            _mockRR2.SetupAllProperties();
            _mockDb.Setup(add => add.Restrooms.Add(_mockRR1.Object)).Returns(_mockRR1.Object);
        }
        [TestMethod()]
        public void AddBathroomModelTest()
        {
           Assert.AreEqual(_mockDb.Object.Restrooms.Add(_mockRR1.Object), _mockRR1.Object);
        }
    }
}