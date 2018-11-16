using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Getflix.Models
{
    public class DBFunk
    {
        private readonly FaqContext _context;

        public DBFunk(FaqContext context)
        {
            _context = context;
        }

        public List<faq> hentAlleFaq()
        {
            List<faq> alleFaq = _context.Henvendelser.Select(k => new faq()
            {
                id = k.id,
                navn = k.navn,
                omrode = k.omrode,
                melding = k.melding,
                svar = k.svar,
                rating = k.rating,
            }).
            ToList();
            return alleFaq;
        }   

        public faq hentEnFaq(int id)
        {

            Faq enDBFaq = _context.Henvendelser.FirstOrDefault(k => k.id == id);

            var enFaq= new faq()
            {
                id = enDBFaq.id,
                navn = enDBFaq.navn,
                omrode= enDBFaq.omrode,
                melding = enDBFaq.melding,
                svar = enDBFaq.svar,
                rating = enDBFaq.rating
            };
            return enFaq;
        }

        public bool lagreEnFaq(faq innFaq)
        {
            var nyFaq = new Faq
            {
                navn = innFaq.navn,
                omrode = innFaq.omrode,
                melding = innFaq.melding
            };

            try
            {
                _context.Henvendelser.Add(nyFaq);
                _context.SaveChanges();
            }
            catch(Exception feil)
            {
                return false;
            }
            return true;
        }

        //public bool oppRating(int id, faq innFaq)
        //{
        //    // finn kunden
        //    Faq funnetHenvendelse = _context.Henvendelser.FirstOrDefault(k => k.id == id);
        //    if (funnetHenvendelse == null)
        //    {
        //        return false;
        //    }
        //    // legg inn ny verdier i denne fra innKunde
        //    funnetHenvendelse.rating = innFaq.rating++;

        //    try
        //    {
        //        // lagre kunden
        //        _context.SaveChanges();
        //    }
        //    catch (Exception feil)
        //    {
        //        return false;
        //    }
        //    return true;
        //}

        public bool rateOpp(int id, faq innKunde)
        {
            // finn kunden
            Faq funnetKunde = _context.Henvendelser.FirstOrDefault(k => k.id == id);
            if (funnetKunde == null)
            {
                return false;
            }
            // legg inn ny verdier i denne fra innKunde
            funnetKunde.navn = innKunde.navn;
            funnetKunde.omrode= innKunde.omrode;
            funnetKunde.melding = innKunde.melding;
            funnetKunde.svar = innKunde.svar;

            try
            {
                // lagre kunden
                _context.SaveChanges();
            }
            catch (Exception feil)
            {
                return false;
            }
            return true;
        }
    }
}
