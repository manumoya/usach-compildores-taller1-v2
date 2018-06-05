const global = require('./global.js');
var iter = 1;

let get_lista_estados = function(afd_analisis) {

    var lista_estados = [];
    var flag = 0;

    afd_analisis.forEach(element => {

        if (lista_estados.lenght == 0) {
            lista_estados.push(element[3]);
        } else {
            flag = 0;
            for (let index = 0; index < lista_estados.length; index++) {
                if (lista_estados[index] == element[3]) {
                    flag = 1;
                }
            }
            if (flag == 0) {
                lista_estados.push(element[3]);
            }

        }

    });
    return lista_estados;

}


let get_transicion_con_simbolo = function (afd_analisis, estado_inicial, simbolo) {
    for (let i = 1; i < afd_analisis.length; i++) {
        if (afd_analisis[i][0].toString().trim() == estado_inicial.toString().trim()) {
            if (afd_analisis[i][1].toString().trim()==simbolo.toString().trim()) {
                return afd_analisis[i][3];
            }
        }
    }
}

let get_valida_si_nueva_transicion_es_final = function(afd_analisis,transicion,estados_finales){

    var esFinal = false;
    afd_analisis.forEach(analisis_afd_linea => {
        if ( analisis_afd_linea[3] == transicion ) {
            analisis_afd_linea[2].forEach(element_clausura_q => {
                estados_finales.forEach(estado_final => {
                    if ( element_clausura_q.toString().trim() == estado_final.toString().trim() ) {
                        esFinal =true;
                        return esFinal;
                    }
                });
            });
            return esFinal;
        }
    });
    return esFinal;
}

let get_afm_minimo = function() {


    console.log("********************* ");
    console.log("* MODULO AFD-MINIMO * ");
    console.log("********************* ");

    var afd_analisis = global.getMatriz_afd_analisis();
    var lista_simbolos = global.getSimbolos();
    var lista_estados = get_lista_estados(afd_analisis);
    var estados_finales = global.getEstado_finales();
    var cantidad_simbolos = global.getSimbolos().length;
    var tabla_transiciones = [];

    // Crea tabla de transiciones
    lista_estados.forEach(element_est => {
        
        var linea_transicion= [];

        // Agrega linea a la tabla de transiciones
        lista_simbolos.forEach(element_sim => {
            set_transcion_con_simbolo = get_transicion_con_simbolo(afd_analisis,element_est,element_sim);
            linea_transicion.push(set_transcion_con_simbolo);
        });

        // Si el estado es final, marcar la linea con *, sino # para no finales
        var esFinal = get_valida_si_nueva_transicion_es_final(afd_analisis,element_est,estados_finales);
        if ( esFinal ) linea_transicion.push('*')
        else linea_transicion.push('#')

        // Agrega nueva linea a tabla de transiciones
        tabla_transiciones.push(linea_transicion);

    });

    console.log(tabla_transiciones);
    console.log("***** Imprime Lista Estados *****");
    console.log(lista_estados);
    console.log("***** Grupos *****");
    
    // Procedimiento para Minimizar AFD
    var grupos_antiguos  = [];
    var grupos_nuevos    = [];
    var grupo_finales    = [];
    var grupo_no_finales = [];
    var flag_det_grupo   =  0;

    //Separa finales y no finales
    for (let i=0; i<tabla_transiciones.length; i++) {
        if (tabla_transiciones[i][cantidad_simbolos]=='*') 
            grupo_finales.push(lista_estados[i])
        else 
            grupo_no_finales.push(lista_estados[i])
    }

    console.log("***** Finales *****");
    console.log(grupo_finales);
    console.log("***** No Finales *****");
    console.log(grupo_no_finales);
    console.log()
    console.log("***** Algoritmo Minimización *****");
    console.log()
    var AFD_Min = get_afd_min_analisis(grupo_no_finales,grupo_finales, tabla_transiciones,lista_simbolos);
    //var AFD_Min_Final = get_reduccion_estados(AFD_Min)



}

var get_reduccion_estados = function(params) {
    
}

