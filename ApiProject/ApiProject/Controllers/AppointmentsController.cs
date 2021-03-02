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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetBookedAppointments()
        {
            return await _context.Appointments.ToListAsync();
        }

        // GET: api/Appointments
        [HttpGet("active")]
        public async Task<ActionResult<List<AppointmentListDto>>> GetAppointments()
        {
            var query = _context.Appointments.Where(a => a.Status == AppointmentStatus.Booked || a.Status == AppointmentStatus.Invited).Include(a => a.CustomerFk).Include(a => a.TimeSlotFk).Include(a => a.UpgradeFk);

            var list = await (query.Select(a =>
            new AppointmentListDto
            {

                AppointmentTime = a.Status == AppointmentStatus.Booked ? a.TimeSlotFk.StartTime : (TimeSpan?)null,
                AppointmentDate = a.Status == AppointmentStatus.Booked ? a.TimeSlotFk.Date.AddHours(a.TimeSlotFk.StartTime.Hours) : (DateTime?)null,
                AppointmentId = a.Id,
                BookedBy = a.BookedBy,
                CustomerId = a.CustomerId,
                CustomerName = a.CustomerFk.Name,
                HerId = a.CustomerFk.HerId,
                Status = a.Status,
                UpgradeVersionId = a.UpgradeId,
                UpgradeVersion = a.UpgradeFk.Version
            }
            )).ToListAsync();

            return Ok(list);

        }

        [HttpGet("historic")]
        public async Task<ActionResult<List<AppointmentListDto>>> GetHistoricAppointments()
        {
            var query = _context.Appointments.Where(a => a.Status == AppointmentStatus.Cancelled || a.Status == AppointmentStatus.Completed);

            var list = await (query.Select(a =>
            new AppointmentListDto
            {
                //AppointmentTime = a.TimeSlotFk.StartTime,
                //AppointmentDate = a.TimeSlotFk.Date.AddHours(a.TimeSlotFk.StartTime.Hours),
                AppointmentId = a.Id,
                BookedBy = a.BookedBy,
                CustomerId = a.CustomerId,
                CustomerName = a.CustomerFk.Name,
                HerId = a.CustomerFk.HerId,
                Status = a.Status,
                UpgradeVersionId = a.UpgradeId,
                UpgradeVersion = a.UpgradeFk.Version
            }
            )).ToListAsync();

            return Ok(list);
        }


        // GET: api/Appointments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Appointment>> GetAppointment(Guid id)
        {
            var appointment = await _context.Appointments.FindAsync(id);

            if (appointment == null)
            {
                return NotFound();
            }

            return appointment;
        }

        [HttpPatch("status")]
        public async Task<ActionResult<Appointment>> UpdateAppointmentStatus(AppointmentStatusDto statusDto)
        {
            var appointment = await _context.Appointments.FindAsync(statusDto.Id);

            if (appointment == null)
            {
                return NotFound();
            }

            appointment.Status = statusDto.Status;
            _context.Appointments.Update(appointment);
            await _context.SaveChangesAsync();

            return appointment;
        }



        [HttpGet("{herId}")]
        public async Task<ActionResult<Appointment>> GetAppointmentByHerId(string HerId)
        {
            var appointment = await _context.Appointments.FindAsync(HerId);

            if (appointment == null)
            {
                return NotFound();
            }

            return appointment;
        }


        [HttpPut("booking")]
        public async Task<ActionResult> SaveBooking([FromBody] BookingDto input) // by customer
        {

            var TimeSlots = await _context.TimeSlots.FirstOrDefaultAsync(a => a.Date == input.Day && a.StartTime.Hours == input.Time && a.Available);
            if (TimeSlots == null)
                return BadRequest("Required time slot found");

            var appointment = await _context.Appointments.FirstOrDefaultAsync(a => a.CustomerId == input.CustomerId);

            appointment.Status = AppointmentStatus.Booked;
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
            //var ExistingAppointment = await _context.Appointments.FirstOrDefaultAsync(a => a.HerId == input.HerId);
            var ExistingAppointment = await _context.Appointments.FirstOrDefaultAsync(a => a.CustomerId == input.CustomerId);
            if (ExistingAppointment != null)
                return BadRequest("Appointment already exists");

            var appointment = new Appointment()
            {
                //HerId = input.HerId,
                UpgradeId = input.UpgradeId,
                Status = AppointmentStatus.Invited
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
