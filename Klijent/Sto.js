import { Porudzbina } from "./Porudzbina.js";

export class Sto {
    constructor(id,broj,stat,fastfoodid,por){
        this.id=id;
        this.broj=broj;
         // status je slobodan i zauzet; 
        
        this.status=stat;
        this.fastfoodid=fastfoodid;
        this.porudzbenica=por; 
        this.refDiv = null; 
        this.kontPorudzbina=null; 
    }
   
    crtajSto(host,hostzaSto){
        if(!host || !hostzaSto)
            throw new Error("Roditeljski element ne postoji");

     
        
        let kont= document.createElement("div");
        kont.className="Sto"+this.id;
        
         //labela za broj stola i da li je slobodan
        let StoLabela = document.createElement("label");
        StoLabela.innerHTML = "Sto: "+this.broj+"  "+this.status;
        kont.appendChild(StoLabela);
        
        //dugme za porudzbinu
        let dugme = document.createElement("button");
        dugme.innerHTML="Porucite";
        dugme.className = "btnPoruci";
        dugme.disabled = true;
        kont.appendChild(dugme);
        
        //dugme da se otkaze rezervacija
        let dugme2 = document.createElement("button");
        dugme2.innerHTML="Otkazi rezervaciju";
        dugme2.className = "btnOtkazi";
        dugme2.disabled = true;
        kont.appendChild(dugme2);
        
        if(this.status=="Zauzet"){
           
            if(this.porudzbenica==null || this.porudzbenica.stavke.length==0)
            kont.classList.add("Crvena");  
            else 
            kont.classList.add("Zelena");  
            
            dugme.disabled = false;
            dugme2.disabled = false;
        
            dugme.onclick=(ev)=>{
               
             this.funkcijaPoruci(host);
       }

            dugme2.onclick=(ev)=>{
               
               this.Oslobodi(host);
               
            }  
            if(this.refDiv==null){
                this.refDiv=kont;
                hostzaSto.appendChild(this.refDiv); 
            }
            else{
                
               this.Zauzmi(host);
        }
    }
       
        else{
            this.refDiv=kont;
            hostzaSto.appendChild(this.refDiv); 
        }
        
    }
    funkcijaPoruci(host){
        if(this.porudzbenica==null || this.porudzbenica.kontPorudzbina ==null )
        {
            
            if(this.porudzbenica == null){

            this.refDiv.classList.add("Crvena");
            fetch("https://localhost:5001/Porudzbina/CreatePorudzbina/" + this.id, {
                    method: 'POST',
                    //mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                            Broj:this.broj,
                            StoId:this.id

                    })
                    }).then(resp => {
                    if (resp.status == 200) {
                       resp.json().then(id => {
                         this.porudzbinica = new Porudzbina( id, this.id, this.broj, this.fastfoodid, null,this, this.refDiv);
                         this.porudzbinica.crtajPoruzbinu(host);
                               
                            })
                        }
                     });
            }
            else{
            
            this.porudzbenica.crtajPoruzbinu(host);
        }
    } 
    }

    Zauzmi(host){
        if(!this.refDiv.classList.contains("Zelena") && this.status=="Zauzet");
        this.refDiv.classList.add("Crvena");
       
        this.refDiv.querySelector("label").innerHTML="Sto: "+this.broj+"  "+this.status;
        this.refDiv.querySelectorAll("button").forEach( (element, index)=>{
                element.disabled =false;
                element.onclick=(ev)=>{
                    if(index==0)
                    this.funkcijaPoruci(host);
                    if(index==1)
                    this.Oslobodi(host);

                }
        });
    
    }
    
    Oslobodi(host){
        console.log("Izbrisi porudzbinu");
        document.getElementById("Por++").disabled=false;
       if(this.porudzbenica!=null && this.porudzbenica.kontPorudzbina!=null)
        {  console.log("Prvi if");
            fetch("https://localhost:5001/Porudzbina/DeletePorudzbina/" + this.porudzbenica.id,{
                method: 'DELETE', 
                headers: {
                 'Content-type': 'application/json'
                }
                }).then(resp =>{
                if (resp.status == 200) {
                    

                this.porudzbenica.kontPorudzbina.remove();
                this.porudzbenica.kontPorudzbina = null;
                this.porudzbenica = null; 
            
                fetch("https://localhost:5001/Sto/OslobodiSto/" + this.id, {
                    method: 'PUT',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Broj:this.broj,
                        Status: "Slobodan",
                        FastFoodId: this.fastfoodid
                
                    })}).then(resp => {
                        if (resp.status == 204) {
                            alert(`Sto ${this.broj} je upravo Oslobodjen!`);
                    }
                    else{
                        alert("Sto nije oslobodjen!")
                    }
                    });
            
                this.refDiv.classList.remove("Zelena","Crvena");
                this.status = "Slobodan";
                this.refDiv.querySelector("label").innerHTML="Sto: "+this.broj+"  "+this.status;
                this.refDiv.querySelectorAll("button").forEach( (element)=>{
                element.disabled =true;
                element.onclick=(ev)=>{
                    this.Zauzmi(host);

                }
                });
    
            }})
        }
       else
         {
            console.log("Oslobodi sto");
            
                fetch("https://localhost:5001/Sto/OslobodiSto/" + this.id, {
                    method: 'PUT',
                    //mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Broj:this.broj,
                        Status: "Slobodan",
                        FastFoodId: this.fastfoodid
                
                    })}).then(resp => {
                        if (resp.status == 204) {
                            alert(`Sto ${this.broj} je upravo Oslobodjen!`);
                            this.refDiv.classList.remove("Zelena","Crvena");
                            this.status = "Slobodan";
                            this.refDiv.querySelector("label").innerHTML="Sto: "+this.broj+"  "+this.status;
                            this.refDiv.querySelectorAll("button").forEach( (element)=>{
                            element.disabled =true;
                            element.onclick=(ev)=>{
                                this.Zauzmi(host);

                            }
                            });
                    }
                    else{
                        alert("Sto nije oslobodjen!")
                    }
                    });
        }
     }

 }   

