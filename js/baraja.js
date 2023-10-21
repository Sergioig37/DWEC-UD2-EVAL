import Carta from "./carta.js";
const palos= ["PICAS", "CORAZONES", "TRÉBOLES", "DIAMANTES"];
const nombres = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "J", "Q", "K"]


 export default class Baraja{
    constructor(){
        this._cartas = new Array(palos.length+1);
        
        for(let i=0;i<this._cartas.length;i++){
            this._cartas[i] = new Array(nombres.length+1);
            for(let j=0;j<nombres.length+1;j++){
                this._cartas[0][j] = nombres[j-1];
                this._cartas[0][0] = " ";
                this._cartas[i][0] = palos[i-1];
                }
            }
            for(let i=1; i<palos.length+1;i++){
                for(let j=1; j<nombres.length+1;j++){
                    var carta = new Carta(palos[i-1], nombres[j-1]);
                    this._cartas[i][j] = carta;
                }
            }
        }

        get Cartas(){
            this._cartas;
        }

    generarCarta(){ 
        var cartaSacada = this._cartas[Math.floor(Math.random()*palos.length+1)][Math.floor(Math.random()*nombres.length+1)]
        return  cartaSacada;
    }

}
