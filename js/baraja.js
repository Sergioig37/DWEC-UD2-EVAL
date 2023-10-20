const palos= ["PICAS", "CORAZONES", "TRÉBOLES", "DIAMANTES"];
const nombres = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "J", "Q", "K"]


 class Baraja{
    constructor(){
        this._cartas = new Array(palos.length);
        for(let i=0;i<this._cartas.length;i++){
            this._cartas[i] = new Array(nombres.length+1);
            for(let j=0;j<nombres.length;j++){
                    this._cartas[i][j+1] = nombres[j];
                   this._cartas[i][0] = palos[i];
                }
            }
        }
    generarCarta(){ 
        var nombre = this._cartas[Math.floor(Math.random()*4)][Math.floor(Math.random()*12+1)];
        var palo= this._cartas[Math.floor(Math.random()*4)][0];
        return nombre+"-"+palo;
    }

    toString(){
        return this._cartas;
    }
}

var baraja = new Baraja();
console.table(baraja.toString());
