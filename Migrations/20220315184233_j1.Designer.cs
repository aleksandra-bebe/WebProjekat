﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Restoran.Models;

namespace Restoran.Migrations
{
    [DbContext(typeof(FastFoodContext))]
    [Migration("20220315184233_j1")]
    partial class j1
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("Restoran.Models.FastFood", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("N")
                        .HasColumnType("int");

                    b.Property<string>("Naziv")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("Id");

                    b.ToTable("FastFoods");
                });

            modelBuilder.Entity("Restoran.Models.Porudzbina", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("Broj")
                        .HasColumnType("int");

                    b.Property<int>("StoId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("StoId")
                        .IsUnique();

                    b.ToTable("Porudzbine");
                });

            modelBuilder.Entity("Restoran.Models.Stavka", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("Cena")
                        .HasColumnType("int");

                    b.Property<string>("Naziv")
                        .HasMaxLength(15)
                        .HasColumnType("nvarchar(15)");

                    b.Property<int>("PorudzbinaId")
                        .HasColumnType("int");

                    b.Property<string>("Vrsta")
                        .HasMaxLength(5)
                        .HasColumnType("nvarchar(5)");

                    b.HasKey("Id");

                    b.HasIndex("PorudzbinaId");

                    b.ToTable("Stavke");
                });

            modelBuilder.Entity("Restoran.Models.Sto", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("Broj")
                        .HasColumnType("int");

                    b.Property<int>("FastFoodId")
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)");

                    b.HasKey("Id");

                    b.HasIndex("FastFoodId");

                    b.ToTable("Stolovi");
                });

            modelBuilder.Entity("Restoran.Models.Porudzbina", b =>
                {
                    b.HasOne("Restoran.Models.Sto", null)
                        .WithOne("Porudzbina")
                        .HasForeignKey("Restoran.Models.Porudzbina", "StoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Restoran.Models.Stavka", b =>
                {
                    b.HasOne("Restoran.Models.Porudzbina", null)
                        .WithMany("Stavke")
                        .HasForeignKey("PorudzbinaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Restoran.Models.Sto", b =>
                {
                    b.HasOne("Restoran.Models.FastFood", null)
                        .WithMany("Stolovi")
                        .HasForeignKey("FastFoodId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Restoran.Models.FastFood", b =>
                {
                    b.Navigation("Stolovi");
                });

            modelBuilder.Entity("Restoran.Models.Porudzbina", b =>
                {
                    b.Navigation("Stavke");
                });

            modelBuilder.Entity("Restoran.Models.Sto", b =>
                {
                    b.Navigation("Porudzbina");
                });
#pragma warning restore 612, 618
        }
    }
}
