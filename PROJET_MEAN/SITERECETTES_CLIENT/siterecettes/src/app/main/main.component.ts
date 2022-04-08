import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
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
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  public recettes : Recette[] = new Array();
  public keywordRecette : String = "";
  public user: Observable<string>;
  public currentUser :String;
  constructor(private route: ActivatedRoute,
    private authService: AuthentificationService,
    private recettesService: RecettesService, private router : Router) {
      this.currentUser ="";
      this.user = this.authService.getUser();
      this.user.forEach(item=>{
        this.currentUser = item;
      })
    }
    
    ngOnInit() {
      this.reloadRecette();
    }
    reloadRecette()
    {
      this.recettesService.getRandomRecettes().subscribe(recettes => {
        this.recettes = recettes;
        console.log(this.recettes[0].comments);
      });
    }
    onSubmit() {
      console.log("test");
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
      var coupleRecetteUser = {user: this.currentUser,id:""+idRecette};
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
