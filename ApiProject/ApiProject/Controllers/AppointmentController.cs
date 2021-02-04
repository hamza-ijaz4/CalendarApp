using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
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
        public async Task<ActionResult<List<AppointmentListDto>>> GetAppointments(int? upgradeId)
        {
            try
            {
                var upgrades = _context.Upgrades.AsQueryable();
                var bookings = _context.Bookings.AsQueryable();
                if (upgradeId.HasValue)
                {
                    upgrades = upgrades.Where(a => a.Id == upgradeId);
                }

                var _list = await upgrades.Include(a => a.Appointments).OrderByDescending(a => a.Id)
                                   .Select(a => new AppointmentListDto
                                   {
                                       UpgradeId = a.Id,
                                       Date = a.StartDate,
                                       Duration = a.Duration,
                                       Appointments = a.Appointments.Where(x=> !bookings.Any(c=>c.AppointmentId == x.Id )).Select(x=> new AppointmentDto { StartTime = x.StartTime, EndTime = x.EndTime, Slots = x.Slots, Id = x.Id }).ToList()
                                   }).ToListAsync();
                return _list;
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
