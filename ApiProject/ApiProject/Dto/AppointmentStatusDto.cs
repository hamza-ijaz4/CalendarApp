using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiProject.Dto
{
    public class AppointmentStatusDto
    {
        public Guid Id { get; set; }
        public Models.AppointmentStatus Status {get; set;}
    }
}
