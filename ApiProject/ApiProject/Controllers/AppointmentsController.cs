using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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


        [HttpGet("active")] //IN USE
        public async Task<ActionResult<List<AppointmentListDto>>> GetActiveAppointments()
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

        [HttpGet("historic")] //IN USE
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

        [HttpPatch("status")] //IN USE
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



        [HttpGet("{herId}")] //IN USE??
        public async Task<ActionResult<Appointment>> GetAppointmentByHerId(string HerId)
        {
            var appointment = await _context.Appointments.FindAsync(HerId);

            if (appointment == null)
            {
                return NotFound();
            }

            return appointment;
        }

        [HttpPost]
        public async Task<ActionResult> CreateAppointmentInvites(CreateAppointmentInviteDto input)
        {
            try
            {
                if (input.CustomerIds?.Count == 0)
                    return BadRequest("Customers count should not be null");

                var upgrade = await _context.Upgrades.FirstOrDefaultAsync(u => u.Id == input.UpgradeId);
                //Check wether there is an existing active appointment

                //Duplcation of invites should not be possible     
                var list = new List<Appointment>();
                input.CustomerIds?.ForEach(a =>
                {
                    list.Add(new Appointment() { CustomerId = a, UpgradeId = input.UpgradeId, Status = AppointmentStatus.Invited });
                });

                _context.Appointments.AddRange(list);
                await _context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost]
        [Route("updateUpgrade")]
        public async Task<ActionResult> UpdateUpgradeVersion(UpdateAppointmentInvites input)
        {
            try
            {
                if (input.AppointmentIds?.Count == 0)
                    return BadRequest("Customers count should not be null");

                var upgrade = await _context.Upgrades.FirstOrDefaultAsync(u => u.Id == input.UpgradeId);

                var list = _context.Appointments
                                  .Where(a => input.AppointmentIds.Any(id => id == a.Id))
                                  .ToList();

                list.ForEach(a =>
                   a.UpgradeId = input.UpgradeId
                );

                _context.Appointments.UpdateRange(list);
                await _context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
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


        [HttpPost]
        [Route("time")]
        public async Task<ActionResult> SetAppointmentTime(BookTimeDto input)
        {

            var timeSlots = await _context.TimeSlots.FirstOrDefaultAsync(a => a.Date == input.Day &&
                                                                         a.StartTime == input.StartTime &&
                                                                         a.Available);

            if (timeSlots == null)
                return BadRequest("No timeslot found");

            var appointment = await _context.Appointments.FirstOrDefaultAsync(a => a.Id == input.AppointmentId);
            if (appointment == null)
                return NotFound("No appointment found");


            timeSlots.Available = false;
            _context.TimeSlots.Update(timeSlots);
            await _context.SaveChangesAsync();


            appointment.Status = AppointmentStatus.Booked;
            appointment.TimeSlotId = timeSlots.Id;
            _context.Appointments.Update(appointment);
            await _context.SaveChangesAsync();

            return Ok();
        }



    }
}
