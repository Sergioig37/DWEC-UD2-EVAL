import Partida from "./partida.js";

function escogerSizeTablero() {

    var filas = prompt("Escoge el número de filas (La multiplicación de filas y columnas tiene que ser un número par)");

    var columnas = prompt("Escoge el número de columnas (La multiplicación de filas y columnas tiene que ser un número par)");
   
    var partida = new Partida(filas, columnas);

    return partida;
}

function crearPartida(partida) {

    for (let i = 0; i < ((partida.Filas * partida.Columnas) / 2); i++) {
        partida.selecciona();
    }
    partida.baraja();
    partida.reparte();
}

function jugar() {

    var partida = escogerSizeTablero();
    crearPartida(partida);
    pedirCarta(partida);
}

function pedirCarta(partida) {
    mostrarMazo(partida);
    // Pedir carta 1
    var fila = prompt("Escoge la fila de la carta "+ "\n" + partida.Mazo);
   
    var columna = prompt("Escoge la columna de la carta " +partida.Mazo);
    if(posicionValida(fila, columna, partida)!=true){
        while(posicionValida(fila, columna, partida)!=true){
            alert("Fila o columna inválida, prueba otra vez " + "\n" +partida.Mazo);
            var fila = prompt("Escoge la fila de la carta " + "\n" +partida.Mazo);
   
            var columna = prompt("Escoge la columna de la carta " + "\n" +partida.Mazo );
        }
    }

    // Voltear carta 1

    partida.voltea(fila, columna);
    mostrarMazo(partida);
    // Pedir carta 2
    fila = prompt("Escoge la fila de la otra carta " + "\n" +partida.Mazo);
    
    columna = prompt("Escoge la columna de la otra carta " + "\n" +partida.Mazo);
    if(posicionValida(fila, columna, partida)!=true){
        while(posicionValida(fila, columna, partida)!=true){
            alert("Fila o columna inválida, prueba otra vez  "+ "\n" +partida.Mazo);
            var fila = prompt("Escoge la fila de la carta  " + "\n" +partida.Mazo);
   
            var columna = prompt("Escoge la columna de la carta  "+ "\n" +partida.Mazo);
        }
    }
    // Comprobar acierto
    partida.compruebaAcierto(fila, columna);
    mostrarMazo(partida);
    if (partida.haFinalizado()) {
        console.log("PARTIDA FINALIZADA!!");
    }
    else {
        setTimeout(pedirCarta(partida), 5000)
    }
}


function esPositivo(numero){

    var positivo = false;
    if(numero>0){
        positivo = true;
    }
    
    return positivo;

}

function esEntero(numero){

    var entero = false;
    if(parseInt(numero)){
        entero = true;
    }
    return entero;
}

function posicionValida(fila,columna, partida){
    var correcto = false;
    if(existeEnElMazo(fila, partida.Filas)==true&&existeEnElMazo(columna, partida.Columnas)==true){
        correcto = true;
    }
    return correcto;
}

function existeEnElMazo(numero, numeroPartida){

    var existe = false;
    if(numero<=numeroPartida&&esEntero(numero)==true&&esPositivo(numero)==true){
        existe = true;
    }
    return existe;
}

function mostrarMazo(partida){
    console.log(partida.Mazo);
}


jugar();



