using System.Data.Entity;
using ShameTheThrones.Models.DbModels;
using ShameTheThrones.Models.Mapping;

namespace ShameTheThrones.Models.DbContext
{
    public partial class shamethethronesContext : System.Data.Entity.DbContext
    {
        static shamethethronesContext()
        {
            Database.SetInitializer<shamethethronesContext>(null);
        }

        public shamethethronesContext()
            : base("Name=shamethethronesContext")
        {
        }

        public DbSet<Media> Media { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Restroom> Restrooms { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new MediaMap());
            modelBuilder.Configurations.Add(new RatingMap());
            modelBuilder.Configurations.Add(new RestroomMap());
            modelBuilder.Configurations.Add(new UserMap());
        }
    }
}
