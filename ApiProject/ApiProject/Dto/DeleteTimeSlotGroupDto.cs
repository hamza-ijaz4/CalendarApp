using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiProject.Dto
{
    public class DeleteTimeSlotGroupDto
    {
        public DateTime Day { get; set; }
        public TimeSpan StartTime { get; set; }
    }
}
