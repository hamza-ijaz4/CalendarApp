using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CalenderAppV2.Server.Database
{
    public class Upgrade
    {
        public Guid Id { get; set; }
        public string Version { get; set; }
        public string Description { get; set; }
        public int DurationMin { get; set; }
        // public string FilePath { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public List<Appointment> Appointments { get; set; }
    }
}
