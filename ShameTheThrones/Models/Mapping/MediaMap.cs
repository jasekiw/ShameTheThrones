using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using ShameTheThrones.Models.DbModels;

namespace ShameTheThrones.Models.Mapping
{
    public class MediaMap : EntityTypeConfiguration<Media>
    {
        public MediaMap()
        {
            // Primary Key
            this.HasKey(t => t.id);

            // Properties
            this.Property(t => t.src)
                .IsRequired()
                .HasMaxLength(200);

            // Table & Column Mappings
            this.ToTable("Media");
            this.Property(t => t.id).HasColumnName("id");
            this.Property(t => t.src).HasColumnName("src");
            this.Property(t => t.parentId).HasColumnName("parentId");
            this.Property(t => t.parentTable).HasColumnName("parentTable");
            this.Property(t => t.deletedAt).HasColumnName("deletedAt");
        }
    }
}
