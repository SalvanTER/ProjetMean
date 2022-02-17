import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Double } from 'mongodb';
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
  constructor(private route: ActivatedRoute,
    private authService: AuthentificationService,
    private recettesService: RecettesService) { }

    ngOnInit() {
      this.recettesService.getRandomRecettes().subscribe(recettes => {
           this.recettes = recettes;
      });
    }

}
