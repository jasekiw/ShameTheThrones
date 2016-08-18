using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using ShameTheThrones.Models.DbModels;

namespace ShameTheThrones.Models.Mapping
{
    public class RatingMap : EntityTypeConfiguration<Rating>
    {
        public RatingMap()
        {
            // Primary Key
            this.HasKey(t => t.id);

            // Properties
            this.Property(t => t.title)
                .IsRequired()
                .HasMaxLength(100);

            // Table & Column Mappings
            this.ToTable("Rating");
            this.Property(t => t.id).HasColumnName("id");
            this.Property(t => t.title).HasColumnName("title");
            this.Property(t => t.comment).HasColumnName("comment");
            this.Property(t => t.restroomId).HasColumnName("restroomId");
            this.Property(t => t.ratingValue).HasColumnName("ratingValue");
            this.Property(t => t.userId).HasColumnName("userId");
            this.Property(t => t.deletedAt).HasColumnName("deletedAt");

            // Relationships
            this.HasRequired(t => t.User)
                .WithMany(t => t.Ratings)
                .HasForeignKey(d => d.userId);

        }
    }
}
