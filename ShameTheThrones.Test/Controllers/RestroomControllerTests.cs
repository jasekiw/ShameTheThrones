﻿using Microsoft.VisualStudio.TestTools.UnitTesting;
using ShameTheThrones.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShameTheThrones.Controllers.Tests
{
    [TestClass()]
    public class RestroomControllerTests
    {
        [TestMethod()]
        public void RateBathroomTest()
        {
            Assert.Fail();
        }

        [TestMethod()]
        public void SearchTest()
        {
            Assert.Fail();
        }
    }
}
/*
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
            _mockDb.Setup(add => add.Restrooms.Add(new Mock<Restroom>().Object));
            _mockDb.Setup(save => save.SaveChanges());
        }
        [TestMethod()]
        public void AddBathroomModelTest()
        {
            _mockDb.Object.Restrooms.Add(_mockRR2.Object);
            _mockDb.Object.Restrooms.Add(_mockRR2.Object);
            _mockDb.Object.SaveChanges();
            Assert.IsNotNull(_mockDb);
            Assert.IsNotNull(_mockRR1.Object.id);
            Assert.IsNotNull(_mockDb.Object.Restrooms.Find(_mockRR1.Object.id));
            Assert.IsNotNull(_mockDb.Object.Restrooms.Find(_mockRR2.Object.id));
        }

    */