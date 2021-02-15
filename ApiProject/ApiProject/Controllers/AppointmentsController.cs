using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiProject.Models;
using ApiProject.Dto;

namespace ApiProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AppointmentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Appointments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetAppointments()
        {
            return await _context.Appointments.ToListAsync();
        }

        // GET: api/Appointments/5
        [HttpGet("{herId}")]
        public async Task<ActionResult<Appointment>> GetAppointment(string HerId)
        {
            var appointment = await _context.Appointments.FindAsync(HerId);

            if (appointment == null)
            {
                return NotFound();
            }

            return appointment;
        }

        //// PUT: api/Appointments/5
        //// To protect from overposting attacks, enable the specific properties you want to bind to, for
        //// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutAppointment(Guid id, Appointment appointment)
        //{
        //    if (id != appointment.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(appointment).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!AppointmentExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        [HttpPut("api/appointment/Booking")]
        public async Task<ActionResult> SaveBooking([FromBody] BookingDto input) // by customer
        {

            var TimeSlots = await _context.TimeSlots.FirstOrDefaultAsync(a => a.Date == input.Day && a.StartTime.Hours == input.Time && a.Available);
            if (TimeSlots == null)
                return BadRequest("Required time slot found");

            var appointment = await _context.Appointments.FirstOrDefaultAsync(a => a.HerId == input.HerId);

            appointment.Status = AppointmentStats.Booked;
            appointment.TimeSlotId = TimeSlots.Id;
           
            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();

            TimeSlots.Available = false;
            _context.TimeSlots.Update(TimeSlots);
            await _context.SaveChangesAsync();

            return Ok();
        }


        // POST: api/Appointments
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Appointment>> CreateAppointment(AppointmentDto input) // by Admin
        {
            var ExistingAppointment = await _context.Appointments.FirstOrDefaultAsync(a => a.HerId == input.HerId);
            if (ExistingAppointment != null)
                return BadRequest("Appointment already exists");

            var appointment = new Appointment()
            {
                HerId = input.HerId,
                UpgradeId = input.UpgradeId,
                Status = AppointmentStats.Pending
            };
            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAppointment", new { id = appointment.Id }, appointment);
        }


        // DELETE: api/Appointments/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Appointment>> DeleteAppointment(Guid id)
        {
            var appointment = await _context.Appointments.FindAsync(id);
            if (appointment == null)
            {
                return NotFound();
            }

            _context.Appointments.Remove(appointment);
            await _context.SaveChangesAsync();

            return appointment;
        }

        private bool AppointmentExists(Guid id)
        {
            return _context.Appointments.Any(e => e.Id == id);
        }
    }
}
