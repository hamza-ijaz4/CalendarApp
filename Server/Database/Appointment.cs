using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CalenderAppV2.Server.Database
{
    public class Appointment
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public bool Available { get; set; }
        public string HerId { get; set; }
        public string BookedBy { get; set; }
        public string Exercuted { get; set; }

        public Guid UpgradeId { get; set; }
        public Upgrade Upgrade { get; set; }

    }
}
