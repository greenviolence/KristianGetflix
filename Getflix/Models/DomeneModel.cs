using System.ComponentModel.DataAnnotations;

namespace Getflix.Models
{
    public class faq
    {
        public int id { get; set; }

        [Required]
        [RegularExpression("^[a-zæøåA-ZÆØÅ .\\-]{2,30}$")]
        public string navn { get; set; }

        [Required]
        public string omrode { get; set; }

        [Required]
        public string melding { get; set; }

        public string svar { get; set; }
        
        public int rating { get; set; }
    }
}
