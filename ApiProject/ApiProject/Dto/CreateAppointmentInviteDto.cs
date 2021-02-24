using System;
using System.Collections.Generic;

namespace ApiProject.Dto
{
    public class CreateAppointmentInviteDto
    {
        public List<Guid> CustomerIds { get; set; }
        public Guid UpgradeId { get; set; }
    }
}
