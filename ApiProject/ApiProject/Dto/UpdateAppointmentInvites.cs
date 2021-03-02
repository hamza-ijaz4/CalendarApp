using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiProject.Dto
{
    public class UpdateAppointmentInvites
    {
        public List<Guid> AppointmentIds { get; set; }
        public Guid UpgradeId { get; set; }
    }
}
