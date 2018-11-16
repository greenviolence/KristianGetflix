using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Getflix.Models;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Net.Http.Formatting;
using System.Data.Common;
using Microsoft.AspNetCore.Mvc.Formatters.Json;

namespace Getflix.Controllers
{
    [Route("api/[controller]")]
    public class FaqController : Controller
    {
        private readonly FaqContext _context;

        public FaqController(FaqContext context)
        {
            _context = context;
        }

        [HttpGet]
        public JsonResult Get()
        {
            var faqDB = new DBFunk(_context);
            List<faq> alleFaq = faqDB.hentAlleFaq();
            return Json(alleFaq);
        }

        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            var faqDB = new DBFunk(_context);
            faq enFaq = faqDB.hentEnFaq(id);
            return Json(enFaq);
        }

        [HttpPost]
        public JsonResult Post([FromBody]faq innFaq)
        {
            if (ModelState.IsValid)
            {
                var faqDB = new DBFunk(_context);
                bool OK = faqDB.lagreEnFaq(innFaq);
                if (OK)
                {
                    return Json("OK");
                }
            }
            return Json("Kunne ikke sette inn spørsmålet i DB");
        }

        [HttpPut("{id}")]
        public JsonResult Put(int id, [FromBody]faq innFaq)
        {
            if (ModelState.IsValid)
            {
                var kundeDb = new DBFunk(_context);
                bool OK = kundeDb.rateOpp(id, innFaq);
                if (OK)
                {
                    return Json("OK");
                }
            }
            return Json("Kunne ikke endre kunden i DB");
        }
    }
}
