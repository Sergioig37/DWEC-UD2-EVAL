import Carta from "./carta.js";
const palos = ["PICAS", "CORAZONES", "TRÉBOLES", "DIAMANTES"];
const nombres = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "J", "Q", "K"];


export default class Baraja {
    constructor() {
        this._cartas = new Array();

        for (let palo of palos) {
            for (let nombre of nombres) {
                this._cartas.push(new Carta(palo, nombre));
            }
        }
    }

    get Cartas() {
        return this._cartas;
    }

    generarCarta() {
        var cartaSacada = this._cartas[Math.floor(Math.random() * this._cartas.length)];
        return cartaSacada;
    }

}
