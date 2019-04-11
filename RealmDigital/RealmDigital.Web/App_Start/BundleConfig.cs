using System.Web;
using System.Web.Optimization;

namespace _RealmDigital.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/jquery.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css",
                      "~/Content/css/libs/datatables.css",
                      "~/Content/css/libs/jquery.dataTables.min.css",
                      "~/Content/css/libs/font-awesome.css"
                      ));

            bundles.Add(new ScriptBundle("~/site/js").Include(

                "~/Content/js/views/site.js",

                "~/Content/js/libs/es6-promise.js",

               "~/Content/js/libs/rx.all.js",

               "~/Content/js/libs/jquery-2.1.4.js",

               "~/Content/js/libs/moment.js",

               "~/Content/js/libs/bootstrap.js",

               "~/Content/js/libs/jquery.validate.js",

               "~/Content/js/libs/datatables.js",

               "~/Content/js/libs/jquery.dataTables.min.js",

               "~/Content/js/libs/bootstrap.js"

               ));
        }
    }
}
