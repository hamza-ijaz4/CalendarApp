using ApiProject.Data;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiProject.Models
{
    public enum AppointmentStats
    {
        Pending,
        Completed
    }

    public class Appointment
    {
        [Key]
        public Guid Id { get; set; }
        public string HerId { get; set; } //Customer /herID=123&User=Peter
        public string BookedBy { get; set; } //User (for later)
        public AppointmentStats Status { get; set; }
        public bool IsDeleted { get; set; }

        public Guid? TimeSlotId { get; set; }

        [ForeignKey("TimeSlotId")]
        public TimeSlot TimeSlots { get; set; }

        //public Guid UpgradeId { get; set; }
        //[ForeignKey("UpgradeId")]
        //public Upgrade UpgradeFk { get; set; }

    }
}
