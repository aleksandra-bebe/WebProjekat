using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Restoran.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace WebProjekat.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FastFoodController : ControllerBase
    {
        public FastFoodContext Context;
        public FastFoodController(FastFoodContext context)
        {
            Context=context;
        }

        [Route("GetFastFood")]
        [HttpGet]
        public async Task<IEnumerable<FastFood>> GetFastFood(){

          
            return await Context.FastFoods.Include("Stolovi.Porudzbina.Stavke").ToListAsync();
          
        }

        
        
        [HttpGet]
        [Route("GetFastFood/{id}")]
        public async Task<FastFood> GetFastFood(int id) {
            return await Context.FastFoods.Include("Stolovi.Porudzbina.Stavke").FirstOrDefaultAsync(p => p.Id == id);
          
        }
        
        [HttpPost]
        [Route("CreateFastFood")]
        public async Task<int> CreateFastFood([FromBody] FastFood ff )
        {
            Context.FastFoods.Add(ff);
            await Context.SaveChangesAsync();
            return ff.Id;
        }
        
        [HttpPut]
        [Route("EditFastFood/{id}")]
        public async Task<IActionResult> EditFastFood(int id,[FromBody] FastFood ff)
        {
            FastFood old = await Context.FastFoods.FindAsync(id);
            if(old == null) return StatusCode(404);
            old.Naziv =ff.Naziv;
            old.N = ff.N;
            await Context.SaveChangesAsync();
            return StatusCode(204);
        }
        
        [HttpDelete]
        [Route("DeleteFastFood/{id}")]
        public async Task<IActionResult> DeleteFastFood(int id)
        {
            FastFood ff = await Context.FastFoods.Include("Stolovi.Porudzbina.Stavke").FirstOrDefaultAsync(p => p.Id == id);
            if(ff==null) return StatusCode(404);
            Context.Remove(ff);
            await Context.SaveChangesAsync();
            return StatusCode(204);
        }
        

    }
}