using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;



namespace ShameTheThrones.Test
{

    [TestFixture]
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


       [Test]
       // Tests to make sure values appear, not that they are correct
       public void testSearch()
        {
            driver.Navigate().GoToUrl("http://localhost:60060/");

            IWebElement search = driver.FindElement(By.TagName("input"));

            search.SendKeys("40245"); // enter search query

            IReadOnlyCollection <IWebElement> output = driver.FindElements(By.CssSelector(".result.row"));

            Assert.AreNotEqual(output.Count, 0);
        } // test search

        public void testHomeButton()
        {

        } // test home button
    } // driver
}
