import { Stavka } from "./Stavka.js";


export class Porudzbina {
    constructor(id,idStola,broj,kaficid,kontPorudzbina,sto,stokon) {
        this.id =id;
        this.idS = idStola;
        this.brojStola=broj;
        this.kaficid=kaficid;
        this.sto=sto;
        this.stokont=stokon;
        this.stavke=[];
        this.kontPorudzbina = kontPorudzbina;
    }
    
    crtajPoruzbinu(host){
        
        this.kontPorudzbina = document.createElement("div");
        this.kontPorudzbina.className="kontPorudzbina"+this.id;
        
        let cenaLab = document.createElement("h3");
        
        cenaLab.innerHTML = "Sto: "+this.brojStola;
        this.kontPorudzbina.appendChild(cenaLab);

        let divPorudzbina = document.createElement("div");
        divPorudzbina.className= "divPorudzbina";
        
        this.stavke.forEach(el=>{
            if(el!=null)
                el.crtajStavku(divPorudzbina);
            
        });
        this.kontPorudzbina.appendChild(divPorudzbina);
       
        let divZaNovustavku = document.createElement("div");
        divZaNovustavku.className= "divZastavku";
        let jela= ["None","Palacinka", "Tost", "Pomfrit", "Pljeskavica","Pica","Cevapi"];
        let pica= ["None","Coca-cola","Fanta","Guarana","Kisela voda","Voda"];
        this.kreirajOpcijezaJela(divZaNovustavku,jela,"Hrana: ",this.id);

        
        this.kreirajOpcijezaJela(divZaNovustavku,pica,"Pice: ",this.id);
  
        this.kontPorudzbina.appendChild(divZaNovustavku);

        let divZaDugmice = document.createElement("div");
        divZaDugmice.className= "divZaDugmice";
        let dugmePlus = document.createElement("button");
        dugmePlus.innerHTML="Dodaj Stavku";
        dugmePlus.className = "btnDodajStavku";
       
        dugmePlus.onclick=(ev)=>{
            
            this.preuzmiStavkeIzForme(divPorudzbina);
        }
        this.kontPorudzbina.appendChild(dugmePlus);
      
       this.kontPorudzbina.appendChild(divZaDugmice);  
        host.appendChild(this.kontPorudzbina);
    
    }

    kreirajOpcijezaJela(host , niz, naziv,br){ 
    
        let SelJela = document.createElement("select");
        SelJela.id= naziv+br;
    
        let  labela = document.createElement("label");
        labela.innerHTML = naziv;
        host.appendChild(labela);
        host.appendChild(SelJela);
    
        niz.forEach(el=>{
            let opcija = document.createElement("option");
            opcija.innerHTML = el;
            opcija.value = el;
            SelJela.appendChild(opcija);
        })
    }
    preuzmiStavkeIzForme(host){
       

        let jelo = document.getElementById("Hrana: "+this.id).value;
        let pice = document.getElementById("Pice: "+this.id).value;

      
        let NovoJelo=null;
        let NovoPice=null;
                
            if(jelo!="None"){
                
                NovoJelo = new Stavka(null,"jelo",jelo, this );   //dodaj u bazu 
                if(NovoJelo!=null){

                    fetch("https://localhost:5001/Stavka/CreateStavku/" + this.id, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                            Vrsta: "jelo",
                            Naziv: jelo,
                            PorudzbinaId: this.id
                    })
                    }).then(resp => {
                    if (resp.status == 200) {
                       resp.json().then(id => {
                                NovoJelo.id = id;
                                this.stavke.push(NovoJelo);
                    
                                this.azurirajPrikaz(host,NovoJelo);
                                
                            })
                        }
                        
                     });
                   
                }
            }
             
            if(pice!="None"){
                
                NovoPice = new Stavka(null,"pice",pice,this ); //dodaj u bazu
                if(NovoPice!=null){
                    fetch("https://localhost:5001/Stavka/CreateStavku/" + this.id, {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                                Vrsta: "pice",
                                Naziv: pice,
                                PorudzbinaId: this.id
                        })
                        }).then(resp => {
                        if (resp.status == 200) {
                           resp.json().then(id => {
                                    NovoPice.id = id;
                                    this.stavke.push(NovoPice);
                        
                                    this.azurirajPrikaz(host,NovoPice);
                                    
                                })
                            }
                            
                         });
                            } 
                       
            }  
             

        document.getElementById("Hrana: "+this.id).value = "None";
        document.getElementById("Pice: "+this.id).value= "None";
    }
    azurirajPrikaz(host, stavka){
      
        document.querySelector(".Sto"+this.idS).classList.add("Zelena");
        this.kontPorudzbina.querySelector("h3").innerHTML="Sto: "+this.brojStola;
        stavka.crtajStavku(host);
      
    }

}