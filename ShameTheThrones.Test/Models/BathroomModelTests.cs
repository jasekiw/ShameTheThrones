using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;


namespace ShameTheThrones.Models.Tests
{
    [TestClass()]
    public class BathroomModelTests
    {
        private Mock<RestroomModel> _mockDb;
        private Mock<RestroomModel> _mockRR1;
        private Mock<RestroomModel> _mockRR2;

        [TestInitialize]
        public void Initialize()
        {
            _mockDb = new Mock<RestroomModel>();
            _mockRR1 = new Mock<RestroomModel>();
            _mockRR2 = new Mock<RestroomModel>();
            _mockDb.SetupAllProperties();
            _mockRR1.SetupAllProperties();
            _mockRR2.SetupAllProperties();
            _mockDb.Setup(add => add.AddRestroom(new Mock<RestroomModel>().Object));
        }
        [TestMethod()]
        public void AddBathroomModelTest()
        {
            _mockDb.Object.AddRestroom(_mockRR2.Object);
            Assert.AreEqual(_mockDb.Object, _mockRR2.Object);
        }
    }
}