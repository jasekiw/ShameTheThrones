using ShameTheThrones.Models.DbContext;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Security;

namespace ShameTheThrones.Models
{
    public class UserModel
    {

        public string UserName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        public string RetypePassword { get; set; }

        public DateTime? DeletedAt;
        private int id; 

        public void Register(UserModel user)
        {
            using (shamethethronesEntities db = new shamethethronesEntities())
            {
                User newUser = new User();

                newUser.username = user.UserName;
                newUser.email = user.Email;
                newUser.pasword = CalculateMD5Hash(user.Password);
                
                db.Users.Add(newUser);
                db.SaveChanges();
            }
        }

        //public void LogIn(UserModel user)
        //{
        //    using (shamethethronesEntities db = new shamethethronesEntities())
        //    {
                
        //    }
        //}

        public bool isValid(string email, string password)
        {
            bool isValid = false;

            using (shamethethronesEntities db = new shamethethronesEntities())
            {
                string encrypted = CalculateMD5Hash(password);
                var user = db.Users.FirstOrDefault(x => x.email == email);

                if (user != null)
                {
                    if (user.pasword == encrypted)
                    {
                        this.id = user.id;
                        this.UserName = user.username;
                       
                        isValid = true;
                    }
                }
            }
                return isValid;
        }

        public int getId()
        {
            return this.id;
        }

        private string CalculateMD5Hash(string input)
        {
            // step 1, calculate MD5 hash from input
            MD5 md5 = System.Security.Cryptography.MD5.Create();
            byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(input);
            byte[] hash = md5.ComputeHash(inputBytes);

            // step 2, convert byte array to hex string
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < hash.Length; i++)
            {
                sb.Append(hash[i].ToString("X2"));
            }
            return sb.ToString();
        }

    }
}