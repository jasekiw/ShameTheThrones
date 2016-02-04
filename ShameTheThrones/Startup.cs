using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ShameTheThrones.Startup))]
namespace ShameTheThrones
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
