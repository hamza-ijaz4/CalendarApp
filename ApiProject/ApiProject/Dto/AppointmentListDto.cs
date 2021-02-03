using ApiProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiProject.Dto
{
    public class AppointmentListDto
    {
        public int AppointmentId { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public DateTime Date { get; set; }
        public int Duration { get; set; }
        public List<AppointmentDto> Appointments { get; set; }
    }
}
