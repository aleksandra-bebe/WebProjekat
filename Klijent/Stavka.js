export class Stavka {
    constructor(id,vrsta, naziv,por){
      
        this.id = id;
        this.vrsta=vrsta; 
        this.naziv=naziv;
        this.por = por;
        
        this.kontStavka=null;
    }
    crtajStavku(host){
        var thisPok =this;

        if(!host)
            throw new Error("Roditeljski element ne postoji");

        const divZasliku = document.createElement("div");
        if(this.vrsta=="jelo" || this.vrsta=="Jelo")
            divZasliku.className="jelo";
        else
            divZasliku.className="pice";

        const SlikaNaziv = document.createElement("div");
        SlikaNaziv.className= "SlikaNaziv";
        SlikaNaziv.appendChild(divZasliku);
        const nazivJela = document.createElement("label");
        nazivJela.innerHTML = this.naziv ;
        let dugmeObrisiStavku = document.createElement("button");
        dugmeObrisiStavku.className = "btnObrisiStavku";
        dugmeObrisiStavku.innerHTML = 	"Obrisi stavku";
        dugmeObrisiStavku.onclick=(ev)=>{
           
           

            fetch("https://localhost:5001/Stavka/DeleteStavku/" + this.id ,{
                method: 'DELETE', 
                headers: {
                 'Content-type': 'application/json'
                }
            }).then(resp =>{
                if (resp.status == 200) {
                   
                    if(this.por.stavke.length==0)
                    {   

                       document.querySelector(".kontPorudzbina"+this.por.id).remove();
                        this.por.sto.Oslobodi(this.por.kontPorudzbina);     
                    }
                    thisPok.kontStavka.remove(); //brisi iz baze 
                   
                    alert("Stavka Obrisana!");
                } 
                else if(resp.status == 404 )
                    alert("Error 404!");
                else{
                    alert(resp.status);
                }
            })         
        }
        SlikaNaziv.appendChild(nazivJela);
        SlikaNaziv.appendChild(dugmeObrisiStavku);
        this.kontStavka=SlikaNaziv;
        host.appendChild(this.kontStavka);
    }
    
    
}