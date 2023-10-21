import Partida from "./partida.js";

function mostrarTabla(partida){
    varcodigoHTML = "<table border=1>"
    for (vari = 0; i < partida._mazo.length; i++) {
        codigoHTML += "<tr>"
        for (varj = 0; j < partida._mazo[i].length; j++) {
            if (partida._mazo[i][j] == null) {
                codigoHTML = "<td></td>"
            }
            else {
                codigoHTML += "<td><br>" + partida._mazo[i][j] + "<br></td>";
            }
            codigoHTML += "</tr>"
        }
        codigoHTML += "</table>"
        document.getElementById("mazo").innerHTML = codigoHTML;
    }
}


function escogerSizeTablero() {

    var filas = prompt("Escoge el número de filas (La multiplicación de filas y columnas tiene que ser un número par)");
    var columnas = prompt("Escoge el número de columnas (La multiplicación de filas y columnas tiene que ser un número par)");
    var partida = new Partida(filas, columnas);

    return partida;
}

function crearPartida(partida) {
    partida.selecciona();
    partida.baraja();
    partida.reparte();
}

function jugar() {

    var partida = escogerSizeTablero();
    crearPartida(partida);
    pedirCarta(partida);
}

function pedirCarta(partida) {
    // Pedir carta 1
    var fila = prompt("Escoge la fila de la carta" );
    var columna = prompt("Escoge la columna de la carta");
    // Voltear carta 1
     partida.voltea(fila, columna);
    
    // Pedir carta 2
     fila = prompt("Escoge la fila de la otra carta" );
    columna = prompt("Escoge la columna de la otra carta");
    // Comprobar acierto
    partida.compruebaAcierto(fila, columna);
    
    if (partida.haFinalizado()) {
        console.log("PARTIDA FINALIZADA!!");
    }
    else {
        setTimeout(pedirCartas(), 5000)
    }
}


jugar();


