using System;

namespace ApiProject.Dto
{
    public class TimeSlotGroupDto
    {
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public int Slots { get; set; }

    }
}
