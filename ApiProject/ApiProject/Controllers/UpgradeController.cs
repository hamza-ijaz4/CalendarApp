using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ApiProject.Data;
using ApiProject.Dto;
using ApiProject.Extensions;
using ApiProject.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MimeTypes;
using Newtonsoft.Json;

namespace ApiProject.Controllers
{
    [EnableCors("Default")]
    [Route("api/[controller]")]
    [ApiController]
    public class UpgradeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _hostingEnvironment;


        public UpgradeController(ApplicationDbContext context, IWebHostEnvironment hostingEnvironment)
        {
            _context = context;
            _hostingEnvironment = hostingEnvironment;
        }


        // GET: api/Upgrades
        [HttpGet]

        public async Task<ActionResult<IEnumerable<Upgrade>>> GetUpgrades()
        {
            return await _context.Upgrades.ToListAsync();
        }

        // GET: api/Upgrade/5
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

        // PUT: api/Upgrade/5
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

        [HttpGet]
        [Route("api/upgrades/versiones")]
        public async Task<ActionResult<List<KeyValuePair<Guid, string>>>> GetUpgradeLookups()
        {
            var list = await _context.Upgrades.Select(a => new KeyValuePair<Guid, string>(a.Id, a.Version)).ToListAsync();
            return list;
        }


        [HttpPost]
        [Route("api/upgrade")]
        public async Task<ActionResult> CreateUpgradeAndTimeSlots()
        {
            try
            {
                var files = Request.Form.Files;
                var path = _hostingEnvironment.WebRootPath;
                var uploads = Path.Combine(path, "files");
                //var filePath = string.Empty;

                var timeGroupsJson = HttpContext.Request.Form["timeGroupsJson"];
                var Version = HttpContext.Request.Form["version"];
                var Description = HttpContext.Request.Form["description"];
                var DurationMin = Convert.ToInt32(HttpContext.Request.Form["durationMin"]);
                var EndDate = Convert.ToDateTime(HttpContext.Request.Form["endDate"]);
                var StartDate = Convert.ToDateTime(HttpContext.Request.Form["startDate"]);

                var timegroups = JsonConvert.DeserializeObject<List<TimeSlotGroupDto>>(timeGroupsJson);

                var upgrade = new Upgrade()
                {
                    Version = Version,
                    Description = Description,
                    DurationMin = DurationMin,
                    StartDate = StartDate,
                    EndDate = EndDate,
                };

                if (files.Count() > 0)
                {
                    upgrade.FileName = files[0].FileName;
                    using (var stream = files[0].OpenReadStream())
                    {
                        upgrade.Bytes = stream.ReadAllBytes();
                    }
                }

                _context.Upgrades.Add(upgrade);
                await _context.SaveChangesAsync();


                for (var dt = StartDate; dt <= EndDate; dt = dt.AddDays(1))
                {
                    timegroups.ForEach(t =>
                    {
                        for (int s = 0; s < t.Slots; s++)
                        {
                            _context.Add(new TimeSlot
                            {
                                Date = dt,
                                StartTime = t.StartTime,
                                EndTime = new TimeSpan(t.StartTime.Days, t.StartTime.Hours, t.StartTime.Minutes + DurationMin, t.StartTime.Seconds),
                                Available = true,
                                UpgradeId = upgrade.Id,
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
        }

        [HttpGet]
        [Route("api/upgrade/{upgradeId}/file")]
        public async Task<ActionResult> GetUpgradeFile(Guid upgradeId)
        {
            var upgrade = _context.Upgrades.FirstOrDefault(a => a.Id == upgradeId);
            if (upgrade == null)
                return NotFound();
            if (upgrade.Bytes == null)
                return NoContent();
            var index = upgrade.FileName.IndexOf(".");
            var ext = upgrade.FileName.Substring(index + 1);
            return new FileContentResult(upgrade.Bytes,
                        MimeTypeMap.GetMimeType(ext))
            {
                FileDownloadName = $"{upgrade.FileName}"
            };
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
}
