import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type":  "application/json",
    "Access-Control-Allow-Origin": "*"
  })
};
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
  getRecettesByKeyword(keyword : string): Observable<any> {
    return this.http.get(this.urlBase+'recettes/' + keyword);
  }
  getRecettesParIngredients(categorie: string): Observable<any> {
      return this.http.get(this.urlBase+'ingredients/'+categorie);
  }
  getRecettesParAuteur(auteur: string): Observable<any> {
    return this.http.get(this.urlBase+'auteur/'+auteur);
  }
  addRecette(recette:any): Observable<any> 
  {
    return this.http.post(this.urlBase+'recette/add', JSON.stringify(recette), httpOptions);
  }
  likeRecette(coupleRecetteUser:any): Observable<any> 
  {
    return this.http.post(this.urlBase+'recette/liked', JSON.stringify(coupleRecetteUser), httpOptions);
  }
  unlikeRecette(coupleRecetteUser:any): Observable<any> 
  {
    return this.http.post(this.urlBase+'recette/unliked', JSON.stringify(coupleRecetteUser), httpOptions);
  }
  commentRecette(contentNewComment:any): Observable<any> 
  {
    return this.http.post(this.urlBase+'recette/comment', JSON.stringify(contentNewComment), httpOptions);
  }
}
