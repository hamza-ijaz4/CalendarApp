using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiProject.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApiProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UpgradeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;


        public UpgradeController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<KeyValuePair<int, string>>>> GetUpgradeLookups()
        {
            var list = await _context.Upgrades.Select(a => new KeyValuePair<int, string>(a.Id, a.Title)).ToListAsync();
            return list;
        }


    }
}
