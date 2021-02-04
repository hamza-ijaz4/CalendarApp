using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ApiProject.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace ApiProject.Controllers
{
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

        [HttpGet]
        public async Task<ActionResult<List<KeyValuePair<int, string>>>> GetUpgradeLookups()
        {
            var list = await _context.Upgrades.Select(a => new KeyValuePair<int, string>(a.Id, a.Title)).ToListAsync();
            return list;
        }



        [HttpPost]
        public async Task<ActionResult> SaveAppointments()
        {
            try
            {
                var file = Request.Form.Files;
                var path = _hostingEnvironment.WebRootPath;
                var uploads = Path.Combine(path, "files");
                var filePath = string.Empty;

                if (file.Count() > 0)
                {
                    filePath = Path.Combine(uploads, file[0].FileName);
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        file[0].CopyTo(fileStream);
                    }
                }

                var appointmnetsJson = HttpContext.Request.Form["appointmnetsJson"];
                var Title = HttpContext.Request.Form["title"];
                var Description = HttpContext.Request.Form["description"];
                var Duration = Convert.ToInt32(HttpContext.Request.Form["duration"]);
                var EndDate = Convert.ToDateTime(HttpContext.Request.Form["endDate"]);
                var StartDate = Convert.ToDateTime(HttpContext.Request.Form["startDate"]);
                var FilePath = filePath;

                var upgrade = new Upgrade()
                {
                    Title = Title,
                    Description = Description,
                    FilePath = filePath,
                    Duration = Duration,
                    StartDate = StartDate,
                    EndDate = EndDate
                };


                _context.Upgrades.Add(upgrade);
                await _context.SaveChangesAsync();

                var appointmnets = JsonConvert.DeserializeObject<List<Appointment>>(appointmnetsJson);

                appointmnets.ForEach(a =>
                {
                    a.UpgradeId = upgrade.Id;
                    _context.Appointments.Add(a);
                    _context.SaveChanges();
                });
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

    }
}
