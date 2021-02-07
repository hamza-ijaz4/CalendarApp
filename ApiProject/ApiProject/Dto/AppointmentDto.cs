using System;

namespace ApiProject.Dto
{
    public class AppointmentTimesDto
    {
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
    }
    public class AppointmentDto
    {
        public Guid Id { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public int UpgradeId { get; set; }
    }
}
