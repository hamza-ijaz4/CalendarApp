﻿// <auto-generated />
using System;
using ApiProject.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace ApiProject.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20210210000040_customerUpgradeTbl")]
    partial class customerUpgradeTbl
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityByDefaultColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.2");

            modelBuilder.Entity("ApiProject.Data.AppointmentUpgrade", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("CustomerId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("UpgradeId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("CustomerId");

                    b.HasIndex("UpgradeId");

                    b.ToTable("AppointmentUpgrades");
                });

            modelBuilder.Entity("ApiProject.Data.Customer", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("HerId")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Customers");
                });

            modelBuilder.Entity("ApiProject.Data.TimeSlot", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<bool>("Available")
                        .HasColumnType("boolean");

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp without time zone");

                    b.Property<TimeSpan>("EndTime")
                        .HasColumnType("interval");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<TimeSpan>("StartTime")
                        .HasColumnType("interval");

                    b.Property<Guid>("UpgradeId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("UpgradeId");

                    b.ToTable("TimeSlots");
                });

            modelBuilder.Entity("ApiProject.Models.Appointment", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("BookedBy")
                        .HasColumnType("text");

                    b.Property<string>("HerId")
                        .HasColumnType("text");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.Property<Guid?>("TimeSlotId")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("UpgradeId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("TimeSlotId");

                    b.HasIndex("UpgradeId");

                    b.ToTable("Appointments");
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

            modelBuilder.Entity("ApiProject.Data.AppointmentUpgrade", b =>
                {
                    b.HasOne("ApiProject.Data.Customer", "CustomerFk")
                        .WithMany()
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ApiProject.Models.Upgrade", "UpgradeFk")
                        .WithMany()
                        .HasForeignKey("UpgradeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CustomerFk");

                    b.Navigation("UpgradeFk");
                });

            modelBuilder.Entity("ApiProject.Data.TimeSlot", b =>
                {
                    b.HasOne("ApiProject.Models.Upgrade", "UpgradeFk")
                        .WithMany()
                        .HasForeignKey("UpgradeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("UpgradeFk");
                });

            modelBuilder.Entity("ApiProject.Models.Appointment", b =>
                {
                    b.HasOne("ApiProject.Data.TimeSlot", "TimeSlots")
                        .WithMany()
                        .HasForeignKey("TimeSlotId");

                    b.HasOne("ApiProject.Models.Upgrade", null)
                        .WithMany("Appointments")
                        .HasForeignKey("UpgradeId");

                    b.Navigation("TimeSlots");
                });

            modelBuilder.Entity("ApiProject.Models.Upgrade", b =>
                {
                    b.Navigation("Appointments");
                });
#pragma warning restore 612, 618
        }
    }
}