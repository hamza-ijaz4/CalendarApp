using System;

namespace ApiProject.Dto
{
    public class TimeSlotDto
    {
        public Guid Id { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public int UpgradeId { get; set; }
    }
}
