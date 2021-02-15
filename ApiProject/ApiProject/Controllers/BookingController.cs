using System.Threading.Tasks;
using ApiProject.Dto;
using ApiProject.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApiProject.Controllers
{
    [EnableCors("Default")]
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public BookingController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult> SaveBooking([FromBody] BookingDto input)
        {
            
            var TimeSlots = await _context.TimeSlots.FirstOrDefaultAsync(a => a.Date == input.Day && a.StartTime.Hours == input.Time && a.Available);
            if (TimeSlots == null)
                return BadRequest("No appointment found");

            var appointment = new Appointment()
            {
                HerId = input.HerId,
                Status = AppointmentStats.Pending,
                TimeSlotId = TimeSlots.Id,
            };
            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();

            TimeSlots.Available = false;
            _context.TimeSlots.Update(TimeSlots);
            await _context.SaveChangesAsync();
            

            return Ok();
        }
    }
}
