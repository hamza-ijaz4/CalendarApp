using ApiProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiProject.Dto
{
    public class AppointmentListDto
    {
        public Guid AppointmentId { get; set; }
        public DateTime? AppointmentDate { get; set; }
        public TimeSpan AppointmentTime { get; set; }
        public string CustomerName { get; set; }
        public Guid CustomerId { get; set; }
        public string HerId { get; set; }
        public string BookedBy { get; set; }
        public string UpgradeVersion { get; set; }
        public Guid UpgradeVersionId { get; set; }
        public AppointmentStatus Status { get; set; }
    }
}
