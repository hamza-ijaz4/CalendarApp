using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ApiProject.Extensions;
using ApiProject.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MimeTypes;

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

        public async Task<ActionResult<IEnumerable<Upgrade>>> GetUpgrades(AppointmentStatus status)
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
        [Route("versiones")]
        public async Task<ActionResult<List<KeyValuePair<Guid, string>>>> GetUpgradeLookups()
        {
            var list = await _context.Upgrades.Select(a => new KeyValuePair<Guid, string>(a.Id, a.Version)).ToListAsync();
            return list;
        }


        [HttpPost] 
        public async Task<ActionResult> CreateUpgrade()
        {
            try
            {
                var files = Request.Form.Files;
                var path = _hostingEnvironment.WebRootPath;
                var uploads = Path.Combine(path, "files");
                //var filePath = string.Empty;

                
                var Version = HttpContext.Request.Form["version"];
                var Description = HttpContext.Request.Form["description"];
                var DurationMin = Convert.ToInt32(HttpContext.Request.Form["durationMin"]);

                #region old code
                //var EndDate = Convert.ToDateTime(HttpContext.Request.Form["endDate"]);
                //var StartDate = Convert.ToDateTime(HttpContext.Request.Form["startDate"]);
                //var timeGroupsJson = HttpContext.Request.Form["timeGroupsJson"];
                //var timegroups = JsonConvert.DeserializeObject<List<TimeSlotGroupDto>>(timeGroupsJson);

                #endregion
                
                var upgrade = new Upgrade()
                {
                    Version = Version,
                    Description = Description,
                    DurationMin = DurationMin,
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

                _context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("{upgradeId}/file")]
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



        [HttpGet("{appointmentId}/appointment")]
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
