using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiProject.Dto
{
    public class AppointmentDto
    {
        public Guid CustomerId { get; set; }
        public Guid UpgradeId { get; set; }
    }
}
