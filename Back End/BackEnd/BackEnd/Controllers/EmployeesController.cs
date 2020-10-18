using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using BackEnd.Models;

namespace BackEnd.Controllers
{
    public class EmployeesController : ApiController
    {
        private Casual_Employees_Salary_Calculation_SystemEntities db = new Casual_Employees_Salary_Calculation_SystemEntities();

        // GET: api/Employees
        public IQueryable<Employee> GetEmployees()
        {
            //returning all employees records
            return db.Employees;
        }

        // GET: api/Employees/5
        [ResponseType(typeof(Employee))]
        public IHttpActionResult GetEmployee(int id)
        {
            //find record equal to the id parsed
            Employee employee = db.Employees.Find(id);

            //check if returned record is present
            if (employee == null)
            {
                //return 404 code if not found
                return NotFound();
            }

            // return code 200 if found and object
            return Ok(employee);
        }

        // PUT: api/Employees/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutEmployee(int id, Employee employee)
        {
            // check if the model state after binding process
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //check if parsed ID is found
            if (id != employee.EmployeeID)
            {
                return BadRequest();
            }

            //modifying record if all succeeds else return 404 code
            db.Entry(employee).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Employees
        [ResponseType(typeof(Employee))]
        public IHttpActionResult PostEmployee(Employee employee)
        {
            // check if the model state after binding process
            if (!ModelState.IsValid)
            {
                //return 404 code
                return BadRequest(ModelState);
            }

            //adding record
            db.Employees.Add(employee);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = employee.EmployeeID }, employee);
        }

        // DELETE: api/Employees/5
        [ResponseType(typeof(Employee))]
        public IHttpActionResult DeleteEmployee(int id)
        {
            //find record equal to the id parsed
            Employee employee = db.Employees.Find(id);
            if (employee == null)
            {
                return NotFound();
            }

            //removing record
            db.Employees.Remove(employee);
            db.SaveChanges();

            return Ok(employee);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EmployeeExists(int id)
        {
            return db.Employees.Count(e => e.EmployeeID == id) > 0;
        }
    }
}