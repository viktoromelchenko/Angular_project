import { Pipe, PipeTransform } from '@angular/core';
import { category } from '../classes/category.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(categoryAdmin: any,name:string): any {
    if(!name){
      return categoryAdmin;
    }
    if(!categoryAdmin){
      return[];
    }
    return categoryAdmin.filter( category => category.name.toLowerCase().indexOf(name.toLowerCase()) !== -1)
  }

}
