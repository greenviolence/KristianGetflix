using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

// Database funksjonalitet for løsningen

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
            List<faq> alleFaq = _context.Henvendelser.Select(f => new faq()
            {
                id = f.id,
                navn = f.navn,
                omrode = f.omrode,
                melding = f.melding,
                svar = f.svar,
                rating = f.rating,
            }).
            ToList();
            return alleFaq;
        }   

        public faq hentEnFaq(int id)
        {

            Faq enDBFaq = _context.Henvendelser.FirstOrDefault(f => f.id == id);

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

        public bool endre(int id, faq innFaq)
        {

            Faq funnetHenvendelse = _context.Henvendelser.FirstOrDefault(f => f.id == id);
            if (funnetHenvendelse == null)
            {
                return false;
            }

            funnetHenvendelse.navn = innFaq.navn;
            funnetHenvendelse.omrode = innFaq.omrode;
            funnetHenvendelse.melding = innFaq.melding;
            funnetHenvendelse.svar = innFaq.svar;
            funnetHenvendelse.rating = innFaq.rating;

            try
            {
                _context.SaveChanges();
            }
            catch (Exception feil)
            {
                return false;
            }
            return true;
        }

        public bool rateOpp(int id, faq innFaq)
        {
            Faq funnetHenvendelse = _context.Henvendelser.FirstOrDefault(f => f.id == id);
            if (funnetHenvendelse == null)
            {
                return false;
            }

            funnetHenvendelse.navn = innFaq.navn;
            funnetHenvendelse.omrode = innFaq.omrode;
            funnetHenvendelse.melding = innFaq.melding;
            funnetHenvendelse.svar = innFaq.svar;
            funnetHenvendelse.rating = innFaq.rating;


            try
            {
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
