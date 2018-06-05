const global   = require('./global.js');

/* almacenar valores en un array*/
var almacenar_en_array = function(valores){
	var arr = [];
	//console.log("valores.length: "+ valores.length);
	for (i=0; i < valores.length; ++i){
		arr.push(valores[i]);
	}
	return arr;
}	

/* preparar las transiciones y retiornarlas*/
var getTransicion = function(valores){
	var orig=0, simb=0, finall=0;
	for (i=0; i < valores.length; ++i){
		if (i==0){
			orig=valores[i];
		}if (i==1){
			simb=valores[i];
		}if (i==2){
			finall=valores[i];
		}
	
	}

	var transiciones = {
		"orig": orig, 
		"simb": simb, 
		"final": finall
	};
	
	return(transiciones);	
}	

/* imprimir por pantalla los datos de entrada de archivo .txt*/
var imprimir_datos_entrada = function(){
	var estados = global.getNro_estados(); 
	var simbolos = global.getSimbolos();
	console.log("Estados : " + estados );
	console.log("Simbolos : " +  simbolos);
	console.log("Estado inicial : " + global.getEstado_inicial() );
	console.log("Estados finales: " + global.getEstado_finales() );
	arr_transiciones = global.getTransiciones();

	for (var i=0; i < arr_transiciones.length; i++){
			console.log("transicion["+ i+"]= " + arr_transiciones[i].orig +" / "+ 
						arr_transiciones[i].simb +" / "+ arr_transiciones[i].final);
	}
}

module.exports = {	
	almacenar_en_array: almacenar_en_array,
	getTransicion: getTransicion,
	imprimir_datos_entrada: imprimir_datos_entrada
};