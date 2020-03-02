import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDrink } from '../../interface/drink.interface';
import { Observable } from 'rxjs';
import { drink } from '../../classes/drink.model';

@Injectable({
  providedIn: 'root'
})
export class DrinkService {

  drinks: Array<IDrink>= [];

  private url: string;

  constructor(private http: HttpClient) { 
    this.url = 'http://localhost:3000/drinks'
  }

  getJSONDrinks(): Observable<Array<IDrink>> {
    return this.http.get<Array<IDrink>>(this.url)
  }

  addJSONDrinks( drink: IDrink): Observable <Array<IDrink>> {
    return this.http.post<Array<IDrink>>(this.url, drink);
  }

  deletetJSONDrinks(id:number): Observable <Array<IDrink>> {
    return this.http.delete<Array<IDrink>>(`${this.url}/${id}` );
  }

  updateJSONDrinks( drink: IDrink ): Observable <Array<IDrink>> {
    return this.http.put<Array<IDrink>>(`${this.url}/${drink.id}`,drink );
  }

  getJSONOneDrink(id:number): Observable<IDrink>{
    return this.http.get<IDrink>(`${this.url}/${id}`);
  }
}
