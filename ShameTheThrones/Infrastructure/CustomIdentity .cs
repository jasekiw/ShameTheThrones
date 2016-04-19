using System.Security.Principal;
using System.Web.Script.Serialization;
using System.Web.Security;
using ShameTheThrones.Models;

namespace ShameTheThrones.Infrastructure
{
    public static class IdentityExtensions
    {
        public static UserData getUser(this IIdentity identity)
        {
            return new JavaScriptSerializer().Deserialize<UserData>(((FormsIdentity)identity).Ticket.UserData);
        }

    }
}

