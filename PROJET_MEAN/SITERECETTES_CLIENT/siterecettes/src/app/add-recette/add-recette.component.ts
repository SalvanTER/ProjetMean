import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { Observable } from 'rxjs';
import { RecettesService } from '../recettes.service';
@Component({
  selector: 'app-add-recette',
  templateUrl: './add-recette.component.html',
  styleUrls: ['./add-recette.component.css']
})
export class AddRecetteComponent implements OnInit {
  public recette = {"id":"", "nom":"", "ingredients": Array(), "img" :"", "author":"", "usersLiked": Array()};
  public user : Observable<string>;
  public urlValidity = true;
  public recetteAdded = false;
  constructor(private authService: AuthentificationService,
    private recetteService: RecettesService, 
    private router: Router) {
    this.user = this.authService.getUser();
  }
  ngOnInit(): void {

  }
  onSubmitRecette():void
  {
    if(!(this.recette["ingredients"].length == 0) && this.urlValidity) {
      this.user.forEach(item=>{
        this.recette["author"] = item;
      })
      this.recette["id"] =  '_' + Math.random().toString(36).substr(2, 9);
      this.recette["nom"] = this.recette["nom"].toLowerCase();
      this.recetteService.addRecette(this.recette).subscribe(reponse => {
        console.log(parseInt(reponse['resultat']));
      });
      this.recetteAdded = true;
    }
  }
  addIngredient(ing:HTMLInputElement):void
  {
    this.recette["ingredients"].push(ing.value);
    ing.value = "";
  }
  deleteIngredient():void
  {
    this.recette["ingredients"].pop();
  }
  checkUrl():void
  {
    this.urlValidity = false;
  }
  resetUrlValidity():void
  {
    this.urlValidity = true;
  }
}
