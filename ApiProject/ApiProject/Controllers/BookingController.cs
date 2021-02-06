using System.Threading.Tasks;
using ApiProject.Dto;
using ApiProject.Models;
using Microsoft.AspNetCore.Mvc;

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
        public async Task SaveBooking([FromBody] BookingDto input)
        {
            var booking = new Booking()
            {
                AppointmentId = input.AppointmentId,
                HerId = input.HerId
            };
            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();
        }
    }
}
