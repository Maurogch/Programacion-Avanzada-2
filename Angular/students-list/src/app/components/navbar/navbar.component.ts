import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  logged = false;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    if (typeof this.loginService.token !== 'undefined') {
      this.logged = true;
    }
  }

  toogleLogged() {
    this.logged = !this.logged;
  }

}
