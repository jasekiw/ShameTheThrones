using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace ShameTheThrones.Test
{

    [TestClass]
    public class Driver
    {
        IWebDriver driver;

        [SetUp]
        public void Setup()
        {
            // Create a new instance of the IE driver
            driver = new ChromeDriver();
        }

        [TearDown]
        public void Teardown()
        {
            driver.Quit();
        }


        [TestMethod]

        public void testSearch()
        {
            // Tests to make sure values appear, not that they are correct
            driver.Navigate().GoToUrl(" http://localhost:60060/Register/User"); // problem lies here

            IWebElement search = driver.FindElement(By.TagName("input"));

            search.SendKeys("40245"); // enter search query

            IReadOnlyCollection<IWebElement> output = driver.FindElements(By.CssSelector(".result.row"));

            NUnit.Framework.Assert.AreNotEqual(output.Count, 0);
        } // test search

        [TestMethod]
        public void testHomeButton()
        {
            driver.Navigate().GoToUrl("http://shamethethrones.com/"); //problem lies here

            IWebElement homeBtn = driver.FindElement(By.CssSelector("ul.navbar-nav"));
            homeBtn = homeBtn.FindElement(By.XPath("/li[1]")); //Possible error due to index 

            homeBtn.Submit();

            // may need to add wait time

            Microsoft.VisualStudio.TestTools.UnitTesting.Assert.AreEqual("Shame The Thrones!", driver.Title);

        } // test home button

        [TestMethod]
        // Verify that the testing method works
        public void testTets()
        {
            Microsoft.VisualStudio.TestTools.UnitTesting.Assert.IsTrue(true);
        }
    } // driver


}
