//importamos la clase partida
import Partida from "./partida.js";

//esta función permite crear un tablero y escoger el tamaño
function escogerSizeTablero() {
    //escogemos las filas
    var filas = prompt("Escoge el número de filas (La multiplicación de filas y columnas tiene que ser un número par. Tamaño Mínimo: 2)");
    //escogemos las columnas
    var columnas = prompt("Escoge el número de columnas (La multiplicación de filas y columnas tiene que ser un número par. Tamaño Mínimo: 2)");
    //si la multiplicación de filas por columnas no es para significa que uno de los dos es impar así que habrá
    //que pedirle que cambie uno de los dos a par
    if (columnas * filas % 2 != 0) {
        do {
            //le dejamos elegir cual de los dos quiere cambiar
            var eleccion = prompt("Al menos uno de los dos tiene que ser par, escoge cual quieres cambiar:" + "\n" + "1: Filas" + "\n" + "2: Columnas");
            //según lo que escoja cambiará las filas o las columnas
            switch (parseInt(eleccion)) {
                case (1):
                    filas = prompt("Vuelve a elegir el número de filas");
                    break;
                case (2):
                    columnas = prompt("Vuelve a elegir las columnas");
                    break;
            }
        }
        //esto mientras el resultado no sea un número impar
        while (columnas * filas % 2 != 0);
    }
    // si por algún casual el jugador no es muy listo y no sabe poner un número entero positivo mayor que dos 
    //se creará la partida con valores por defecto
    else if (sonCorrectos(filas, columnas) != true) {
        alert("Números no válidos, creando partida por defecto");
    }
    //creamos la partida con estos datos
    var partida = new Partida(filas, columnas);
    //devolvemos la partida creada
    return partida;
}




//eesta función crea la partida de verdad
function crearPartida(partida) {
    //sacamos tantas cartas como parejas necesitamos
    for (let i = 0; i < ((partida.Filas * partida.Columnas) / 2); i++) {
        partida.selecciona();
    }
    //barajamos las cartas para que estén en un orden aleatorio
    partida.baraja();
    //repartimos las cartas en el mazo de la partida
    partida.reparte();
}

//esto empieza la partida 
function empezarJuego(partida) {
    //lo único que hace es crear partida 
    crearPartida(partida);
    //y la devolvemos
    return partida
}


//esta función pide cartas al usuario para voltear
function pedirCarta(partida) {
    // le mostramos el mazo inicial 
    mostrarMazo(partida);
    // Pedir carta 1
    //le pedimos un afila
    var fila = prompt("Escoge la fila de la carta " + "\n");
    //nos aseguramos de que esa fila es vñalida
    if (posicionValida(fila, partida.Filas) != true) {
        // si la fila no existe le deciimos qeu pregunte otra vez
        fila = preguntarOtraVez(fila, partida.Filas);
    }
    //preguntamos por la columna
    var columna = prompt("Escoge la columna de la carta " + "\n" + "Fila escogida: " + fila);
    //validamos que la columna exista
    if (posicionValida(columna, partida.Columnas) != true) {
        columna = preguntarOtraVez(columna, partida.Columnas);
    }

    //esto servirá por si el usuario quiere acabar la partida antes de tiempo
    var forzarSalida = prompt("Escribe 'acabar' si quieres finalizar el programa" + "\n" + "Dale al intro si quieres seguir");
    //si quiere salir de la partida pues salimos
    if (finPartida(forzarSalida) == true) {
        console.log("Programa cerrado con éxito");
    }
    else {
        //sino seguimos con la partida
        //y volteamos la carta que nos ha especificado el usuario
        partida.voltea(fila, columna);
        // Pedir carta 2
        //pedimos la fila de la segunda carta
        fila = prompt("Escoge la fila de la otra carta ");
        //la validamos
        if (posicionValida(fila, partida.Filas) != true) {
            fila = preguntarOtraVez(fila, partida.Filas);
        }
        // pedimos la columna de la segunda carta
        columna = prompt("Escoge la columna de la otra carta " + "\n" + "Fila escogida: " + fila);
        //la validamoas también
        if (posicionValida(columna, partida.Columnas) != true) {
            columna = preguntarOtraVez(columna, partida.Columnas);
        }
        // Comprobar acierto
        // comprobamos el acierto, esto compara la carta anteriormente seleccionada con la
        //más reciente y si el acierato es true hacemos alog
        if (partida.compruebaAcierto(fila, columna) == true) {
            //si hemos acertado llamamos a la función que pone la primera carta volteada a null
            //para que esas cartas ya no estén en la partida
            partida.cambiarANull();
        }
        //mostramos el mazo otra vez
        mostrarMazo(partida);
        //si hemos acertado todas las cartas
        //la partida termina
        if (partida.haFinalizado()) {
            //sacamos un mensaje de que la partida ha finalizao y que has ganado
            console.log("PARTIDA FINALIZADA!!");
        }
        else {
            //si no gnamod
            //esperamos 3 segundos y volvemos a empezar el proceso de 
            //pedir una carta hasta que salga del programa o gane
            setTimeout(function () {
                pedirCarta(partida);
            }, 3000);
        }
    }
}

