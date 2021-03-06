﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ApiProject.Data;
using ApiProject.Dto;
using ApiProject.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace ApiProject.Controllers
{
    [EnableCors("Default")]
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public AppointmentController(ApplicationDbContext context, IWebHostEnvironment hostingEnvironment)
        {
            _context = context;
            _hostingEnvironment = hostingEnvironment;
        }


        [HttpGet]
        [Route("GetAppointments")]
        public async Task<ActionResult<List<AppointmentListDto>>> GetAppointments(Guid? upgradeId)
        {
            try
            {
                var appointmentsQuery = _context.TimeSlots.Where(a=>!a.IsDeleted && a.Available);
                if (upgradeId != null)
                {
                    appointmentsQuery = appointmentsQuery.Where(a => a.UpgradeId == upgradeId);
                }

                var appointmentList = await appointmentsQuery.ToListAsync();
                var appointments = appointmentList.OrderBy(a => a.Date).GroupBy(a => a.Date).ToList();

                var list = new List<AppointmentListDto>();
                foreach (var item in appointments)
                {
                    var z = item.GroupBy(a => new { StartTime = a.StartTime, EndTime = a.EndTime });

                    list.Add(new AppointmentListDto()
                    {
                        Date = item.Key,
                        Appointments = z.Select(x => new AppointmentTimesDto { StartTime = x.Key.StartTime, EndTime = x.Key.EndTime }).ToList()
                    });
                }
                return list;
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [Route("delete-times")]
        [HttpDelete]
        public async Task<ActionResult> DeleteAppointmentTimes([FromQuery] DeleteAppointmentDaytime input)
        {
            var appointments = await _context.TimeSlots.Where(a => a.Date == input.Day && a.StartTime == input.StartTime).ToListAsync();
            if (appointments.Count() == 0)
            {
                return NotFound();
            }

            _context.TimeSlots.RemoveRange(appointments);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("delete-appointment-days")]
        public async Task<ActionResult> DeleteAppointmentDays(DateTime input)
        {
            var appointments = await _context.TimeSlots.Where(a => a.Date == input).ToListAsync();
            if (appointments.Count() == 0)
            {
                return NotFound();
            }
            appointments.ForEach(a => { a.IsDeleted = true; });
            _context.TimeSlots.RemoveRange(appointments);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // GET: api/Appointments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TimeSlot>>> GetAppointments()
        {
            return await _context.TimeSlots.ToListAsync();
        }

        // GET: api/Appointments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TimeSlot>> GetAppointment(Guid id)
        {
            var appointment = await _context.TimeSlots.FindAsync(id);

            if (appointment == null)
            {
                return NotFound();
            }

            return appointment;
        }

        // PUT: api/Appointments/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAppointment(Guid id, TimeSlot appointment)
        {
            if (id != appointment.Id)
            {
                return BadRequest();
            }

            _context.Entry(appointment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppointmentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Appointments
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Appointment>> PostAppointment(TimeSlot appointment)
        {
            _context.TimeSlots.Add(appointment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAppointment", new { id = appointment.Id }, appointment);
        }

        // DELETE: api/Appointments/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TimeSlot>> DeleteAppointment(Guid id)
        {
            var appointment = await _context.TimeSlots.FindAsync(id);
            if (appointment == null)
            {
                return NotFound();
            }

            _context.TimeSlots.Remove(appointment);
            await _context.SaveChangesAsync();

            return appointment;
        }

        private bool AppointmentExists(Guid id)
        {
            return _context.TimeSlots.Any(e => e.Id == id);
        }

    }
}
