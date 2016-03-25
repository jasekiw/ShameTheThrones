using System.Web.Optimization;

namespace ShameTheThrones
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"
                     ));
            bundles.Add(new ScriptBundle("~/bundles/mainsite").Include(
                     "~/Scripts/typescript/typescriptcombined.js"
                    ));
           
            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/sass/style.css"
                      ));
            BundleTable.EnableOptimizations = false;
        }
    }
}