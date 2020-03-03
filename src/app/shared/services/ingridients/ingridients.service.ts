import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IIngridient } from '../../interface/ingridient.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngridientsService {

  ingridients:Array<IIngridient> = [];
  private url: string;


  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/ingridients'
   }

  getJSONIngridients(): Observable<Array<IIngridient>> {
    return this.http.get<Array<IIngridient>>(this.url)
  }

  addJSONIngridients( ingridient: IIngridient): Observable <Array<IIngridient>> {
    return this.http.post<Array<IIngridient>>(this.url, ingridient);
  }

  deletetJSONIngridients(id:number): Observable <Array<IIngridient>> {
    return this.http.delete<Array<IIngridient>>(`${this.url}/${id}` );
  }

  updateJSONCroissants( ingridient: IIngridient ): Observable <Array<IIngridient>> {
    return this.http.put<Array<IIngridient>>(`${this.url}/${ingridient.id}`,ingridient );
  }




}
