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
    public class AssignTasksController : ApiController
    {
        private AssignTasksEntities db = new AssignTasksEntities();

        // GET: api/AssignTasks
        public IQueryable<AssignTask> GetAssignTasks()
        {
            return db.AssignTasks;
        }

        // GET: api/AssignTasks/5
        [ResponseType(typeof(AssignTask))]
        public IHttpActionResult GetAssignTask(int id)
        {
            AssignTask assignTask = db.AssignTasks.Find(id);
            if (assignTask == null)
            {
                return NotFound();
            }

            return Ok(assignTask);
        }

        // PUT: api/AssignTasks/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAssignTask(int id, AssignTask assignTask)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != assignTask.AssignTaskID)
            {
                return BadRequest();
            }

            db.Entry(assignTask).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AssignTaskExists(id))
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

        // POST: api/AssignTasks
        [ResponseType(typeof(AssignTask))]
        public IHttpActionResult PostAssignTask(AssignTask assignTask)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.AssignTasks.Add(assignTask);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = assignTask.AssignTaskID }, assignTask);
        }

        // DELETE: api/AssignTasks/5
        [ResponseType(typeof(AssignTask))]
        public IHttpActionResult DeleteAssignTask(int id)
        {
            AssignTask assignTask = db.AssignTasks.Find(id);
            if (assignTask == null)
            {
                return NotFound();
            }

            db.AssignTasks.Remove(assignTask);
            db.SaveChanges();

            return Ok(assignTask);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AssignTaskExists(int id)
        {
            return db.AssignTasks.Count(e => e.AssignTaskID == id) > 0;
        }
    }
}