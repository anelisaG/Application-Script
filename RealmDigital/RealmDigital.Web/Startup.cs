using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(_RealmDigital.Web.Startup))]
namespace _RealmDigital.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
