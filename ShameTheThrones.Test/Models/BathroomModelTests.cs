using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using ShameTheThrones.Models.DbContext;
using ShameTheThrones.Models.DbModels;

namespace ShameTheThrones.Models.Tests
{
    [TestClass()]
    public class BathroomModelTests
    {
        private Mock<shamethethronesContext> _mockDb;
        private Mock<Restroom> _mockRR1;
        private Mock<Restroom> _mockRR2;

        [TestInitialize]
        public void Initialize()
        {
            _mockDb = new Mock<shamethethronesContext>();
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
    }
}