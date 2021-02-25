using ApiProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiProject.Dto
{
    public class CustomerListDto
    {
        public Guid Id { get; set; }

        public string Name { get; set; }
        public string HerId { get; set; }
        public bool IsSelected { get; set; }
        public bool GotAppointment { get; set; }
        public string UpcommingUpgrade { get; set; }

        public AppointmentStatus? Status { get; set; }
    }
}
