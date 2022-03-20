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
    public class StoController : ControllerBase
    {
        public FastFoodContext Context;
        public StoController(FastFoodContext context)
        {
            Context=context;
        }
        [HttpPost]
        [Route("CreateSto/{fastfoodId}")]
         public async Task<int> CreateSto(int fastfoodId, [FromBody] Sto s) {
            FastFood ff=null;
            if(s.Status=="+"){
                ff = await Context.FastFoods.FindAsync(fastfoodId);
                ff.N++;
         
            }
            s.Status="Slobodan";
            s.FastFoodId=fastfoodId;
            Context.Stolovi.Add(s);
            await Context.SaveChangesAsync();
            return s.Id;
        }
        
        [Route("ZauzmiSto/{id}")]
        [HttpPut]
        public async Task<IActionResult> ZauzmiSto(int id, [FromBody] Sto c) {
            
            Sto old= await Context.Stolovi.FindAsync(id);
            if(old==null )
                return StatusCode(404);
            if(old.Status=="Zauzet")
                 return StatusCode(403);
            
            old.Status=c.Status;
            
            await Context.SaveChangesAsync();
            return StatusCode(204);
           
            
        }
        [HttpGet]
        [Route("GetSto/{id}")]
        public async Task<Sto> GetStolovi(int id){
            
            return await Context.Stolovi.FindAsync(id);
        }
        [Route("OslobodiSto/{id}")]
        [HttpPut]
        public async Task<IActionResult> OslobodiSto(int id, [FromBody] Sto c) {
            
            Sto old = await Context.Stolovi.FindAsync(id);
            if(old==null || old.Status=="Slobodan")
                return StatusCode(405);
            old.Status =c.Status;
            await Context.SaveChangesAsync();
            return StatusCode(204);
        }

        [HttpDelete]
        [Route("DeleteSto/{id}")]
        public async Task<IActionResult> DeleteSto(int id) {
            Sto old = await Context.Stolovi.FindAsync(id);
            if (old == null) return StatusCode(403);
            Context.Stolovi.Remove(old);
            await Context.SaveChangesAsync();
            return StatusCode(204);
        }
        
    }
}