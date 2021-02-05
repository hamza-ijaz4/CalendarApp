using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CalenderAppV2.Server.Database
{
    public class BookingDbContext :DbContext
    {
        public DbSet<Upgrade> Upgrades { get; set; }
        public DbSet<Appointment> Appointments { get; set; }

        public BookingDbContext(DbContextOptions<BookingDbContext> options)
            : base(options)
        {

        }


    }
}
