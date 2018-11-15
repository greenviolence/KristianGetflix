using System.ComponentModel.DataAnnotations;

namespace Getflix.Models
{
    public class faq
    {
        [Key]
        public int id { get; set; }

        [Required]
        [RegularExpression("^[a-zæøåA-ZÆØÅ .\\-]{2,30}$")]
        public string navn { get; set; }

        [Required]
        [RegularExpression("^[a-zæøåA-ZÆØÅ .\\-]{2,30}$")]
        public string omrode { get; set; }

        [Required]
        public string melding { get; set; }
        
        public int rating { get; set; }
    }

    //public class svar
    //{
    //    public int sid { get; set; }

    //    [Required]
    //    public string svarMelding { get; set; }
    //}
}
