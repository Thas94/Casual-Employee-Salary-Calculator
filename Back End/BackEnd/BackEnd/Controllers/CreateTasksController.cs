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
    public class CreateTasksController : ApiController
    {
        private CreateTaskEntity db = new CreateTaskEntity();

        // GET: api/CreateTasks
        public IQueryable<CreateTask> GetCreateTasks()
        {
            return db.CreateTasks;
        }

        // GET: api/CreateTasks/5
        [ResponseType(typeof(CreateTask))]
        public IHttpActionResult GetCreateTask(int id)
        {
            CreateTask createTask = db.CreateTasks.Find(id);
            if (createTask == null)
            {
                return NotFound();
            }

            return Ok(createTask);
        }

        // PUT: api/CreateTasks/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCreateTask(int id, CreateTask createTask)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != createTask.CreateTaskID)
            {
                return BadRequest();
            }

            db.Entry(createTask).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CreateTaskExists(id))
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

        // POST: api/CreateTasks
        [ResponseType(typeof(CreateTask))]
        public IHttpActionResult PostCreateTask(CreateTask createTask)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CreateTasks.Add(createTask);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = createTask.CreateTaskID }, createTask);
        }

        // DELETE: api/CreateTasks/5
        [ResponseType(typeof(CreateTask))]
        public IHttpActionResult DeleteCreateTask(int id)
        {
            CreateTask createTask = db.CreateTasks.Find(id);
            if (createTask == null)
            {
                return NotFound();
            }

            db.CreateTasks.Remove(createTask);
            db.SaveChanges();

            return Ok(createTask);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CreateTaskExists(int id)
        {
            return db.CreateTasks.Count(e => e.CreateTaskID == id) > 0;
        }
    }
}