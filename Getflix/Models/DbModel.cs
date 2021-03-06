﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Getflix.Models
{
    public class Faq
    {
        [Key]
        public int id { get; set; }
        public string navn { get; set;  }
        public string omrode { get; set;  }
        public string melding { get; set;  }
        public int rating { get; set; }

        public virtual List<Svar> svarene { get; set; }
    }

    public class Svar
    {
        [Key]
        public int id { get; set; }
        public string navn { get; set; }
        public string svarmelding { get; set; }
        public int rating { get; set; }

        public virtual List<Faq> henvendelser { get; set; }
    }
   

    public class FaqContext : DbContext
    {
        public FaqContext(DbContextOptions<FaqContext> options)
            : base(options) { }

        public DbSet<Faq> Henvendelser { get; set; }

        public DbSet<Svar> Svarene { get; set; }
    }
}