//este método sirve para preguntar una posición otra vez
//comparandolo con el tamaño del mazo
function preguntarOtraVez(posicion, numeroPartida) {
    //si la posición no existe o no es válida preguntamios otra vez
    while (posicionValida(posicion, numeroPartida) != true) {
        posicion = prompt("Número no válido escoge otra vez " + "\n");
    }
    // y devolvemos la posición que sabemos que es válida
    return posicion;

}

//esta función comprueba que un número es positivo
function esPositivo(numero) {

    var positivo = false;
    if (numero > 0) {
        positivo = true;
    }
    //devolvemos si lo es o no 
    return positivo;

}
//esta función es como la de comprobar que un número es positivo pero para filas y columnas
//aquí se incliye el 0 tmbién porque es una posición válida
function filaOcolumnaPositiva(numero) {
    var positivo = false;
    if (numero >= 0) {
        positivo = true;
    }

    return positivo;
}
//esta función comprueba si las filas o columnas es un número entero
function filaOcolumnaEntera(numero) {
    var entero = false;
    //si lo podemos parsear a entero o es cero pues entonces nos sirve
    if (parseInt(numero) || numero == 0) {
        entero = true;
    }
    return entero;
}

//esta función comprueba si es un número entero
function esEntero(numero) {

    var entero = false;
    if (parseInt(numero)) {
        entero = true;
    }
    return entero;
}

//este método valida la posición
function posicionValida(posicion, partidaNumeros) {
    var correcto = false;
    //llamando a la función que comprueba si existe en el mazo
    if (existeEnElMazo(posicion, partidaNumeros)) {
        correcto = true;
    }
    return correcto;
}
//esta función comoprueba si la fila o columna existe en el mazo valiendose de las funciones anteriores
function existeEnElMazo(numero, numeroPartida) {
    
    var existe = false;
    if (numero < numeroPartida && filaOcolumnaEntera(numero) == true && filaOcolumnaPositiva(numero) == true) {
        existe = true;
    }
    return existe;
}

//esta función comprueba que los números a la hora de crear la partida son válidos
function sonCorrectos(numero1, numero2) {
    var correctos = false;
    if (esPositivo(numero1) == true && esEntero(numero1) == true && esPositivo(numero2) == true && esEntero(numero2) == true) {
        correctos = true;
    }
    return correctos;
}
//esta función muestra el mazo
function mostrarMazo(partida) {
    console.table(partida.Mazo);
}
//esta función comprueba si el usuario quiere terminar la partida
function finPartida(finalizarPartida) {

    if (finalizarPartida == "acabar") {
        return true;
    }
    else {
        return false;
    }
}


//creamos la partida
var partida = escogerSizeTablero();
//la empezamos
empezarJuego(partida);
//y jugamos
pedirCarta(partida);



