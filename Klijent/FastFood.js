import { Porudzbina } from "./Porudzbina.js";
import { Stavka } from "./Stavka.js";
import { Sto } from "./Sto.js";

export class FastFood {
    constructor(id,n,naziv){   
        this.id =id;
        this.n=n; 
        this.naziv=naziv; 
        this.stolovi=[];
        this.kontFastFood = null;
    }
    
    async ucitaj(){
        var resp = await fetch("https://localhost:5001/FastFood/GetFastFood/" + this.id);
        var data = await resp.json();
        this.naziv = data["naziv"];
        this.n = data["n"];
        
      
        data.stolovi.forEach(e => {
           this.dodajStoIPorudzbinu(e,e.porudzbina);
           
        });
      
    }
    dodajSto(sto){
        this.stolovi[sto.broj]=sto;
    }
    async crtajFastFood(host){
        if (this.naziv == null) await this.ucitaj();
       
        var PokazivacNaFastFood = this;
       
        //futer div gde crtam ime restorana i dugme dodaj sto i rezervisi
        const kontejner = document.createElement("div");
        kontejner.classList.add("kontejner");
        this.kontFastFood = kontejner;
        const futerDiv = document.createElement("div");
        futerDiv.classList.add("futerDiv");

         //Naziv restorana
        let Lab = document.createElement("h2");
        Lab.innerText = this.naziv; 
        futerDiv.appendChild(Lab)
     

        let Laba = document.createElement("labela");
        Laba.innerHTML = "Broj stolova: "+this.n;
        futerDiv.appendChild(Lab);

         const glavniDiv = document.createElement("div");
        glavniDiv.className = "glavniDiv";
       
        const divZASto = document.createElement("div");
        divZASto.className = "divZaSto";

        const divZaPorIFormu = document.createElement("div");
        divZaPorIFormu.className = "divZaPorIFormu";



        
        //dugme za dodavanje stola
        let dugme = document.createElement("button");
        dugme.innerHTML="Dodaj sto";
        dugme.className = "btnDodaj";
        dugme.disabled = false;
        futerDiv.appendChild(dugme);
        let idFastFood = this.id;
        dugme.onclick=(ev)=>{
              PokazivacNaFastFood.n++;
            let k= document.getElementById("Por++");
            
            if(k!=null && k.disabled == true)
                k.disabled = false;
                fetch("https://localhost:5001/Sto/CreateSto/" + idFastFood, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                            Broj: PokazivacNaFastFood.n,
                            Status: "+",
                            FastFoodId: idFastFood
                    })
                }).then(resp => {
                    if (resp.status == 200) {
                       resp.json().then(id => {
                                var newSto = new Sto(id,PokazivacNaFastFood.n,"Slobodan",PokazivacNaFastFood.id,null);
                                this.dodajSto(newSto);
                                Laba.innerHTML="Broj stolova: "+this.n;
                                newSto.crtajSto(divZaPorIFormu,divZASto);
                                
                            })
                        }
                        
                 });
        };
        futerDiv.appendChild(dugme);

        //dugme za rezervaciju stola
        let dugme2 = document.createElement("button");
        dugme2.innerHTML="Rezervisite";
        dugme2.className = "btnRezervisi";
        dugme2.id = "Por++";
        futerDiv.appendChild(dugme2);
        
        kontejner.appendChild(futerDiv);
        

        for(let i=1; i<=this.n;i++){
            if(this.stolovi[i]==null){

                  fetch("https://localhost:5001/Sto/CreateSto/" + idFastFood, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Broj: i,
                        Status: "Slobodan"
                      
                        
                    })  
                }).then(resp => {
                    if (resp.status == 200) {
                        resp.json().then(id => {
                            var newSto = new Sto(id,i,"Slobodan",PokazivacNaFastFood.id,null);
                            this.dodajSto(newSto);
                            newSto.crtajSto(divZaPorIFormu,divZASto);  
                        })
                    }
                });
            
                   

            } else
            this.stolovi[i].crtajSto(divZaPorIFormu,divZASto);
        }
        var niz= [];
        dugme2.onclick=(ev)=>{
            niz = this.stolovi.filter(p=> p.status == "Slobodan" ).map((item) => item.broj);
        
            if(!niz.length)
            dugme2.disabled = true;
            else{
            this.formaZaIzborStola(niz,kontejner);  
            }
        }
        glavniDiv.appendChild(divZaPorIFormu);
        glavniDiv.appendChild(divZASto);
        kontejner.appendChild(glavniDiv);
        host.appendChild(kontejner);
    
    

    }

    //forma za izbor stola koji zelimo da rezervisemo
    formaZaIzborStola(niz, host){
        const formaZaIzborSt = document.createElement("div");
        formaZaIzborSt.className = "formaZaIzborSt";
    
        let p = new Porudzbina(null,null,null,null,null,null); 
        

        p.kreirajOpcijezaJela(formaZaIzborSt,niz,"Br.Stola:",0);
        //dugme da zatvorimo prozor 
        let dugmeX = document.createElement("button");
        dugmeX.innerHTML="Zatvori";
        dugmeX.className="btnZatvori";
        //kad klinemo na dugme Zatvori da nam izbrise formu za izbor stola
        dugmeX.onclick=(ev)=>{

            this.kontFastFood.querySelector(".glavniDiv").classList.remove(); 
            this.kontFastFood.querySelector(".futerDiv").classList.remove(); 
          

            this.kontFastFood.removeChild(formaZaIzborSt);
        }
        //dugme za potvrdu rezervacije
        formaZaIzborSt.appendChild(dugmeX);
        dugmeX = document.createElement("button");
        dugmeX.innerHTML="Potvrdi";
        dugmeX.className="btnPotvrdi";
    
        dugmeX.onclick=(ev)=>{
            //preuzimam broj stola
           let div1 = this.kontFastFood.querySelector(".glavniDiv");  
            div1.classList.remove(); 
           
            let div2=this.kontFastFood.querySelector(".futerDiv");
            div2.classList.remove(); 
           
            div1 = this.kontFastFood.querySelector(".divZaPorIFormu");
           
            div2 = this.kontFastFood.querySelector(".divZaSto");
            
            let br = parseInt(document.getElementById("Br.Stola:0").value);

            if(this.stolovi[br]==null){
            fetch("https://localhost:5001/Sto/CreateSto/" + this.id, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Broj: br,
                        Status: "Slobodan",
                        Porudzbine: null,
                        FastFoodId: this.id
                        
                    })  
                }).then(resp => {
                    if (resp.status == 200) {
                        resp.json().then(id => {
                            this.stolovi[br]= new Sto(id,br,"Slobodan",this.id,null);
                           
                        })
                    }
                });
            }

           //prosledjuje se broj stola i zauzima se sto
            this.stolovi[br].status = "Zauzet";
            this.stolovi[br].crtajSto(div1,div2); 
            fetch("https://localhost:5001/Sto/ZauzmiSto/" + this.stolovi[br].id, 
            {
                method: 'PUT',
                mode: 'cors',
                headers: {
                            'Content-Type': 'application/json'
                         },
                body: JSON.stringify({
                        Broj:br,
                         Status: "Zauzet",
                         FastFoodId: this.stolovi[br].id
                        })
                        }).then(resp => {
                        if (resp.status == 204) {
        
                        
                            alert(`Sto  je upravo zauzet.!`);
                        }
                });

            let niz = this.stolovi.filter(p=> p.status == "Slobodan" ).map((item) => item.broj);
        
            if(!niz.length)
                document.getElementById("Por++").disabled =true;
            this.kontFastFood.removeChild(formaZaIzborSt);
        }
        formaZaIzborSt.appendChild(dugmeX);
        host.appendChild(formaZaIzborSt);
   
    }
    dodajStoIPorudzbinu(el, porudzbina){
        var st;
        
        if(el.status=="Zauzet" && porudzbina!=null){
        var p = new Porudzbina(porudzbina.id,el.id,el.broj, el.fastfoodId,null,null,null);
        porudzbina.stavke.forEach(el=>{
            p.stavke.push(new Stavka(el.id,el.vrsta,el.cena,el.naziv,p));
        });
        }
        else p=null;
       
        st = new Sto(el.id,el.broj,el.status,el.kaficId, p);
        
        this.dodajSto(st);
        if(p!=null){
        this.stolovi[st.broj].porudzbenica.sto= this.stolovi[st.broj];
        this.stolovi[st.broj].porudzbenica.stokont = this.stolovi[st.broj].refDiv;
        }
    }
}