import { Injectable } from '@angular/core';
import { ICroissant } from '../interface/croissant.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CroissantService {
  

  croissants: Array<ICroissant> = [
    {
      id: 1,
      categoryName: "sandwich",
      name: "Beef",
      ingredients: 'ssssss',
      price: 59

    }
  ];
  private url: string;
  
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/croissants'
  }

  getCroissant():Array<ICroissant>{
    return this.croissants
  }

  getJSONCroissants(): Observable<Array<ICroissant>> {
    return this.http.get<Array<ICroissant>>(this.url)
  }

  addJSONCroissants( croissant: ICroissant): Observable <Array<ICroissant>> {
    return this.http.post<Array<ICroissant>>(this.url, croissant);
  }

  deletetJSONCroissants(id:number): Observable <Array<ICroissant>> {
    return this.http.delete<Array<ICroissant>>(`${this.url}/${id}` );
  }

  updateJSONCroissants( croissant: ICroissant ): Observable <Array<ICroissant>> {
    return this.http.put<Array<ICroissant>>(`${this.url}/${croissant.id}`,croissant );
  }

  getJSONOneCroissant(id:number): Observable<ICroissant>{
    return this.http.get<ICroissant>(`${this.url}/${id}`);
  }

}
