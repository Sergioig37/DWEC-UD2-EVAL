export default class Partida{
    constructor(filas=3, columnas=3){
        this._filas = filas;
        this._columnas = columnas;
        this._baraja = nulls;
        this._cartasSeleccionadas = 0;
        this._mazo = new Array(filas);
        for(let i=0;i<filas;i++){
            this._mazo[i] = new Array(columnas);
        }

        this._cartaVolteada;
        this._aciertos = 0;
        this._numeroIntentos = 0;
    }

}