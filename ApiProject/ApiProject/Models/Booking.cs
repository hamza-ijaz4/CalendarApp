using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ApiProject.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public int AppointmentId { get; set; }

        [ForeignKey("AppointmentId")]
        public Appointment AppointmentFk { get; set; }

        public int HerId { get; set; }
    }
}
