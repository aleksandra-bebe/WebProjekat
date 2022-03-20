import { FastFood } from "./FastFood.js";
import { Porudzbina } from "./Porudzbina.js";
import { Sto } from "./Sto.js";


export class Kontejner{

    constructor(host){
        this.kont = null;
    }

    crtajKontejner(host){
        
        //naslov Restorani
        const futerDiv = document.createElement("div");
        futerDiv.className="Naslov";
        this.kont = futerDiv;
      
        let Lab = document.createElement("h3");
        Lab.innerText = "Restorani";
        futerDiv.appendChild(Lab);
       
        const dugme = document.createElement("button");
        dugme.innerHTML = "Prikazi";
        dugme.className ="btnPrikazi";
        futerDiv.appendChild(dugme);

         let count=0;

        dugme.onclick = (ev) => {
            this.kont = document.createElement("div");
        var fastfood = {};
        let k = 0;
        fetch("https://localhost:5001/FastFood/GetFastFood").then(p => {
        p.json().then(data => {

            data.forEach(e => {
                fastfood[k] = new FastFood(e.id,e.n,e.naziv);
                
                e.stolovi.forEach(el => {
                        
                        fastfood[k].dodajStoIPorudzbinu(el,el.porudzbina);
                  
                
                });
                fastfood[k].kontFastFood=this.kont;
                
                fastfood[k].crtajFastFood(this.kont);
                if(count>=1){
                   alert("Restorani su vec prikazani")
                }
                else{
                    host.appendChild(this.kont);
                    k++;
                }
            });
            count+=1;
        })
    });
    }
    host.appendChild(futerDiv);
  }
}