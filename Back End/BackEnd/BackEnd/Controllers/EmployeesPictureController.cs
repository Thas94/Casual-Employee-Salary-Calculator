using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace BackEnd.Controllers
{
    public class EmployeesPictureController : ApiController
    {
        [HttpPost]
        [Route("api/UploadImages")]

        public HttpResponseMessage UploadImages()
        {
            string imageName = null;
            var httpRequest = HttpContext.Current.Request;
            //Upload Image
            var postedFile = httpRequest.Files["Image"];
            //Create custom filename
            imageName = new String(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(10).ToArray()).Replace(" ", "-");
            imageName = imageName + DateTime.Now.ToString("yymmssffff") + Path.GetExtension(postedFile.FileName);
            var FilePath = HttpContext.Current.Server.MapPath("~/images/" + imageName);
            postedFile.SaveAs(FilePath);

            return Request.CreateResponse(HttpStatusCode.Created);
        }

    }
}
