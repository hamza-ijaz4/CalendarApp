using ApiProject.Data;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiProject.Models
{
    public enum AppointmentStatus
    {
        Invited,
        Booked,
        Completed
    }

    public class Appointment
    {
        [Key]
        public Guid Id { get; set; }
   
        public AppointmentStatus Status { get; set; }
        public bool IsDeleted { get; set; }
        public string BookedBy { get; set; }
        public Guid CustomerId { get; set; }

        [ForeignKey("CustomerId")]
        public Customer CustomerFk { get; set; }


        public Guid? TimeSlotId { get; set; }
        [ForeignKey("TimeSlotId")]
        public TimeSlot TimeSlotFk { get; set; }

        public Guid UpgradeId { get; set; }
        [ForeignKey("UpgradeId")]
        public Upgrade UpgradeFk { get; set; }


    }
}
