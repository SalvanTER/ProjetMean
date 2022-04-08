import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  private message: string = "";
  public utilisateur = {"email":"", "password":""};
  public inscription = {"username" : "", "email" : "", "password" : ""};
  public connexionEchoue = 0;
  public inscriptionStatus = 0;
  constructor(private authService: AuthentificationService, private router: Router) {
  }
  ngOnInit(): void {
  }
  onSubmitConnexion():void
  {
      this.authService.verificationConnexion(this.utilisateur).subscribe(reponse => {
        this.message = reponse['message'];
        if (reponse['resultat'].length != 0) {
          this.authService.connect(reponse['resultat']);
          this.router.navigate(['/main']);
          this.connexionEchoue = 0;
        }
        else
        {
          this.connexionEchoue = 1;
        }
      });
  }
  onSubmitInscription():void
  {
    this.authService.inscription(this.inscription).subscribe(reponse => {
      this.inscriptionStatus = parseInt(reponse['resultat']);
    });
  }
}
