using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Security;

namespace ShameTheThrones.Models
{
    public class UserData
    {
        public string UserName { get; set; }
        public String Email { get; set; }
        public int Id { get; set; }
    }
}