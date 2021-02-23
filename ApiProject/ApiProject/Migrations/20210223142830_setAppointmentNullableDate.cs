using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ApiProject.Migrations
{
    public partial class setAppointmentNullableDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<TimeSpan>(
                name: "StartTime",
                table: "Appointments",
                type: "interval",
                nullable: true,
                oldClrType: typeof(TimeSpan),
                oldType: "interval");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<TimeSpan>(
                name: "StartTime",
                table: "Appointments",
                type: "interval",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0),
                oldClrType: typeof(TimeSpan),
                oldType: "interval",
                oldNullable: true);
        }
    }
}
