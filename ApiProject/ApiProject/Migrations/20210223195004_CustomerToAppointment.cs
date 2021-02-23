using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ApiProject.Migrations
{
    public partial class CustomerToAppointment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Customer",
                table: "Appointments");

            migrationBuilder.RenameColumn(
                name: "UpgradeVersion",
                table: "Appointments",
                newName: "CustomerId");

            migrationBuilder.AddColumn<Guid>(
                name: "CustomerId1",
                table: "Appointments",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_CustomerId1",
                table: "Appointments",
                column: "CustomerId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_Customers_CustomerId1",
                table: "Appointments",
                column: "CustomerId1",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Appointments_Customers_CustomerId1",
                table: "Appointments");

            migrationBuilder.DropIndex(
                name: "IX_Appointments_CustomerId1",
                table: "Appointments");

            migrationBuilder.DropColumn(
                name: "CustomerId1",
                table: "Appointments");

            migrationBuilder.RenameColumn(
                name: "CustomerId",
                table: "Appointments",
                newName: "UpgradeVersion");

            migrationBuilder.AddColumn<string>(
                name: "Customer",
                table: "Appointments",
                type: "text",
                nullable: true);
        }
    }
}
