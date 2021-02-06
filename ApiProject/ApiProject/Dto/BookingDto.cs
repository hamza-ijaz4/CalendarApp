using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiProject.Dto
{
    public class BookingDto
    {
        public int Id { get; set; }
        public Guid AppointmentId { get; set; }
        public string HerId { get; set; }

    }
}
