using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiProject.Dto
{
    public class BookTimeDto
    {
        public Guid AppointmentId { get; set; }
        public DateTime Day { get; set; }
        public TimeSpan StartTime { get; set; }
    }
}
