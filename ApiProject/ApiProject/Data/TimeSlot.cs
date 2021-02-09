using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiProject.Data
{
    public class Timelots
    {
        [Key]
        public Guid Id { get; set; }
        public DateTime Date? { get; set; }
        public TimeSpan StartTime? { get; set; }
        public TimeSpan EndTime? { get; set; }
        public bool Available { get; set; }
        public string? HerId { get; set; }
        public string? BookedBy { get; set; }


        public bool IsDeleted { get; set; }

        public Guid UpgradeId { get; set; }
        [ForeignKey("UpgradeId")]
        public Upgrade UpgradeFk { get; set; }
    }
}
