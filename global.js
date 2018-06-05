/* El objetivo es almacenar las variables globales */

var info = {
	nro_estados: 0,
	simbolos:[],
	estado_inicial: 0,
	estados_finales:[],
	transiciones:[],
	matriz:[],
	matriz_clausura:[],
	matriz_afd_analisis:[],
	afd_min_actual:[],
	AFM_Min_Actual_Largo:0
};

var getNro_estados = function() {
	return info.nro_estados;
}

var setNro_estados = function(param) {
	info.nro_estados = param;
}

var getSimbolos = function() {
	return info.simbolos;
}

var setSimbolos = function(param) {
	info.simbolos= param;
}

var getEstado_inicial = function() {
	return info.estado_inicial;
}

var setEstado_inicial = function(param) {
	info.estado_inicial = param;
}

var getEstado_finales = function() {
	return info.estados_finales;
}

var getAFD_Min_Actual = function() {
	return info.info.AFD_Min_Actual;
}

var setEstado_finales  = function(param) {
	info.estados_finales = param;
}

var push_transiciones = function(param) {
	info.transiciones.push(param); 
}

var getTransiciones = function(param) {
	return info.transiciones; 
}

var getMatriz = function() {
	return info.matriz;
}

var setMatriz  = function(param) {
	info.matriz = param;
}

var setMatriz_clausura = function(matriz){
	info.matriz_clausura = matriz;
}

var getMatriz_clausura = function(){
	return info.matriz_clausura;
}

var getMatriz_afd_analisis = function(){
	return info.matriz_afd_analisis;
}

var setMatriz_afd_analisis = function(matriz){
	return info.matriz_afd_analisis = matriz ;
}

var setAFD_Min_Actual = function(matriz){
	return info.AFD_Min_Actual = matriz ;
}

var setAFM_Min_Actual_Largo = function(valor){
	return info.AFM_Min_Actual_Largo = valor ;
}

var getAFM_Min_Actual_Largo = function(){
	return info.AFM_Min_Actual_Largo;
}

module.exports = {	
	getNro_estados: getNro_estados,
	setNro_estados: setNro_estados,
	getSimbolos: getSimbolos,
	setSimbolos: setSimbolos,
	getEstado_inicial: getEstado_inicial,
	setEstado_inicial: setEstado_inicial,
	getEstado_finales: getEstado_finales,
	setEstado_finales: setEstado_finales,
	push_transiciones: push_transiciones,
	getTransiciones: getTransiciones,
	getMatriz: getMatriz,
	setMatriz: setMatriz,
	setMatriz_clausura: setMatriz_clausura,
	getMatriz_clausura: getMatriz_clausura,
	getMatriz_afd_analisis: getMatriz_afd_analisis,
	setMatriz_afd_analisis: setMatriz_afd_analisis,
	setAFD_Min_Actual: setAFD_Min_Actual,
	getAFD_Min_Actual: getAFD_Min_Actual,
	getAFM_Min_Actual_Largo: getAFM_Min_Actual_Largo,
	setAFM_Min_Actual_Largo: setAFM_Min_Actual_Largo
};