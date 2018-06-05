/* Desplega titulos por pantalla */

var datos_entrada = function(){
	console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
	console.log("|||||||||||   DATOS DE ENTRADA  *.TXT    ||||||||||||||||||");
	console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
}

var automata_entrada = function(){
	console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
	console.log("|||||||||||||    AUTÓMATA DE ENTRADA      |||||||||||||||||");
	console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
}

var validar_automata = function(){
	console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
	console.log("||||||||    VALIDACIÓN AUTÓMATA DE ENTRADA    |||||||||||||");
	console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
}

var automata_equivalente = function(){
	console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
	console.log("||||||||||||    AUTÓMATA  EQUIVALENTE     |||||||||||||||||");
	console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
}

var matriz_clausura = function(){
	console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
	console.log("|||||||||||||||    MATRIZ  CLAUSURA     |||||||||||||||||||");
	console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
}

var matriz_dfd_analisis= function(){
	console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
	console.log("|||||||||||||    MATRIZ  ANÁLISIS AFD     |||||||||||||||||");
	console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
}

module.exports = {	
	datos_entrada: datos_entrada,
	automata_entrada: automata_entrada,
	validar_automata: validar_automata,
	automata_equivalente:automata_equivalente,
	matriz_clausura: matriz_clausura,
	matriz_dfd_analisis: matriz_dfd_analisis
};