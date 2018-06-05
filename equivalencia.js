const global = require('./global.js');
const claus = require('./clausura.js');

/* valida que la clausura encontrada no este en matriz de equivalencia AFND => AFD  */
var get_estado_si_existe_clausura_en_matriz= function (matriz_afd_analisis, arr_clausura_estado) {

	for (var i=0; i < matriz_afd_analisis.length; i++){
		//console.log("matriz_afd_analisis["+ i +"][2]: " + matriz_afd_analisis[i][2].toString() +" == "+ arr_clausura_estado.toString());
		
		if (matriz_afd_analisis[i][2].toString()  == arr_clausura_estado.toString()){
			//console.log(""+ matriz_afd_analisis[i][3]);
			return(matriz_afd_analisis[i][3]);
		}
	}
	return(-1);
}

/*  genera matriz de equivalencia AFND => AFD */
var getTransitionsNewAFD =  function(simbolos, cola_estado_revisar, arr_clausura){

    var matriz_afd_analisis = [];
    var maxState = 0;
    var arr_transiciones=[];

    // asignar la clausura qo
    arr_clausura.sort();
	matriz_afd_analisis.push([0,'-',arr_clausura,0]);    
	cola_estado_revisar.add(0);
	
	// Analiza cada estado del nuevo AF
	while (cola_estado_revisar.size()>0) {

		// El estado a analizar el es que saldrá de la cola (en el frente de ésta)
        var estado_cola = cola_estado_revisar.getFrontElement();
        
        // Analiza el estado con cada elemento del alfabeto
        
        for (var l = 0; l < simbolos.length; l++) {
        //simbolos.forEach(element => {
            
			// Element es la letra del alfabeto que se evaluará 
            //var symbol = element;
            var symbol = simbolos[l];
            symbol= symbol.replace('\r', '');
            var arr_clausura_estado = [];
            //var arr_clausura_estado = matriz_afd_analisis[estado_cola][2];

            //console.log("clausura vacia de "+ estado_cola);
            for (var i = 0; i < matriz_afd_analisis.length; i++) {
        		if (matriz_afd_analisis[i][3]==estado_cola){
        			arr_clausura_estado= matriz_afd_analisis[i][2];
        			//console.log (matriz_afd_analisis);
        		}
        	}
            	
          	//obtiene todas las transiciones estado simbolo
       		//console.log("get_arreglo_transiciones(["+  arr_clausura_estado + "],"+ symbol +");");
			arr_transiciones = get_arreglo_transiciones(arr_clausura_estado,symbol); 
            //console.log("arr_transiciones: "+ arr_transiciones);

            // Ordena el listado obtenido para facilitar la comparasión, y compara
            //console.log("===========*************=============")
            //console.log("estado_cola                  : " + estado_cola);
            //console.log("Symbol                        : " + symbol);
            //console.log("arr_afd_analisis["+ estado_cola +"] : " + arr_clausura_estado);
            //console.log("arr_transiciones        : " + arr_transiciones);
            //console.log("========================")

            /* definr la clausura de el estado y su simbolo*/
            var arr_clausura_final = [];
			for (var i = 0; i < arr_transiciones.length; i++) {
				arr_clausura_final = claus.get_clausura_simplificada(arr_clausura_final, claus.get_clausura_estado(arr_transiciones[i]) );
				//console.log("claus de: " + arr_transiciones[i]+ " = "+ claus.get_clausura_estado(arr_transiciones[i]));

    		};
    		arr_clausura_final.sort();
    		//console.log("clausuara final estado: " + arr_clausura_final.toString());
			
			var estado_existe = get_estado_si_existe_clausura_en_matriz(matriz_afd_analisis,arr_clausura_final);
			//console.log("estado_existe: " + estado_existe);
            
			// Si no encontró otra lista igual

			if ( estado_existe == -1 ) {
            	//console.log("agregar nuevo: "+ arr_clausura_final.toString());
            	maxState++;
                matriz_afd_analisis.push([estado_cola, symbol, arr_clausura_final, maxState]);
                cola_estado_revisar.add(maxState);

            // Si lo encontró, agrega el elemento con nombre de estado encontrado
            }else{
            	//console.log("agregar existente:  "+ arr_clausura_final.toString());
            	matriz_afd_analisis.push([estado_cola, symbol, arr_clausura_final, estado_existe ]);
            }
            //console.log("========================")
        }

		// Cuando se termina de analizar el nuevo estado con todos los simbolos del alfabeto, se saca de la cola
        cola_estado_revisar.remove();	
    }

    

    //var matriz_clausura = global.getMatriz_clausura();
	//claus.imprimir_matriz();
    
    global.setMatriz_afd_analisis(matriz_afd_analisis);

};

/*  imprime pantalla matriz de equivalencia AFND => AFD */
var imprimir_matriz_analisis = function(){
	var matriz_analisis =  global.getMatriz_afd_analisis();

	for (var i = 0; i < matriz_analisis.length; i++) {
		if (i==0){
			console.log("fila ("+ i +") - C-E("+  matriz_analisis[i][0]  +")={"+ matriz_analisis[i][2] +"}" );

		}else{
			console.log("fila ("+ i +") - C-E(d("+ matriz_analisis[i][0]+","+ matriz_analisis[i][1]+"))= {"+ matriz_analisis[i][2]+"} = " + matriz_analisis[i][3] );	
		}
	};
}

/* retorna las ransiciones de un arreglo de clausura */
var get_arreglo_transiciones = function(arr_clau, simbolo){
	var matriz_ady = global.getMatriz();
	var largo = matriz_ady.length;
	var arr_simb =[];

	if (arr_clau == undefined) {
		return arr_simb
	};
	
	/*  recorre arr clausura */
	for (var i=0; i < arr_clau.length; i++){
		//console.log ("buscar nodo "+ arr_clau[i] + " con simbolo: "+ simbolo );
		for (var j=0; j<largo; j++){
			var  ind_estado = arr_clau[i];	
			//console.log ("busca trans: matriz_ady["+ind_estado+"]["+j+"]= "+ matriz_ady[ind_estado][j]);
			if (simbolo == matriz_ady[ind_estado][j]){
				//console.log("i:"+i+" j:"+j)
				var indx = arr_simb.indexOf(j);
				if (indx==-1){
					arr_simb.push(j);
				}
				//console.log ("buscar nodo ["+ arr_clau[i] + "]["+j + "]= " + matriz_ady[i][j]);
			}
		}
	}

	if (arr_simb.length==0){
		arr_simb.push("&");
	}
	
	/*
	console.log("largo arr simb ("+ simbolo +") trans:  " +arr_simb.length);
	for (var i=0; i < arr_simb.length; i++){
		console.log("nodo transi: " + arr_simb[i]);
	}
	*/
	return arr_simb;
};


module.exports = {	
	get_arreglo_transiciones: get_arreglo_transiciones,
	getTransitionsNewAFD: getTransitionsNewAFD,
	imprimir_matriz_analisis:imprimir_matriz_analisis
};