import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRecetteComponent } from './add-recette/add-recette.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { MainComponent } from './main/main.component';
import { RecettesComponent } from './recettes/recettes.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent
  },
  {
    path:'recettes/:keyword',
    component:RecettesComponent
  },
  {
    path:'ingredient/:ingredient',
    component:RecettesComponent
  },
  {
    path:'author/:auteur',  
    component:RecettesComponent
  },
  {
    path:'connexion_inscription',
    component:ConnexionComponent
  },
  {
    path:'add-recette',
    component:AddRecetteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
