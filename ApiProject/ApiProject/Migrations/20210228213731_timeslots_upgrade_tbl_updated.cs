using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ApiProject.Migrations
{
    public partial class timeslots_upgrade_tbl_updated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TimeSlots_Upgrades_UpgradeId",
                table: "TimeSlots");

            migrationBuilder.DropIndex(
                name: "IX_TimeSlots_UpgradeId",
                table: "TimeSlots");

            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "Upgrades");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "Upgrades");

            migrationBuilder.DropColumn(
                name: "UpgradeId",
                table: "TimeSlots");

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "TimeSlots",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "TimeSlots",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "TimeSlots");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "TimeSlots");

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "Upgrades",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "Upgrades",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "UpgradeId",
                table: "TimeSlots",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_TimeSlots_UpgradeId",
                table: "TimeSlots",
                column: "UpgradeId");

            migrationBuilder.AddForeignKey(
                name: "FK_TimeSlots_Upgrades_UpgradeId",
                table: "TimeSlots",
                column: "UpgradeId",
                principalTable: "Upgrades",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
