using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using ShameTheThrones.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ShameTheThrones.Models.DbContext;
using ShameTheThrones.Models.DbModels;

namespace ShameTheThrones.Models.Tests
{
    [TestClass()]
    public class UserModelTests
    {
        private Mock<shamethethronesContext> _mockUserClass;
        private Mock<User> _mockUser1;
        private Mock<User> _mockUser2;

        [TestInitialize]
        public void Initialize()
        {
            _mockUserClass = new Mock<shamethethronesContext>();
            _mockUser1 = new Mock<User>();
            _mockUser2 = new Mock<User>();
            _mockUserClass.SetupAllProperties();
            _mockUser1.SetupAllProperties();
            _mockUser2.SetupAllProperties();
            _mockUserClass.Setup(add => add.Users.Add(_mockUser1.Object));
            _mockUserClass.Setup(save => save.SaveChanges());
        }

        [TestMethod()]
        public void RegisterTest()
        {
            _mockUserClass.Object.Users.Add(_mockUser2.Object);
            _mockUserClass.Object.Users.Add(_mockUser1.Object);
            _mockUserClass.Object.SaveChanges();
            Assert.IsTrue(_mockUserClass.Object.Users.Contains(_mockUser1.Object));
            Assert.IsTrue(_mockUserClass.Object.Users.Contains(_mockUser2.Object));
        }
    }
}