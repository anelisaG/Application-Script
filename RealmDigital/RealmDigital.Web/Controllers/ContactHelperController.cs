using _RealmDigital.DataAccessLayer.Framework.EntityFrameworkModels;
using _RealmDigital.DataAccessLayer.Tasks;
using _RealmDigital.Domain.BusinessObect;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace _RealmDigital.Web.Controllers
{
    public class ContactHelperController : ApiController
    {
        [HttpGet]
        public IHttpActionResult GetContactList()
        {
            try
            {
                return Ok(JsonConvert.SerializeObject(new PeopleTask().GetUserContactInformation()));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        public IHttpActionResult MaintainContactDetails(Contact contact)
        {
            try
            {
                var results = new PeopleTask().MaintainContactDetails(contact);

                return Ok(results);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

        }

        [HttpPost]
        public IHttpActionResult DeleteContactDetails(Contact contact)
        {
            try
            {
                var results = new PeopleTask().DeleteContactDetails(contact);

                return Ok(results);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

        }

        [HttpGet]
        public IHttpActionResult GetPeopleListDropdownData()
        {
            return Ok(JsonConvert.SerializeObject(new PeopleTask().GetPeopleList()));
        }

        [HttpGet]
        public IHttpActionResult SearchContact(string searchKeyWord)
        {
            if (string.IsNullOrWhiteSpace(searchKeyWord.TrimStart().TrimEnd())) return Ok();

            try
            {

                return Ok(JsonConvert.SerializeObject(new PeopleTask().SearchContact(searchKeyWord)));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

        }
    }
}
