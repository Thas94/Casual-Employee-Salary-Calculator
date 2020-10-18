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
    public class CreateRolesController : ApiController
    {
        private CreateRolesEntities db = new CreateRolesEntities();

        // GET: api/CreateRoles
        public IQueryable<CreateRole> GetCreateRoles()
        {
            return db.CreateRoles;
        }

        // GET: api/CreateRoles/5
        [ResponseType(typeof(CreateRole))]
        public IHttpActionResult GetCreateRole(int id)
        {
            CreateRole createRole = db.CreateRoles.Find(id);
            if (createRole == null)
            {
                return NotFound();
            }

            return Ok(createRole);
        }

        // PUT: api/CreateRoles/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCreateRole(int id, CreateRole createRole)
        {
            // check if the model state after binding process
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //check if parsed ID is found
            if (id != createRole.CreateRoleID)
            {
                return BadRequest();
            }

            //modifying record if all succeeds else return 404 code
            db.Entry(createRole).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CreateRoleExists(id))
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

        // POST: api/CreateRoles
        [ResponseType(typeof(CreateRole))]
        public IHttpActionResult PostCreateRole(CreateRole createRole)
        {
            // check if the model state after binding process
            if (!ModelState.IsValid)
            {
                //return 404 code
                return BadRequest(ModelState);
            }

            //adding record
            db.CreateRoles.Add(createRole);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = createRole.CreateRoleID }, createRole);
        }

        // DELETE: api/CreateRoles/5
        [ResponseType(typeof(CreateRole))]
        public IHttpActionResult DeleteCreateRole(int id)
        {
            //find record equal to the id parsed
            CreateRole createRole = db.CreateRoles.Find(id);
            if (createRole == null)
            {
                return NotFound();
            }

            //removing record
            db.CreateRoles.Remove(createRole);
            db.SaveChanges();

            return Ok(createRole);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CreateRoleExists(int id)
        {
            return db.CreateRoles.Count(e => e.CreateRoleID == id) > 0;
        }
    }
}