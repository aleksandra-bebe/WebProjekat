using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Restoran.Models{
    public class FastFood{
        [Key]
        public int Id { get; set; }

        public int N { get; set; }
        
        [MaxLength(255)]
        public string Naziv { get; set; }
        
        public virtual List<Sto> Stolovi { get; set; }
        
    }
}