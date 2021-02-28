using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiProject.Data
{
    public class Customer
    {
        public Guid Id { get; set; }

        public string Name { get; set; }
        public string HerId { get; set; }

        public string CurrentVersion { get; set; }
    }
}
