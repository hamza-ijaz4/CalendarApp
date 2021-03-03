using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiProject.Data;
using ApiProject.Dto;
using ApiProject.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
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


        public TimeSlotsController(ApplicationDbContext context)
        {
            _context = context;
        }


        // GET: api/Timeslots
        [HttpGet]
        [Route("days")]
        public async Task<ActionResult<List<TimeSlotGroupListDto>>> GetTimeSlotDays()
        {
            try
            {
                var timeSlotQuery = _context.TimeSlots.Where(a => !a.IsDeleted && a.Available);

                var timeSlotList = await timeSlotQuery.ToListAsync();
                var timeSlots = timeSlotList.OrderBy(a => a.Date).GroupBy(a => a.Date).ToList();

                var list = new List<TimeSlotGroupListDto>();
                foreach (var item in timeSlots)
                {
                    var z = item.GroupBy(a => new { StartTime = a.StartTime, EndTime = a.EndTime }).ToList();

                    var count = z.Count();
                    list.Add(new TimeSlotGroupListDto()
                    {
                        Date = item.Key,
                        TimeSlotGroups = z.Select(x => new TimeSlotGroupDto { StartTime = x.Key.StartTime, EndTime = x.Key.EndTime, Slots = x.Count() }).ToList()
                    });
                }
                return list;
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("multiple")] // fix
        public async Task<ActionResult> createMultipleTimeSlots(SaveTimeSlotDto input)
        {
            try { 
                var timegroups = JsonConvert.DeserializeObject<List<TimeSlotGroupDto>>(input.TimesGroup);

                for (var dt = input.StartDate; dt <= input.EndDate; dt = dt.AddDays(1))
                {
                    timegroups.ForEach(t =>
                    {
                        for (int s = 0; s < t.Slots; s++)
                        {
                            _context.Add(new TimeSlot
                            {
                                Date = dt,
                                StartTime = t.StartTime,
                                EndTime = t.EndTime,
                                Available = true,
                            });
                        }

                    });
                }

                await _context.SaveChangesAsync();

                return Ok(input);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("timeslot")]
        [HttpDelete]
        public async Task<ActionResult> DeleteTimeSlot(DeleteTimeSlotGroupDto input)
        {

            var timeslotGroup = await _context.TimeSlots
                                              .Where(a => a.Date == input.Day &&
                                                          a.StartTime == input.StartTime &&
                                                          a.EndTime == input.EndTime &&
                                                          a.Available)
                                              .FirstOrDefaultAsync();

            if (timeslotGroup == null)
            {
                return NotFound();
            }

            _context.TimeSlots.Remove(timeslotGroup);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("day")]
        public async Task<ActionResult> DeleteDayTimeSlot([FromBody] DateTime input)
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
