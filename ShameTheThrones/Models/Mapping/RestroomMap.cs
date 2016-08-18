using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using ShameTheThrones.Models.DbModels;

namespace ShameTheThrones.Models.Mapping
{
    public class RestroomMap : EntityTypeConfiguration<Restroom>
    {
        public RestroomMap()
        {
            // Primary Key
            this.HasKey(t => t.id);

            // Properties
            this.Property(t => t.address)
                .HasMaxLength(100);

            this.Property(t => t.city)
                .HasMaxLength(30);

            this.Property(t => t.state)
                .HasMaxLength(30);

            // Table & Column Mappings
            this.ToTable("Restroom");
            this.Property(t => t.id).HasColumnName("id");
            this.Property(t => t.coordX).HasColumnName("coordX");
            this.Property(t => t.coordY).HasColumnName("coordY");
            this.Property(t => t.address).HasColumnName("address");
            this.Property(t => t.city).HasColumnName("city");
            this.Property(t => t.zipCode).HasColumnName("zipCode");
            this.Property(t => t.state).HasColumnName("state");
            this.Property(t => t.userId).HasColumnName("userId");
            this.Property(t => t.description).HasColumnName("description");
            this.Property(t => t.gender).HasColumnName("gender");
            this.Property(t => t.deletedAt).HasColumnName("deletedAt");

            // Relationships
            this.HasRequired(t => t.User)
                .WithMany(t => t.Restrooms)
                .HasForeignKey(d => d.userId);

        }
    }
}
