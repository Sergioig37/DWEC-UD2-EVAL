import Baraja from "./baraja.js";
export default class Partida {
    constructor(filas = 3, columnas = 2) {
        this._filas = filas;
        this._columnas = columnas;
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


    selecciona() {

        var carta = this._baraja.generarCarta();

        //recuerda cambiar esto para que las cartas no se repitan
        if (this._cartaEnMazo(carta) == true) {
            while (this._cartaEnMazo(carta) == true) {
                carta = this._baraja.generarCarta();
            }
        }
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
        this._numeroIntentos + 1;
    }
    compruebaAcierto(fila, columna) {
        var encontrada = false;
        if (this._cartaVolteada === this._mazo[fila][columna]) {
            encontrada = true;
            this._aciertos + 1;
        }
        return encontrada;
    }
    haFinalizado() {
        var finalizado = false;
        if (this._aciertos == (this._filas * this._columnas)) {
            finalizado = true;
        }
        return finalizado;
    }



}