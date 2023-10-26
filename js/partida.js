import Baraja from "./baraja.js";
export default class Partida {
   //A la partida le llegan filas y columnas
    constructor(filas, columnas) {
        //si la fila no es un entero o es menor de dos la ponermos por defecto a 3
        //(si fuera menor de dos el juego no funcionaría, porque se necesitan mínimo dos paresd de cartas)
        if(!parseInt(filas)||filas<2){
            this._filas = 3
        }else{
            this._filas = parseInt(filas);
        }
        //hacemos aquí lo mismo que con las columnas pero lo ponemos a tres para que sea
        //para la multiplicación de filas y columnas
        if(!parseInt(columnas)||columnas<2){
            this._columnas = 2;
        }else{
            this._columnas = parseInt(columnas);
        }
        //creamos una nueva baraja
        this._baraja = new Baraja();
        this._cartasSeleccionadas = [];
        //inicializamos el mazo con las filas y las columnas indicadas
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

    //este método selecciona una carta y la duplica para meterla en el array de cartas seleccionadas
    selecciona() {
        //generamos una carta al azar
        var carta = this._baraja.generarCarta();
        //la quitamos de la baraja original para que no se repita
        var posicion = this._baraja.Cartas.indexOf(carta);
        this._baraja.Cartas.splice(posicion, 1);
        //la metemos duplicada en el array de cartas seleccionadas
        for (let i = 0; i < 2; i++) {
            this._cartasSeleccionadas.push(carta);
        }

    }

    //barajamos las cartas para que tengan posiciones totalmente aleatorias 
    //y así el juego no sea muy fácil
    baraja() {
        //reordenamos las cartas de manera aleatoria
        this._cartasSeleccionadas.sort(() => Math.random() - 0.5);;
    }
    //este método reparte las cartas en el mazo
    reparte() {
        //en un bucle vamos sacando una a una todas las cartas seleccionadas
        //y las metemos en el mazo de la partida
        for (let i = 0; i < this._mazo.length; i++) {
            for (let j = 0; j < this._mazo[i].length; j++) {
                this._mazo[i][j] = this._cartasSeleccionadas.shift();
            }
        }

    }

    //este método voltea una carta
    voltea(fila, columna) {
        //pillamos la carta de una posición que le pasamos y la metemos en carta seleccionada
        this._cartaVolteada = this._mazo[fila][columna];
        //sumamos uno al número de intentos
        this._numeroIntentos += 1;
    }

    //este método compruba si acertamos
    compruebaAcierto(fila, columna) {
        //creamos un boolean que comienza en false porque todavía no hemos encontrado la carta
        var encontrada = false;
        //si la carta volteada coincide con la que está en la segunda posición 
        if (this._cartaVolteada === this._mazo[fila][columna]) {
            //encontrada es true porque la hemos encontrado
            encontrada = true;
            //añadimos uno al número de aciertos
            this._aciertos += 1;
            //y esa posición ahora contendrá un null
            this._mazo[fila][columna] = null;
        }
        //y devolvemos si ha sido encontrada
        return encontrada;
    }
    //este método copmrueba si ha finalizado la partida
    haFinalizado() {
        //para esto tenemos un boolean que asume que la partida no ha acabado
        //y para eso comprobamos cuantos aciertos tenemos
        var finalizado = false;
        //si el número de aciertos equivale al número de parejas que había 
        //significa que las hemos acertado todas y la partida puede acabar
        if (this._aciertos == (this._filas * this._columnas)/2) {
            //ponemos finalizad a true
            finalizado = true;
        }
        //y devolvemos si ha finalizado
        return finalizado;
    }

    // este método es original mío y cambia la primera carta seleccionada a null si hemos acertado
    cambiarANull(){
        var encontrada = false;
        var i=0;
        var j=0;
        //iteramos hasta que encontremos la carta con un while para no
        // tener que hacer más busqueda de lo necesario
        while(encontrada==false){
            while(encontrada==false){
                 if(this._mazo[i][j] = this._cartaVolteada){
                    //si la carta volteada ( que es la primera que eliges) coincide en algún momento
                    //con la posición pues encontrada es true
                    encontrada = true;
                }
                 j+1;
            }
             i+1;
        }
        //al salir del bucle cambiamos esa posición por null
        this._mazo[i][j] = null;
    }
}