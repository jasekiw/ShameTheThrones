﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ShameTheThrones.Models.DbContext
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class shamethethronesEntities : DbContext
    {
        public shamethethronesEntities()
            : base("name=shamethethronesEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Medium> Media { get; set; }
        public virtual DbSet<Rating> Ratings { get; set; }
        public virtual DbSet<Restroom> Restrooms { get; set; }
        public virtual DbSet<User> Users { get; set; }
    }
}
