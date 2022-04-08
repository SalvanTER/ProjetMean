import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from '../authentification.service';
import { RecettesService } from '../recettes.service';
class Recette {
  public id : String;
  public nom : String;
  public ingredients : String[];
  public price : number;
  public img : String;
  public author : String;
  public usersLiked : String[];
  public comments : String[][];
  constructor() {
    this.id = "";
    this.nom = "";
    this.ingredients = new Array();
    this.price = 0;
    this.img = "";
    this.author = "";
    this.usersLiked = [];
    this.comments = [];
  }
}
@Component({
  selector: 'app-recettes',
  templateUrl: './recettes.component.html',
  styleUrls: ['./recettes.component.css']
})
export class RecettesComponent implements OnInit {
  public recettes : Recette[] = new Array();
  public keyword :string = "";
  public keyWordAdvSearch :string = "";
  public critere : string ="1";
  public currentUser : String ="";
  public user:Observable<string>;
  constructor(private route: ActivatedRoute,
    private authService: AuthentificationService,
    private recettesService: RecettesService, private router: Router) { 
      this.currentUser ="";
      this.user = this.authService.getUser();
      this.user.forEach(item=>{
        this.currentUser = item;
      })
    }

  ngOnInit(): void {
    this.reloadRecette();
  }
  reloadRecette()
  {
    this.route.params.subscribe((params:Params)=>{
      let keyword = this.route.snapshot.paramMap.get('keyword');
      let ingredient = this.route.snapshot.paramMap.get('ingredient');
      let auteur = this.route.snapshot.paramMap.get('auteur');
      if(keyword != null)
      {
        this.recettesService.getRecettesByKeyword(keyword).subscribe(recettes => {
          this.recettes = recettes;
        });
      }
      else if(ingredient != null)
      {
        this.recettesService.getRecettesParIngredients(ingredient).subscribe(recettes => {
          this.recettes = recettes;
        });
      }
      else if(auteur != null)
      {
        this.recettesService.getRecettesParAuteur(auteur).subscribe(recettes => {
          this.recettes = recettes;
        });
      }
    })
  }
  chercheRecette()
  {
    if(this.keyWordAdvSearch.length > 0)
    {
      switch (parseInt(this.critere)) {
        case 1:
          this.router.navigate(['recettes', this.keyWordAdvSearch]);
          break;
        case 2:
          this.router.navigate(['ingredient', this.keyWordAdvSearch]);
          break;
        case 3:
          this.router.navigate(['author', this.keyWordAdvSearch]);
          break;
      }
    }
  }
  MAJChampAdvSearch(keyword :string)
  {
    console.log(keyword);
    this.keyWordAdvSearch = keyword;
  }
  getCritere(critere:string)
  {
    this.critere = critere;
    console.log(critere);
  }
  onClickButtonLikeOff(idRecette:string)
  {
    var coupleRecetteUser = {user: "",id:""+idRecette};
    this.user.forEach(item=>{
      coupleRecetteUser.user = item;
    })
    this.recettesService.likeRecette(coupleRecetteUser).subscribe(reponse => {
      console.log(parseInt(reponse['resultat']));
      this.reloadRecette();
    });
  }
  onClickButtonLikeOn(idRecette:string)
  {
    var coupleRecetteUser = {user: "",id:""+idRecette};
    this.user.forEach(item=>{
      coupleRecetteUser.user = item;
    })
    this.recettesService.unlikeRecette(coupleRecetteUser).subscribe(reponse => {
      console.log(parseInt(reponse['resultat']));
      this.reloadRecette();
    });
  }
  onClickButtonComment(c:String, idRecette:String)
  {
    var contentNewComment = {user : this.currentUser, comment : c, id:""+idRecette};
    this.recettesService.commentRecette(contentNewComment).subscribe(reponse => {
      console.log(parseInt(reponse['resultat']));
      this.reloadRecette();
    });
  }
}
