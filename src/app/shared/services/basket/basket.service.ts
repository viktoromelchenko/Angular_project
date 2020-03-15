import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  basket = new Subject<any>();
  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/basket'
   }

   getJSONProducts(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.url)
  }

  addJSONProducts( product ): Observable <Array<any>> {
    return this.http.post<Array<any>>(this.url, product);
  }
}
