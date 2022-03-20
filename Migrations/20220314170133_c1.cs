using Microsoft.EntityFrameworkCore.Migrations;

namespace Restoran.Migrations
{
    public partial class c1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Stolovi_FastFoods_FastFoodId",
                table: "Stolovi");

            migrationBuilder.DropColumn(
                name: "KaficId",
                table: "Stolovi");

            migrationBuilder.AlterColumn<int>(
                name: "FastFoodId",
                table: "Stolovi",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Stolovi_FastFoods_FastFoodId",
                table: "Stolovi",
                column: "FastFoodId",
                principalTable: "FastFoods",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Stolovi_FastFoods_FastFoodId",
                table: "Stolovi");

            migrationBuilder.AlterColumn<int>(
                name: "FastFoodId",
                table: "Stolovi",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "KaficId",
                table: "Stolovi",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Stolovi_FastFoods_FastFoodId",
                table: "Stolovi",
                column: "FastFoodId",
                principalTable: "FastFoods",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
