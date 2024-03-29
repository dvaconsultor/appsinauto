import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(arr: any[], texto: string, columna: string): any[] {
    
    if(texto === ''){
    	return arr;
    }
    texto = texto.toLowerCase();
    return arr.filter( item => {
    	return item[columna].toLowerCase().includes( texto );
    });
    
  }

}
