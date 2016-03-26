using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using ShameTheThrones.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShameTheThrones.Models.Tests
{
    [TestClass()]
    public class UserModelTests
    {
        private Mock<UserModel> _mockUserClass;
        private Mock<UserModel> _mockUser1;
        private Mock<UserModel> _mockUser2;

        [TestInitialize]
        public void Initialize()
        {
            _mockUserClass = new Mock<UserModel>();
            _mockUser1 = new Mock<UserModel>();
            _mockUser2 = new Mock<UserModel>();
            _mockUserClass.SetupAllProperties();
            _mockUser1.SetupAllProperties();
            _mockUser2.SetupAllProperties();
            _mockUserClass.Setup(register => register.Register(new Mock<UserModel>().Object));
        }

        [TestMethod()]
        public void RegisterTest()
        {
            _mockUserClass.Object.Register(_mockUser2.Object);
            Assert.AreEqual(_mockUserClass.Object, _mockUser2.Object);
        }
    }
}