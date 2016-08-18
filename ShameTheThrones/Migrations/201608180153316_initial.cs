namespace ShameTheThrones.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Media",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        src = c.String(nullable: false, maxLength: 200),
                        parentId = c.Int(nullable: false),
                        parentTable = c.Byte(nullable: false),
                        deletedAt = c.DateTime(),
                    })
                .PrimaryKey(t => t.id);
            
            CreateTable(
                "dbo.Rating",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        title = c.String(nullable: false, maxLength: 100),
                        comment = c.String(),
                        restroomId = c.Int(nullable: false),
                        ratingValue = c.Byte(nullable: false),
                        userId = c.Int(nullable: false),
                        deletedAt = c.DateTime(),
                    })
                .PrimaryKey(t => t.id)
                .ForeignKey("dbo.User", t => t.userId, cascadeDelete: true)
                .Index(t => t.userId);
            
            CreateTable(
                "dbo.User",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        username = c.String(nullable: false, maxLength: 60),
                        email = c.String(nullable: false, maxLength: 80),
                        pasword = c.String(nullable: false, maxLength: 45),
                        deletedAt = c.DateTime(),
                    })
                .PrimaryKey(t => t.id);
            
            CreateTable(
                "dbo.Restroom",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        coordX = c.Decimal(precision: 18, scale: 2),
                        coordY = c.Decimal(precision: 18, scale: 2),
                        address = c.String(maxLength: 100),
                        city = c.String(maxLength: 30),
                        zipCode = c.Int(),
                        state = c.String(maxLength: 30),
                        userId = c.Int(nullable: false),
                        description = c.String(),
                        gender = c.Byte(nullable: false),
                        deletedAt = c.DateTime(),
                    })
                .PrimaryKey(t => t.id)
                .ForeignKey("dbo.User", t => t.userId, cascadeDelete: true)
                .Index(t => t.userId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Rating", "userId", "dbo.User");
            DropForeignKey("dbo.Restroom", "userId", "dbo.User");
            DropIndex("dbo.Restroom", new[] { "userId" });
            DropIndex("dbo.Rating", new[] { "userId" });
            DropTable("dbo.Restroom");
            DropTable("dbo.User");
            DropTable("dbo.Rating");
            DropTable("dbo.Media");
        }
    }
}
