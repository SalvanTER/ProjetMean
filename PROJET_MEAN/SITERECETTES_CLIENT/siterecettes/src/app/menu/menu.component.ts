import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public user: Observable<string>;
  constructor(private authService: AuthentificationService, private router: Router) {
    this.user = this.authService.getUser();
  }

  ngOnInit() {
    this.router.navigate(['/main']);
  }
  deconnexion() {
        this.authService.disconnect();
        this.router.navigate(['/main']);
  }

}
