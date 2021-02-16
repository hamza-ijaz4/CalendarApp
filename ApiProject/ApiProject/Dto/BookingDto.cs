using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiProject.Dto
{
    public class BookingDto
    {
        public DateTime Day { get; set; }
        public int Time { get; set; }
        public string HerId { get; set; }
    }
}
