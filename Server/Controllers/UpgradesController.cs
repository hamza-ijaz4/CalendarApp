using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CalenderAppV2.Server.Database;
using Newtonsoft.Json;

namespace CalenderAppV2.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UpgradesController : ControllerBase
    {
        private readonly BookingDbContext _context;

        public UpgradesController(BookingDbContext context)
        {
            _context = context;
        }

        // GET: api/Upgrades
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Upgrade>>> GetUpgrades()
        {
            return await _context.Upgrades.ToListAsync();
        }

        // GET: api/Upgrades/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Upgrade>> GetUpgrade(Guid id)
        {
            var upgrade = await _context.Upgrades.FindAsync(id);

            if (upgrade == null)
            {
                return NotFound();
            }

            return upgrade;
        }

        // PUT: api/Upgrades/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUpgrade(Guid id, Upgrade upgrade)
        {
            if (id != upgrade.Id)
            {
                return BadRequest();
            }

            _context.Entry(upgrade).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UpgradeExists(id))
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

        // POST: api/Upgrades
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Upgrade>> PostUpgrade()//(Upgrade upgrade)
        {
            try
            {
                //var file = Request.Form.Files;

                //var path = _hostingEnvironment.WebRootPath;
                //var uploads = Path.Combine(path, "files");
                //var filePath = string.Empty;

                //if (file.Count() > 0)
                //{
                //    filePath = Path.Combine(uploads, file[0].FileName);
                //    using (var fileStream = new FileStream(filePath, FileMode.Create))
                //    {
                //        file[0].CopyTo(fileStream);
                //    }
                //}


                var timeGroupsJson = HttpContext.Request.Form["timeGroupsJson"];
                var Version = HttpContext.Request.Form["version"];
                var Description = HttpContext.Request.Form["description"];
                var DurationMin = Convert.ToInt32(HttpContext.Request.Form["durationMin"]);
                var EndDate = Convert.ToDateTime(HttpContext.Request.Form["endDate"]);
                var StartDate = Convert.ToDateTime(HttpContext.Request.Form["startDate"]);
                //var FilePath = filePath;
                var timegroups = JsonConvert.DeserializeObject<List<Timegroup>>(timeGroupsJson);

                var upgrade = new Upgrade()
                {
                    Version = Version,
                    Description = Description,
                    // FilePath = filePath,
                    DurationMin = DurationMin,
                    StartDate = StartDate,
                    EndDate = EndDate
                };


                _context.Upgrades.Add(upgrade);
                await _context.SaveChangesAsync();


                for (var dt = StartDate; dt <= EndDate; dt = dt.AddDays(1))
                {
                    timegroups.ForEach(t =>
                    {
                        for (int s = 0; s < t.Slots; s++)
                        {
                            _context.Add(new Appointment
                            {
                                Date = dt,
                                StartTime = t.StartTime,
                                Available = true,
                                UpgradeId = upgrade.Id
                            });
                        }

                    });
                }

                _context.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            //  return CreatedAtAction("GetUpgrade", new { id = upgrade.Id }, upgrade);
        }

        // DELETE: api/Upgrades/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Upgrade>> DeleteUpgrade(Guid id)
        {
            var upgrade = await _context.Upgrades.FindAsync(id);
            if (upgrade == null)
            {
                return NotFound();
            }

            _context.Upgrades.Remove(upgrade);
            await _context.SaveChangesAsync();

            return upgrade;
        }

        private bool UpgradeExists(Guid id)
        {
            return _context.Upgrades.Any(e => e.Id == id);
        }
    }

    class Timegroup
    {
        public TimeSpan StartTime { get; set; }
        public int Slots { get; set; }

    }
}
