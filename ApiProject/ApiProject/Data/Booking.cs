using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiProject.Models
{
    public class Booking
    {
        [Key]
        public Guid Id { get; set; }
        public Guid AppointmentId { get; set; }

        [ForeignKey("AppointmentId")]
        public Appointment AppointmentFk { get; set; }

        public string HerId { get; set; }
    }
}
