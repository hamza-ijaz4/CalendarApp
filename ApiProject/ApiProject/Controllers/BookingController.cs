using System;
using System.Collections.Generic;
using System.Linq;
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
        [Route("BookingInvites")]
        public async Task<ActionResult> CreateBookingInvites(CreateAppointmentInviteDto input)
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
        [Route("BookTime")]
        public async Task<ActionResult> SetBookingTime(SetBookingTimeDto input)
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

        [HttpGet("{appointmentId}")]
        public async Task<ActionResult<Guid>> GetUpgradeByAppointmentId(Guid appointmentId)
        {
            var appointment = await _context.Appointments.FirstOrDefaultAsync(a => a.Id == appointmentId);

    
            if (appointment == null || appointment.Status != AppointmentStatus.Invited) //Return an allready booked appointment message
            {
                return NotFound();
            }

            return appointment.UpgradeId;
        }
    }
}
