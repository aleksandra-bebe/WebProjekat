using Microsoft.EntityFrameworkCore.Migrations;

namespace Restoran.Migrations
{
    public partial class j1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Cena",
                table: "Stavke",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Cena",
                table: "Stavke");
        }
    }
}
