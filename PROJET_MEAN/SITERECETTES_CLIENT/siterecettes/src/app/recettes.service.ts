import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/*
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type":  "application/json",
    "Access-Control-Allow-Origin": "*"
  })
};
*/

@Injectable({
  providedIn: 'root'
})
export class RecettesService {

    private urlBase: string = 'http://localhost:8888/';

    constructor(private http: HttpClient) { }

    getRandomRecettes(): Observable<any> {
      return this.http.get(this.urlBase+'3randomRecettes');
  }
    getRecettes(): Observable<any> {
        return this.http.get(this.urlBase+'allRecettes');
    }

    getRecettesParIngredients(categorie: string): Observable<any> {
        return this.http.get(this.urlBase+'recettes/ingredients/'+categorie);
    }
}
