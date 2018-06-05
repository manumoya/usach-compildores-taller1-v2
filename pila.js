var existe_ciclo = function(pila, nodo){
  //Nodo *auxiliar;
  //auxiliar = pila->inicio;
  //cons("\nMostrando pila completa:\n");
  if (pila.length==0){
     console.log( "\nLa pila está vacía!!\n" );
  }   
  //int validacion=0;
  //int cont_pila=0;
  var indx = pila.indexOf(nodo);
  if (indx != -1){
    return true;
  }else{
    return false;
  }
    /*
    printf("nombre: %s", auxiliar->nombre);
    printf(" costo: %d", auxiliar->costo);
    printf("\n");
    printf(" nodo inex: %c", nodo[0]);
    */
    //if (auxiliar->nombre[0]==nodo[0] && cont_pila>1){
    
    /*if (auxiliar->nombre[0]==nodo[0] && cont_pila>1){
      validacion=1;
    }
    auxiliar = auxiliar->siguiente;
    cont_pila++;
  }
  printf("\n");
  return (validacion);
  */
}
module.exports = {  
  existe_ciclo: existe_ciclo
};