import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  logged = false;

  constructor(private loginService: LoginService) {
    loginService.tokenValue.subscribe(next => {
      if (next) {
        this.logged = true;
      } else {
        this.logged = false;
      }
    });
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.logged = true;
    }
  }
}
