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
    var fila = prompt("Escoge la fila de la carta");
   
    var columna = prompt("Escoge la columna de la carta");
    
    // Voltear carta 1

    partida.voltea(fila, columna);
    mostrarMazo(partida);
    // Pedir carta 2
    fila = prompt("Escoge la fila de la otra carta");
    
    columna = prompt("Escoge la columna de la otra carta");
   
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

function esCartaValida(numero,columna, numeroPartida){
    var correcto = false;

    esEntero(fila) &&
    esEntero(columna) &&
    fila >= 0 &&
    fila < partida.Filas &&
    columna >= 0 &&
    columna < partida.Columnas




    if(esEntero(numero)==true&&esPositivo(numero)==false&&numero<numeroPartida){
        correcto = true;
    }
    return correcto;
}

function mostrarMazo(partida){
    console.log(partida.Mazo);
}


jugar();



