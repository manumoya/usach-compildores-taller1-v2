const global = require('./global.js');
const matriz = require('./matriz.js');

/* busca "e" en fila indicada */
var buscar_e_en_fila = function(fila, arr){
	var matriz_ady = global.getMatriz();
	var largo = matriz_ady.length;
	//console.log("buscar e en fila " + fila);
	for (var j=0; j < largo; j++){
		var simbolo = matriz_ady[fila][j];

		//console.log("buscar matriz_ady["+fila+"]["+j+"]=" + simbolo);

		if (simbolo=="e"){
			var indx = arr.indexOf(j);
			if (indx == -1){

				//console.log("push "+ j +" arr  matriz_ady["+fila+"]["+j+"]=" + simbolo);
				arr.push(j);
			}
		}
	}
	return arr;
}

/* construye matriz de clausura */
var definir_matriz_e = function(){
	var matriz_ady = global.getMatriz();
	var largo = matriz_ady.length;
	var matriz_clausura = new Array(largo); 
	for (var i=0; i < largo; i++){
		var arr_e=[];
		//console.log ("arr e de: " + i);
		//console.log ("buscar_e_en_fila("+ i +")");
		arr_e = buscar_e_en_fila(i, arr_e);
		//console.log (arr_e.length +">0");
		if (arr_e.length>0){
			//console.log ("encontró e, largo= " +arr_e.length);
		
			for (var k=0; k < arr_e.length; k++){
				//console.log ("if ("+ arr_e[k] +" != "+ i +")")
				if (arr_e[k] != i){
					var indx = arr_e.indexOf(i);
					if (indx == -1){
						arr_e = buscar_e_en_fila(arr_e[k], arr_e);
					}
				}
				//console.log ("largo: " +  arr_e.length);
				//console.log ("simbolo: " +  arr_e[k]);
			}
		}

		var indx = arr_e.indexOf(i);
		//console.log("indx = "+ indx);
		if (indx == -1){
			arr_e.push(i);
		}

		matriz_clausura[i]=arr_e; 
		//console.log("clausura:" + arr_e);
	}	

	/*
	for (var i=0; i<matriz_clausura.length; i++){
		//console.log ("Clausura de "+ i +" :");	
		for (var j=0; j< matriz_clausura[i].length; j++){
			console.log ("e: " +  matriz_clausura[i][j]);
		}
	}	
	*/
	
	global.setMatriz_clausura(matriz_clausura);
}

/* imprime pantalla matriz de clausura */
var imprimir_matriz = function(){
	var matriz_claus= global.getMatriz_clausura();
	for (var i=0; i<matriz_claus.length; i++){
		console.log("clausura("+i+") = "+ matriz_claus[i].toString());
	}
}

/* obtine la clausura  de un estado*/
var get_clausura_estado = function (estado){
	//console.log ("clausura: "+ estado);
	var matriz_claus= global.getMatriz_clausura();
	if (estado != "&"){
		return matriz_claus[estado];
	}else{
		return[];
	}
}

/* obtine la clausura  sin estados repetidos */
var get_clausura_simplificada = function(arr_claus_final,  arr_claus){
	//console.log("arr_claus "+ arr_claus.toString() );
	for (var i=0; i< arr_claus.length; i++){
		var indx = arr_claus_final.indexOf(arr_claus[i]);
		if (indx==-1){
			arr_claus_final.push(arr_claus[i]);
		}
		//console.log ("e: " +  matriz_clausura[i][j]);
	}
	return arr_claus_final;
}

module.exports = {	
	definir_matriz_e: definir_matriz_e,
	get_clausura_estado: get_clausura_estado,
	get_clausura_simplificada: get_clausura_simplificada,
	imprimir_matriz: imprimir_matriz
};