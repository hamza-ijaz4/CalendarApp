using ApiProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiProject.Dto
{
    public class TimeSlotGroupListDto
    {
        public DateTime Date { get; set; }
        public int Duration { get; set; }
        public List<TimeSlotGroupDto> TimeSlotGroups { get; set; }
    }

}
