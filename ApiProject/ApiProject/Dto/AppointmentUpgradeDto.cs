using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiProject.Dto
{
    public class AppointmentUpgradeDto
    {
        public Guid[] CustomerIds { get; set; }
        public Guid UpgradeId { get; set; }
    }
}