var get_afd_min_analisis = function(grupo_no_finales,grupo_finales,tabla_transiciones,lista_simbolos) {
    
    var grupos = [];
    var afd_min_analisis = [];
    grupos.push(grupo_no_finales);
    grupos.push(grupo_finales);
    console.log('Iteracion 1')
    afd_min_analisis = get_desagrupa_por_recursividad(grupos,tabla_transiciones,lista_simbolos)
    return afd_min_analisis;

}

var get_grupo_transicion_con_simbolo = function(grupos,trans_busca_grupo) {

    var indice = 0;
    var i=0;

    grupos.forEach(grupo => {

        indice++;
        
        grupo.forEach(transicion_grupo => {
            if (transicion_grupo == trans_busca_grupo) {
                i=indice;
                return indice;
            }
        });
    });

    return i;

}

var get_desagrupa_por_recursividad = function(grupos,tabla_transiciones,lista_simbolos) {

    var indice_grupo = 0;
    var afd_analisis = global.getMatriz_afd_analisis();
    var transiciones_con_simbolo = 0;
    var analisis_nuevos_grupos=  [];
    var AFD_Min_Actual_Largo = global.getAFM_Min_Actual_Largo();



    console.log(grupos);
    console.log();

    // Genera nuevo indice para cada grupo
    grupos.forEach(grupo => {
            
        indice_grupo++;
        
        grupo.forEach(transicion => {
            
            var arr_trans_simbolo = "";

            lista_simbolos.forEach(simbolo => {
                
                transiciones_con_simbolo = get_transicion_con_simbolo(afd_analisis,transicion,simbolo);
                
                var grupo_trans_con_simbolo = get_grupo_transicion_con_simbolo(grupos,transiciones_con_simbolo);
                
                arr_trans_simbolo = arr_trans_simbolo + '-' + grupo_trans_con_simbolo ;
                
            });    

            var grupo_trans_inicial = get_grupo_transicion_con_simbolo(grupos,transicion);

            arr_trans_simbolo = arr_trans_simbolo.substr(1) + '|' + grupo_trans_inicial;
        
            analisis_nuevos_grupos.push([indice_grupo,transicion,arr_trans_simbolo]) ;

        });
    
    });


    // Reagrupar grupos originales entragados como parametros
    
    var nuevos_grupos = get_asigna_codigo_a_grupos(analisis_nuevos_grupos);
    
    if (AFD_Min_Actual_Largo == nuevos_grupos.length) {
        return nuevos_grupos;
    }else{
        iter++;
        console.log('Iteracion '+iter)
        global.setAFM_Min_Actual_Largo(nuevos_grupos.length);
        return get_desagrupa_por_recursividad(nuevos_grupos,tabla_transiciones,lista_simbolos);
    }


}

var get_asigna_codigo_a_grupos = function(analisis_nuevos_grupos) {
    
    var listado_grupos_nuevos = [];
    var flag_listado = false;
    var encuentrado_listado_grupos_nuevos = false;
    
    // Obtiene los grupos individuales
    analisis_nuevos_grupos.forEach(analisis_linea => {
        
        if (!flag_listado) {
            listado_grupos_nuevos.push(analisis_linea[2]);
            flag_listado = true;
        }else{
            encuentrado_listado_grupos_nuevos = false;
            listado_grupos_nuevos.forEach(element => {
                if (element == analisis_linea[2] ) {
                    encuentrado_listado_grupos_nuevos =true;
                }
            });
            if (!encuentrado_listado_grupos_nuevos) {
                listado_grupos_nuevos.push(analisis_linea[2]);
            }
        }
        

    });
    
    // Reagrupa los estados de acuerdos a sus nuevos grupos
    let grupo_general = []; 
    listado_grupos_nuevos.forEach(element_grupos_nuevos => {
        let grupo_particular = [];    
        analisis_nuevos_grupos.forEach(element_analisis => {
            if (element_grupos_nuevos == element_analisis[2]) {
                grupo_particular.push(element_analisis[1])
            }
        });
        grupo_general.push(grupo_particular);
    });

    // Devuelve la nueva agrupación de estados para minimizar
    return grupo_general;

}


module.exports = {
    get_afm_minimo: get_afm_minimo
};