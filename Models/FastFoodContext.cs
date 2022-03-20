using Microsoft.EntityFrameworkCore;

namespace Restoran.Models{
    public class FastFoodContext:DbContext {

        public DbSet<FastFood> FastFoods {get; set;}
	    public DbSet<Sto> Stolovi {get; set;}
        public DbSet<Porudzbina> Porudzbine {get; set;}
        public DbSet<Stavka> Stavke {get; set;}
      
    
        public FastFoodContext(DbContextOptions options) : base(options){

        }
        
    } 
}