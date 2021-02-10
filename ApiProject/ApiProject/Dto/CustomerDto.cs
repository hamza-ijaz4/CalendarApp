using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiProject.Dto
{
    public class CustomerDto
    {
        public Guid Id { get; set; }

        public string Name { get; set; }
        public string HerId { get; set; }
        public Guid[] CustomerIds { get; set; }
    }
}
