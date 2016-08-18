using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using ShameTheThrones.Models.DbModels;

namespace ShameTheThrones.Models.Mapping
{
    public class UserMap : EntityTypeConfiguration<User>
    {
        public UserMap()
        {
            // Primary Key
            this.HasKey(t => t.id);

            // Properties
            this.Property(t => t.username)
                .IsRequired()
                .HasMaxLength(60);

            this.Property(t => t.email)
                .IsRequired()
                .HasMaxLength(80);

            this.Property(t => t.pasword)
                .IsRequired()
                .HasMaxLength(45);

            // Table & Column Mappings
            this.ToTable("User");
            this.Property(t => t.id).HasColumnName("id");
            this.Property(t => t.username).HasColumnName("username");
            this.Property(t => t.email).HasColumnName("email");
            this.Property(t => t.pasword).HasColumnName("pasword");
            this.Property(t => t.deletedAt).HasColumnName("deletedAt");
        }
    }
}
