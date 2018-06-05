const fs = require('fs');
const global   = require('./global.js');
const fun_grales = require('./funciones_grales.js');

/*  lee archivo  *txt guarda en variables globales los datos */
var read = function(callback){

	var cont=1;
	fs.readFileSync('./af.txt').toString().split('\n').forEach(
		function (line) { 
			if (cont == 1){
				global.setNro_estados(line);
			}else if(cont==2){
				var symbolos = fun_grales.almacenar_en_array(line.split(" "));
				global.setSimbolos(symbolos);

			}else if(cont==3){
				global.setEstado_inicial(line);
				
			}else if(cont==4){
				var estados_finales = fun_grales.almacenar_en_array(line.split(" "));
				global.setEstado_finales(estados_finales);
			}else{
				var transicion = fun_grales.getTransicion(line.split(" "));
				global.push_transiciones(transicion);
			}	
		cont++;
	}); 
}

/* ejecuta la lectura de archivo .txt */
var leer_archivo =function(){
	read( function (err, result){
 	// error
	 	if (err) {
	     	console.log("error:" + err);
	     	return;	
	    }
	    console.log("est: " + global.getNro_estados() );
	});
}
	
module.exports = {	
	read: read,
	leer_archivo: leer_archivo
};
