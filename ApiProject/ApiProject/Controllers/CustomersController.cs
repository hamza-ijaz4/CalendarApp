using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiProject.Data;
using ApiProject.Models;
using ApiProject.Dto;
using Microsoft.AspNetCore.Cors;
    
namespace ApiProject.Controllers
{
    [EnableCors("Default")]
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CustomersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("status")]
        public async Task<ActionResult<List<CustomerListDto>>> CustomersWithStatus()
        {
            try
            {

                var customersQuery = _context.Customers.AsQueryable();
                var appointmentQuery = _context.Appointments.AsQueryable().
                    Where(a=> a.Status != AppointmentStatus.Completed && a.Status != AppointmentStatus.Cancelled );


                var joinedQuery = from q in customersQuery
                                  join a in appointmentQuery
                                  on q.HerId equals a.CustomerFk.HerId
                                  into qaJoined
                                  from a in qaJoined.DefaultIfEmpty()
                                  select new CustomerListDto
                                  {
                                      HerId = q.HerId,
                                      Id = q.Id,
                                      Name = q.Name,
                                      GotAppointment = a != null ? true : false,
                                      appointmentId = a != null ? a.Id.ToString() : null,
                                      Status = a.Status,
                                      CurrentVersion = q.CurrentVersion,
                                      UpcommingUpgrade = a.Status == AppointmentStatus.Booked || a.Status == AppointmentStatus.Invited ? a.UpgradeFk.Version : null,
                                      UpcommingUpgradeId = a.Status == AppointmentStatus.Booked || a.Status == AppointmentStatus.Invited ? a.UpgradeFk.Id : (Guid?)null
                                  };

                var list = await joinedQuery.ToListAsync();
                return Ok(list);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }


        [HttpGet]
        [Route("WithoutAppointment")]
        public async Task<ActionResult<List<CustomerListDto>>> CustomersWithoutActiveAppointment()
        {
            try
            {

                var customersQuery = _context.Customers.AsQueryable();
                var appointmentQuery = _context.Appointments.AsQueryable().
                    Where(a=> a.Status != AppointmentStatus.Booked && a.Status != AppointmentStatus.Invited );


                var joinedQuery = from q in customersQuery
                                  join a in appointmentQuery
                                  on q.HerId equals a.CustomerFk.HerId
                                  into qaJoined
                                  from a in qaJoined.DefaultIfEmpty()
                                  select new CustomerListDto
                                  {
                                      HerId = q.HerId,
                                      Id = q.Id,
                                      Name = q.Name,
                                      GotAppointment = a != null ? true : false,
                                      appointmentId = a != null ? a.Id.ToString() : null,
                                      Status = a.Status,
                                      CurrentVersion = a.UpgradeFk.Version,
                                      UpcommingUpgrade = a.Status == AppointmentStatus.Booked || a.Status == AppointmentStatus.Invited ? a.UpgradeFk.Version : null,
                                  };

                var list = await joinedQuery.ToListAsync();
                return Ok(list);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }





        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(Guid id)
        {
            var customer = await _context.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }

        // PUT: api/Customers/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(Guid id, Customer customer)
        {
            if (id != customer.Id)
            {
                return BadRequest();
            }

            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
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

        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Customer>> DeleteCustomer(Guid id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return customer;
        }

        private bool CustomerExists(Guid id)
        {
            return _context.Customers.Any(e => e.Id == id);
        }



        //[HttpGet]
        //[Route("list")]
        //public async Task<ActionResult<List<CustomerListDto>>> CusomersList([FromQuery] CustomerListFilterDto input)
        //{
        //    try
        //    {

        //        var customersQuery = _context.Customers.AsQueryable();
        //        var appointmentQuery = _context.Appointments.AsQueryable();

        //        if (input.Status == AppointmentStatus.Completed)
        //        {
        //            appointmentQuery = appointmentQuery.Where(a => a.Status == AppointmentStatus.Completed || a.Status == AppointmentStatus.Cancelled);
        //        }


        //        var joinedQuery = from q in customersQuery
        //                          join a in appointmentQuery
        //                          on q.HerId equals a.CustomerFk.HerId
        //                          into qaJoined
        //                          from a in qaJoined.DefaultIfEmpty()
        //                          select new CustomerListDto
        //                          {
        //                              HerId = q.HerId,
        //                              Id = q.Id,
        //                              Name = q.Name,
        //                              GotAppointment = a != null ? true : false,
        //                              Status = a.Status,
        //                              CurrentVersion = a.UpgradeFk.Version,
        //                              UpcommingUpgrade = a.Status == AppointmentStatus.Booked || a.Status == AppointmentStatus.Invited ? a.UpgradeFk.Version : null,
        //                          };

        //        var list = await joinedQuery.ToListAsync();
        //        return Ok(list);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }

        //}

    }
}
