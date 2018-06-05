const global = require('./global.js');

/* crea matriz de adyacencia que almacena el automata */
var crear_matriz_ady = function(){
	var largo = global.getNro_estados();
	var matriz_ady = new Array(largo); 
	for (var i=0; i < largo; i++){
		matriz_ady[i] =new Array(largo);
	}
	global.setMatriz(matriz_ady);
}

/*  completa con '-' los espacios vacios de la matriz */
var set_incial_matriz = function(){
	var matriz = global.getMatriz();
	var largo = matriz.length;
	//console.log(largo);
	for (var i=0; i < largo; i++){
		for (var j=0; j < largo; j++){	
			matriz[i][j]="-";
		}
	}
	global.setMatriz(matriz);
}

/* completa la matriz de adyacencia con las transiciones de entrada*/
var llenar_matriz_ady = function(){
	var arr_transiciones = global.getTransiciones();
	var matriz_ady = global.getMatriz();
	for (var i=0; i< arr_transiciones.length; i++){
		var orig = parseInt(arr_transiciones[i].orig);
		var final = parseInt(arr_transiciones[i].final);
		matriz_ady[orig][final]=arr_transiciones[i].simb;
		//console.log("arr["+ orig+"]["+ final+"]= "+ matriz_ady[orig][final]);
	}	
}

/* imprime por pantalla la matriz de adyacencia sin los espacios vacios */
var ver_matriz_ady = function(){
	var matriz_ady = global.getMatriz();
	var largo = matriz_ady.length;
	var largo_col = matriz_ady[0].length;
	for (var i=0; i < largo; i++){
		for (var j=0; j < largo_col; j++){	
			if (matriz_ady[i][j]!="-"){
				console.log("arr["+ i+"]["+ j+"]= "+ matriz_ady[i][j]);
			}
		}
	}	
}

/* prepara fila con '-' cuando construye automata equivalente*/
var get_incial_fila = function(largo){
	fila = new Array(largo);
	for (var i=0; i < largo; i++){
		fila[i]="-";
	}
	return fila;
}

/* agregar fila cuando construye automata equivalente*/
var agregar_fila = function (){
	var matriz_ady = global.getMatriz();
	var largo = matriz_ady.length;
	var fila = get_incial_fila(largo);
	matriz_ady.push(fila);
}

/* agregar columna cuando construye automata equivalente*/
var agregar_columa = function (){
	var matriz_ady = global.getMatriz();
	var largo = matriz_ady.length;
	for (var i=0; i < largo; i++){
		matriz_ady[i].push("-");
	}
}

/* almacena los datos segun posicion en matriz de adyacencia */
var guardar_datos = function(ini, fin, simbolo){
	var matriz_ady = global.getMatriz();
	matriz_ady[ini][fin]=simbolo;
}

module.exports = {	
	crear: crear_matriz_ady,
	llenar: llenar_matriz_ady,
	ver: ver_matriz_ady,
	preparar:set_incial_matriz,
	agregar_fila: agregar_fila, 
	agregar_columa: agregar_columa,
	guardar_datos: guardar_datos
};