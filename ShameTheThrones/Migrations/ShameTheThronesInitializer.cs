using System.Data.Entity;
using ShameTheThrones.Models.DbContext;

namespace ShameTheThrones.Migrations
{
    internal sealed class ShameTheThronesInitializer : MigrateDatabaseToLatestVersion<shamethethronesContext, Configuration>
    {
    }
}