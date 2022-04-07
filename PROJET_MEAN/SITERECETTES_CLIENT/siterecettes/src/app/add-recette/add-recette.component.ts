import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Observable } from 'rxjs';
import { RecettesService } from '../recettes.service';
@Component({
  selector: 'app-add-recette',
  templateUrl: './add-recette.component.html',
  styleUrls: ['./add-recette.component.css']
})
export class AddRecetteComponent implements OnInit {
  public recette = {"nom":"", "ingredients": Array(), "img" :"", "author":""};
  public user : Observable<string>;
  public urlValidity = true;
  constructor(private authService: AuthentificationService,
    private recetteService: RecettesService
    ) {
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
      this.recetteService.addRecette(this.recette).subscribe(reponse => {
        console.log(parseInt(reponse['resultat']));
      });
      console.log(this.recette); 
    }
  }
  addIngredient(ing:string):void
  {
    this.recette["ingredients"].push(ing);
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
