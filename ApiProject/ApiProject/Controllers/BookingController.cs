using System.Threading.Tasks;
using ApiProject.Dto;
using ApiProject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApiProject.Controllers
{
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
            var appointment = await _context.Appointments.FirstOrDefaultAsync(a => a.Date == input.Day && a.StartTime.Hours == input.Time && a.Available);
            if (appointment == null)
                return BadRequest("No appointment found");

            //var booking = new Booking()
            //{
            //    AppointmentId = appointment.Id,
            //    HerId = input.HerId
            //};
            //_context.Bookings.Add(booking);
            //await _context.SaveChangesAsync();

            appointment.Available = false;
            appointment.HerId = input.HerId;
            _context.Appointments.Update(appointment);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
