using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ApiProject.Migrations
{
    public partial class addedTimeToAppointment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Appointments_Upgrades_UpgradeId",
                table: "Appointments");

            migrationBuilder.DropTable(
                name: "AppointmentUpgrades");

            migrationBuilder.AlterColumn<Guid>(
                name: "UpgradeId",
                table: "Appointments",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AddColumn<TimeSpan>(
                name: "StartTime",
                table: "Appointments",
                type: "interval",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));

            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_Upgrades_UpgradeId",
                table: "Appointments",
                column: "UpgradeId",
                principalTable: "Upgrades",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Appointments_Upgrades_UpgradeId",
                table: "Appointments");

            migrationBuilder.DropColumn(
                name: "StartTime",
                table: "Appointments");

            migrationBuilder.AlterColumn<Guid>(
                name: "UpgradeId",
                table: "Appointments",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.CreateTable(
                name: "AppointmentUpgrades",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CustomerId = table.Column<Guid>(type: "uuid", nullable: false),
                    UpgradeId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppointmentUpgrades", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppointmentUpgrades_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppointmentUpgrades_Upgrades_UpgradeId",
                        column: x => x.UpgradeId,
                        principalTable: "Upgrades",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppointmentUpgrades_CustomerId",
                table: "AppointmentUpgrades",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_AppointmentUpgrades_UpgradeId",
                table: "AppointmentUpgrades",
                column: "UpgradeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_Upgrades_UpgradeId",
                table: "Appointments",
                column: "UpgradeId",
                principalTable: "Upgrades",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
