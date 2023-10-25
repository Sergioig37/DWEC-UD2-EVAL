import Baraja from "./baraja.js";
export default class Partida {
   
    constructor(filas, columnas) {
        if(!parseInt(filas)||filas<2){
            this._filas = 3
        }else{
            this._filas = parseInt(filas);
        }

        if(!parseInt(columnas)||columnas<2){
            this._columnas = 2;
        }else{
            this._columnas = parseInt(columnas);
        }
        
        this._baraja = new Baraja();
        this._cartasSeleccionadas = [];
        this._mazo = new Array(this._filas);
        for (let i = 0; i < this._mazo.length; i++) {
            this._mazo[i] = new Array(this._columnas);
        }
        this._cartaVolteada;
        this._aciertos = 0;
        this._numeroIntentos = 0;
    }


    get Filas(){
        return this._filas;
    }
    get Columnas(){
        return this._columnas;
    }
    get Mazo(){
        return this._mazo;
    }

    selecciona() {

        var carta = this._baraja.generarCarta();
        var posicion = this._baraja.Cartas.indexOf(carta);
        this._baraja.Cartas.splice(posicion, 1);
        for (let i = 0; i < 2; i++) {
            this._cartasSeleccionadas.push(carta);
        }

    }

    baraja() {
        this._cartasSeleccionadas.sort(() => Math.random() - 0.5);;
    }

    reparte() {
        for (let i = 0; i < this._mazo.length; i++) {
            for (let j = 0; j < this._mazo[i].length; j++) {
                this._mazo[i][j] = this._cartasSeleccionadas.shift();
            }
        }

    }

    voltea(fila, columna) {
        this._cartaVolteada = this._mazo[fila][columna];
        this._numeroIntentos += 1;
    }
    //voltear las dos a la hora de comprobar el acierto, recuerda.s
    compruebaAcierto(fila, columna) {
        var encontrada = false;
        if (this._cartaVolteada === this._mazo[fila][columna]) {
            encontrada = true;
            this._aciertos += 1;
            this._mazo[fila][columna] = null;
        }
        return encontrada;
    }
    haFinalizado() {
        var finalizado = false;
        if (this._aciertos == (this._filas * this._columnas)/2) {
            finalizado = true;
        }
        return finalizado;
    }
}