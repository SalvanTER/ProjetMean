import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthentificationService } from './authentification.service';
import { RecettesService } from './recettes.service';
import { RecettesComponent } from './recettes/recettes.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { AddRecetteComponent } from './add-recette/add-recette.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MainComponent,
    RecettesComponent,
    ConnexionComponent,
    AddRecetteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthentificationService, RecettesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
