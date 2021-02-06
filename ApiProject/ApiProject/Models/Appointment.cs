using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiProject.Models
{
    public class Appointment
    {
        [Key]
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public bool Available { get; set; }
        public string HerId { get; set; }
        public string BookedBy { get; set; }
        public string Exercuted { get; set; }

        public Guid UpgradeId { get; set; }
        [ForeignKey("UpgradeId")]
        public Upgrade UpgradeFk { get; set; }
    }
}
