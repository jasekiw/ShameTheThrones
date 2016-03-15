using ShameTheThrones.Models.DbContext;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ShameTheThrones.Models
{
    public class UserModel
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        public DateTime DeletedAt;

        public void Register(UserModel user)
        {
            using (shamethethronesEntities db = new shamethethronesEntities())
            {
                User newUser = new User();

                newUser.username = user.UserName;
                newUser.email = user.Email;
                newUser.pasword = user.Password;

                db.Users.Add(newUser);
                db.SaveChanges();
            }
        }

        public void LogIn(UserModel user)
        {
            using (shamethethronesEntities db = new shamethethronesEntities())
            {
                // TODO: Stuff to log in and verify credentials
            }
        }
        
    }
}