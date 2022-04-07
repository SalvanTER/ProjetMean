import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { RecettesService } from '../recettes.service';
class Recette {
  public nom : String;
  public ingredients : String[];
  public price : number;
  public img : String;
  public author : String;
  constructor() {
    this.nom = "";
    this.ingredients = new Array();
    this.price = 0;
    this.img = "";
    this.author = "";
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
  constructor(private route: ActivatedRoute,
    private authService: AuthentificationService,
    private recettesService: RecettesService, private router : Router) { }

    ngOnInit() {
      this.recettesService.getRandomRecettes().subscribe(recettes => {
           this.recettes = recettes;
      });
    }
    onSubmit() {
      console.log("test");
    }
}
