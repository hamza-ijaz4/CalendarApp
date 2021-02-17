using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiProject.Dto
{
    // needs to remove if not needed anymore
    public class BookingDto
    {
        public DateTime Day { get; set; }
        public int Time { get; set; }
        public string HerId { get; set; }
    }

    public class UpdateBookingInvitesDto
    {
        public Guid AppointmentId { get; set; }
        public DateTime Day { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
    }
}
