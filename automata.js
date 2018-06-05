const global = require('./global.js');
//const pila = require('./pila.js');
const matriz = require('./matriz.js');

/*  valida si automata es AFND-e */
var cheq_si_efd_por_e = function(){
	var matriz_ady = global.getMatriz();
	var largo = matriz_ady.length;
	//var simbolos=[];
	for (var i=0; i < largo; i++){
		//simbolos=[];
		for (var j=0; j < largo; j++){
			if (matriz_ady[i][j] != "-" && matriz_ady[i][j] =="e"){
					//console.log("EL automáta no es un AFD, es un AFND-e ["+i+"]["+j+"]="+ matriz_ady[i][j]);
					return false;
			}	
		}
	}
	return true;
}

/*  valida si automata es AFND x validación de estado */
var cheq_si_efd_por_estado = function(){
	var matriz_ady = global.getMatriz();
	var largo = matriz_ady.length;
	var simbolos=[];
	for (var i=0; i < largo; i++){
		simbolos=[];
		for (var j=0; j < largo; j++){
			if (matriz_ady[i][j] != "-" && matriz_ady[i][j] !="e"){
				var indx = simbolos.indexOf(matriz_ady[i][j]);
				if (indx==-1){
					simbolos.push(matriz_ady[i][j]);
				}else{
					//console.log("EL automáta no es un AFD -validación x estado- ["+i+"]["+j+"]="+ matriz_ady[i][j]);
					return false;
				}
			}	
		}
	}
	//console.log("El automáta es un AFD");
	return true;
}

/*  valida si automata es AFND x validación de simbolos */
var cheq_si_efd_por_simbolo = function(){
	var matriz_ady = global.getMatriz();
	var largo = matriz_ady.length;
	var simbolos = global.getSimbolos();
	for (var i=0; i < largo; i++){
		for (var j=0; j < largo; j++){
			if (matriz_ady[i][j] != "-" && matriz_ady[i][j] != "e"){
				//var simbolos = global.getSimbolos();
				var indx = simbolos.indexOf(matriz_ady[i][j]);
				//console.log(indx);

				if (indx==-1){
					//console.log("EL automáta no es un AFD -validación x simbolos- ["+i+"]["+j+"]="+ matriz_ady[i][j]);
					return false;
				}
			}	
		}
	}
	//console.log("El automáta es un AFD");
	return true;
}

/* valida si es un AFND */
var cheq_si_efd = function(){
	var efd_x_e 	  = cheq_si_efd_por_e();
	var efd_x_estado  = cheq_si_efd_por_estado();
	var efd_x_simbolo = cheq_si_efd_por_simbolo();

	if (!efd_x_e){
		console.log("Es un AFND-e");
	}
	if (!efd_x_estado){
		console.log("Es un AFND, tiene mas de un camino por estado");
	}
	if (!efd_x_simbolo){
		console.log("Es un AFND, tiene mas de un simbolo agrupado");
	}
}

/* desagrupa agregando columna y fila para Automata equivalente */
var desagrupar = function(origen, final, grupo_simbolo){
	//console.log ("desagrupar ["+ origen +"]["+ final +"]= "+ grupo_simbolo);
	var orig = origen;
	for (var i=0; i < grupo_simbolo.length; i++){
		//console.log("simbolo:  "+ grupo_simbolo[i]);
			
		if (i != grupo_simbolo.length-1){
			matriz.agregar_fila();
			matriz.agregar_columa();
			var id_nuevo_nodo = global.getMatriz().length-1	;
			//console.log("asociar orig=" + orig+ " a nodo nuevo="+ id_nuevo_nodo  + " el simbolo "+ grupo_simbolo[i]);
			matriz.guardar_datos(orig,id_nuevo_nodo,grupo_simbolo[i]);
			orig = id_nuevo_nodo;
			//console.log("============== ");
		}else if (i == grupo_simbolo.length-1){
			//console.log("asociar nodo nuevo= "+ id_nuevo_nodo + " a orig=" + final + " el simbolo "+ grupo_simbolo[i]);
			//console.log("============== ");
			matriz.guardar_datos(id_nuevo_nodo,final,grupo_simbolo[i]);
		}
	}
	matriz.guardar_datos(origen,final,"-");
}

/* simplifica simboloes agrupadas, para crear Automàta equivalente */
var simplificar_simbolos_agrupados = function(){
	var matriz_ady = global.getMatriz();
	var largo = matriz_ady.length;
	for (var i=0; i < largo; i++){
		for (var j=0; j < largo; j++){
			var simbolo = matriz_ady[i][j];
			if (simbolo.length>1){
				desagrupar(i, j, matriz_ady[i][j]);
			}
		}
	}	
}

module.exports = {	
	//cheq_si_efd_por_estado: cheq_si_efd_por_estado,
	//cheq_si_efd_por_simbolo: cheq_si_efd_por_simbolo,
	//cheq_si_efd_por_e: cheq_si_efd_por_e,
	cheq_si_efd: cheq_si_efd,
	simplificar_simbolos_agrupados: simplificar_simbolos_agrupados
};