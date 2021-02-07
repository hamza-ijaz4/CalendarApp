﻿// <auto-generated />
using System;
using ApiProject.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace ApiProject.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityByDefaultColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.2");

            modelBuilder.Entity("ApiProject.Models.Appointment", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<bool>("Available")
                        .HasColumnType("boolean");

                    b.Property<string>("BookedBy")
                        .HasColumnType("text");

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp without time zone");

                    b.Property<TimeSpan>("EndTime")
                        .HasColumnType("interval");

                    b.Property<string>("Exercuted")
                        .HasColumnType("text");

                    b.Property<string>("HerId")
                        .HasColumnType("text");

                    b.Property<TimeSpan>("StartTime")
                        .HasColumnType("interval");

                    b.Property<Guid>("UpgradeId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("UpgradeId");

                    b.ToTable("Appointments");
                });

            modelBuilder.Entity("ApiProject.Models.Booking", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("AppointmentId")
                        .HasColumnType("uuid");

                    b.Property<string>("HerId")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("AppointmentId");

                    b.ToTable("Bookings");
                });

            modelBuilder.Entity("ApiProject.Models.Upgrade", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<byte[]>("Bytes")
                        .HasColumnType("bytea");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<int>("DurationMin")
                        .HasColumnType("integer");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("FileName")
                        .HasColumnType("text");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Version")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Upgrades");
                });

            modelBuilder.Entity("ApiProject.Models.Appointment", b =>
                {
                    b.HasOne("ApiProject.Models.Upgrade", "UpgradeFk")
                        .WithMany("Appointments")
                        .HasForeignKey("UpgradeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("UpgradeFk");
                });

            modelBuilder.Entity("ApiProject.Models.Booking", b =>
                {
                    b.HasOne("ApiProject.Models.Appointment", "AppointmentFk")
                        .WithMany()
                        .HasForeignKey("AppointmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppointmentFk");
                });

            modelBuilder.Entity("ApiProject.Models.Upgrade", b =>
                {
                    b.Navigation("Appointments");
                });
#pragma warning restore 612, 618
        }
    }
}
