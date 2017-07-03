

var grilla = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

var posicionVacia = {
  fila:2,
  columna:2
};

function chequearSiGano(){
  return grillaOrdenada();
  
}

function grillaOrdenada(){
  var cantidadFilas = grilla.length;
  var cantidadColumnas = grilla[0].length;
  var ultimoValorVisto = 0;
  var valorActual = 0;
  
  for(var fila=0; fila < cantidadFilas; fila++){
    for(var columna=0; columna < cantidadColumnas; columna++){
      valorActual = grilla[fila][columna]
     
      if(valorActual < ultimoValorVisto) return false;

      
      ultimoValorVisto = valorActual;
    }
  }
  return true;
}


function intercambiarPosiciones(fila1, columna1, fila2, columna2){
  var pieza1 = grilla[fila1][columna1];
  var pieza2 = grilla[fila2][columna2];
  grilla[fila1][columna1] = pieza2;
  grilla[fila2][columna2] = pieza1;


  var elementoPieza1 = document.getElementById('pieza'+pieza1);
  var elementoPieza2 = document.getElementById('pieza'+pieza2);
  var padre = elementoPieza1.parentNode;
  var clonElemento1 = elementoPieza1.cloneNode(true);
  var clonElemento2 = elementoPieza2.cloneNode(true);

  padre.replaceChild(clonElemento1, elementoPieza2);
  padre.replaceChild(clonElemento2, elementoPieza1);

}



function actualizarposicionVacia(nuevaFila,nuevaColumna){
  posicionVacia.fila = nuevaFila;
  posicionVacia.columna = nuevaColumna;
}

// Esta buena para entender como funcionan los booleanos.
function posicionValida(fila, columna){
  return (fila >= 0 && fila <= 2) && (columna >= 0 && columna <= 2);

}

// Movimiento de fichas, en este caso la que se mueve es
// la blanca intercambiando
// su posición con otro elem
function moverEnDireccion(direccion){

  var nuevaFilaPiezaBlanca;
  var nuevaColumnaPiezaBlanca;


  if(direccion == 40){
    nuevaFilaPiezaBlanca = posicionVacia.fila-1;
    nuevaColumnaPiezaBlanca = posicionVacia.columna;
  }
  else if (direccion == 38) {
    nuevaFilaPiezaBlanca = posicionVacia.fila+1;
    nuevaColumnaPiezaBlanca = posicionVacia.columna;

  }
  else if (direccion == 39) {
    nuevaFilaPiezaBlanca = posicionVacia.fila;
    nuevaColumnaPiezaBlanca = posicionVacia.columna-1;

  }
  else if (direccion == 37) {
    nuevaFilaPiezaBlanca = posicionVacia.fila;
    nuevaColumnaPiezaBlanca = posicionVacia.columna+1;
  }

  if (posicionValida(nuevaFilaPiezaBlanca, nuevaColumnaPiezaBlanca)){
    intercambiarPosiciones(posicionVacia.fila, posicionVacia.columna,
    nuevaFilaPiezaBlanca, nuevaColumnaPiezaBlanca);
    actualizarposicionVacia(nuevaFilaPiezaBlanca, nuevaColumnaPiezaBlanca);
  }

}


// Extras, ya vienen dadas

function mezclarPiezas(veces){
  if(veces<=0){return;}
  var direcciones = [40, 38, 39, 37];
  var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function(){
    mezclarPiezas(veces-1);
  },100);
}

function capturarTeclas(){
  document.body.onkeydown = (function(evento) {
    moverEnDireccion(evento.which);

    var gano = chequearSiGano();
    if(gano) alert('ganaste!');
    evento.preventDefault();
  })
}

function iniciar(){
  mezclarPiezas(60);
  capturarTeclas();
}


iniciar();
