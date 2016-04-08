using System.Web.Optimization;

namespace ShameTheThrones
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/before").Include(
                    "~/Scripts/js/thirdparty/spin.js",
                     "~/Scripts/js/libraries/spinnerHandler.js"
                     ));
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/js/thirdparty/jquery-{version}.js")
                      
                        );

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/js/thirdparty/bootstrap.js"
                     ));
         
            bundles.Add(new ScriptBundle("~/bundles/mainsite").Include(
                     "~/Scripts/typescript/typescriptcombined.js"
                    ));
            bundles.Add(new ScriptBundle("~/bundles/googleMapsExtensions").Include(
                    "~/Scripts/js/thirdparty/geolocation-marker.js"
                    ));

            /**
            *
            * RateYo Plugin
            */
            bundles.Add(new ScriptBundle("~/bundles/rateyo").Include(
                   "~/Scripts/js/thirdparty/rateyo/jquery.rateyo.js"
                   ));
            bundles.Add(new StyleBundle("~/Content/css/rateyo").Include(
                      "~/Scripts/js/thirdparty/rateyo/jquery.rateyo.min.css"
                      ));



            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/sass/style.css"
                      ));
            BundleTable.EnableOptimizations = false;
        }
    }
}