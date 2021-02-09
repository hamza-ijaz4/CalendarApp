using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ApiProject.Models
{
    public class Upgrade
    {
        [Key]
        public Guid Id { get; set; }
        public string Version { get; set; }
        public string Description { get; set; }
        public int DurationMin { get; set; }
        public string FileName { get; set; }
        public virtual byte[] Bytes { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public virtual ICollection<Appointment> Appointments { get; set; }

    }
}
