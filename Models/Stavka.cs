using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Restoran.Models{
    public class Stavka{
        [Key]
        public int Id { get; set; }
       
        [MaxLength(5)]
        public string Vrsta { get; set; }
       
        
        [MaxLength(15)]
        public string Naziv { get; set; }
        
        public int PorudzbinaId { get; set;}
        

    }
}