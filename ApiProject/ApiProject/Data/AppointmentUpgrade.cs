using ApiProject.Models;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiProject.Data
{
    public class AppointmentUpgrade
    {
        public Guid Id { get; set; }
        public Guid CustomerId { get; set; }

        [ForeignKey("CustomerId")]
        public Customer CustomerFk { get; set; }
        public Guid UpgradeId { get; set; }

        [ForeignKey("UpgradeId")]
        public Upgrade UpgradeFk { get; set; }
    }
}
