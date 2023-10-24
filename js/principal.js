import Partida from "./partida.js";

function escogerSizeTablero() {

    var filas = prompt("Escoge el número de filas (La multiplicación de filas y columnas tiene que ser un número par. Tamaño Mínimo: 2)");

    var columnas = prompt("Escoge el número de columnas (La multiplicación de filas y columnas tiene que ser un número par. Tamaño Mínimo: 2)");

    if (columnas * filas % 2 != 0) {
        do {
            var eleccion = prompt("Al menos uno de los dos tiene que ser par, escoge cual quieres cambiar:" + "\n" + "1: Filas" + "\n" + "2: Columnas");
            switch (parseInt(eleccion)) {
                case (1):
                    filas = prompt("Vuelve a elegir el número de filas");
                    break;
                case (2):
                    columnas = prompt("Vuelve a elegir las columnas");
                    break;
            }
        }
        while (columnas * filas % 2 != 0);
    }
    else if (sonCorrectos(filas, columnas) != true) {
        alert("Números no válidos, creando partida por defecto");
    }

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

function empezarJuego(partida) {

    crearPartida(partida);
    return partida
}



function pedirCarta(partida) {
    mostrarMazo(partida);
    // Pedir carta 1
    var fila = prompt("Escoge la fila de la carta " + "\n");
    if (posicionValida(fila, partida.Filas) != true) {
        fila = preguntarOtraVez(fila, partida.Filas);
    }
    var columna = prompt("Escoge la columna de la carta " + "\n" + "Fila escogida: " + fila);

    if (posicionValida(columna, partida.Columnas) != true) {
        columna = preguntarOtraVez(columna, partida.Columnas);
    }

    var forzarSalida = prompt("Escribe 'acabar' si quieres finalizar el programa" + "\n" + "Dale al intro si quieres seguir");
    if (finPartida(forzarSalida) == true) {
        console.log("Programa cerrado con éxito");
    }
    else {
        partida.voltea(fila, columna);
        mostrarMazo(partida);
        // Pedir carta 2
        fila = prompt("Escoge la fila de la otra carta ");

        if (posicionValida(fila, partida.Filas) != true) {
            fila = preguntarOtraVez(fila, partida.Filas);
        }
        columna = prompt("Escoge la columna de la otra carta " + "\n" + "Fila escogida: " + fila);

        if (posicionValida(columna, partida.Columnas) != true) {
            columna = preguntarOtraVez(columna, partida.Columnas);
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
    // Voltear carta 1


}


function preguntarOtraVez(posicion, numeroPartida) {
    while (posicionValida(posicion, numeroPartida) != true) {
        posicion = prompt("Número no válido escoge otra vez " + "\n");
    }
    return posicion;

}
function esPositivo(numero) {

    var positivo = false;
    if (numero > 0) {
        positivo = true;
    }

    return positivo;

}
function filaOcolumnaPositiva(numero) {
    var positivo = false;
    if (numero >= 0) {
        positivo = true;
    }

    return positivo;
}
function filaOcolumnaEntera(numero) {
    var entero = false;
    if (parseInt(numero) || numero == 0) {
        entero = true;
    }
    return entero;
}

function esEntero(numero) {

    var entero = false;
    if (parseInt(numero)) {
        entero = true;
    }
    return entero;
}

function posicionValida(posicion, partidaNumeros) {
    var correcto = false;
    if (existeEnElMazo(posicion, partidaNumeros)) {
        correcto = true;
    }
    return correcto;
}

function existeEnElMazo(numero, numeroPartida) {

    var existe = false;
    if (numero < numeroPartida && filaOcolumnaEntera(numero) == true && filaOcolumnaPositiva(numero) == true) {
        existe = true;
    }
    return existe;
}


function sonCorrectos(numero1, numero2) {
    var correctos = false;
    if (esPositivo(numero1) == true && esEntero(numero1) == true && esPositivo(numero2) == true && esEntero(numero2) == true) {
        correctos = true;
    }
    return correctos;
}

function mostrarMazo(partida) {
    console.table(partida.Mazo);
}

function finPartida(finalizarPartida) {

    if (finalizarPartida == "acabar") {
        return true;
    }
    else {
        return false;
    }
}


console.log("PARA COÑO");
var partida = escogerSizeTablero();
empezarJuego(partida);
pedirCarta(partida);



