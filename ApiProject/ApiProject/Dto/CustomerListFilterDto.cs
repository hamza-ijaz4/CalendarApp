using ApiProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiProject.Dto
{
    public class CustomerListFilterDto
    {
        public AppointmentStatus Status { get; set; }
    }
}
