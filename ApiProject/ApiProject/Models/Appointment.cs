using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ApiProject.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public int Slots { get; set; }
        public int UpgradeId { get; set; }
        [ForeignKey("UpgradeId")]
        public Upgrade UpgradeFk { get; set; }
    }
}
