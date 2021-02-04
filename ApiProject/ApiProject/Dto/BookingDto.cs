using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiProject.Dto
{
    public class BookingDto
    {
        public int Id { get; set; }
        public int AppointmentId { get; set; }
        public int HerId { get; set; }

    }
}
