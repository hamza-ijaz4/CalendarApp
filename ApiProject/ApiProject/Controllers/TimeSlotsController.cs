using System;
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
    public class TimeSlotsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public TimeSlotsController(ApplicationDbContext context, IWebHostEnvironment hostingEnvironment)
        {
            _context = context;
            _hostingEnvironment = hostingEnvironment;
        }


        // GET: api/Timeslots
        [HttpGet]
        [Route("{upgradeId}/days")]
        public async Task<ActionResult<List<TimeSlotGroupListDto>>> UpgradeTimeSlots(Guid? upgradeId)
        {
            try
            {
                var timeSlotQuery = _context.TimeSlots.Where(a => !a.IsDeleted && a.Available);

                var timeSlotList = await timeSlotQuery.ToListAsync();
                var timeSlots = timeSlotList.OrderBy(a => a.Date).GroupBy(a => a.Date).ToList();

                var list = new List<TimeSlotGroupListDto>();
                foreach (var item in timeSlots)
                {
                    var z = item.GroupBy(a => new { StartTime = a.StartTime, EndTime = a.EndTime });

                    list.Add(new TimeSlotGroupListDto()
                    {
                        Date = item.Key,
                        TimeSlotGroups = z.Select(x => new TimeSlotGroupDto { StartTime = x.Key.StartTime, EndTime = x.Key.EndTime }).ToList()
                    });
                }
                return list;
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [Route("{upgradeId}/timegroup")]
        [HttpDelete]
        public async Task<ActionResult> DeleteTimeSlotGroups(DeleteTimeSlotGroupDto input)
        {

            var timeslotGroup = await _context.TimeSlots
                                              .Where(a => a.Date == input.Day &&
                                                          a.StartTime == input.StartTime &&
                                                          a.EndTime == input.EndTime &&
                                                          a.Available)
                                              .ToListAsync();

            if (timeslotGroup.Count == 0)
            {
                return NotFound();
            }

            _context.TimeSlots.RemoveRange(timeslotGroup);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("{upgradeId}/day")]
        public async Task<ActionResult> DeleteDayTimeSlot([FromBody]DateTime input)
        {
            var date = input.Date.AddDays(1).Date;
            var timeSlotDay = await _context.TimeSlots.Where(a => a.Date.Date == date).ToListAsync();
            if (timeSlotDay.Count() == 0)
            {
                return NotFound();
            }
            timeSlotDay.ForEach(a => { a.IsDeleted = true; });
            _context.TimeSlots.UpdateRange(timeSlotDay);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // GET: api/Timeslots
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TimeSlot>>> GetAppointments()
        {
            return await _context.TimeSlots.ToListAsync();
        }

        // GET: api/Timeslot/5
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

        // PUT: api/Timeslot/5
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
