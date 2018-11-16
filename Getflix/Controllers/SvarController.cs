using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Getflix.Models;

namespace Getflix.Controllers
{
    [Route("api/[controller]")]
    public class SvarController : Controller
    {
        private readonly FaqContext _context;

        public SvarController(FaqContext context)
        {
            _context = context;
        }

        [HttpGet]
        public JsonResult Get()
        {
            var svarDB = new KontaktDB(_context);
            List<svar> alleSvar = svarDB.hentAlleSvar();
            return Json(alleSvar);
        }

        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            var svarDB = new KontaktDB(_context);
            svar etSvar= svarDB.hentEtSvar(id);
            return Json(etSvar);
        }

        [HttpPut("{id}")]
        public JsonResult Put(int id, [FromBody]faq innFaq)
        {
            if (ModelState.IsValid)
            {
                var svarDb = new KontaktDB(_context);
                bool OK = svarDb.rateOpp(id, innFaq);
                if (OK)
                {
                    return Json("OK");
                }
            }
            return Json("Kunne ikke endre kunden i DB");
        }

        [HttpPost]
        public JsonResult Post([FromBody]faq innFaq)
        {
            if (ModelState.IsValid)
            {
                var faqDB = new KontaktDB(_context);
                bool OK = faqDB.lagreEnFaq(innFaq);
                if (OK)
                {
                    return Json("OK");
                }
            }
            return Json("Kunne ikke sette inn spørsmålet i DB");
        }
    }
}