import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  logged = false;

  constructor(private loginService: LoginService, private globalService: GlobalService) { 
    globalService.tokenValue.subscribe(next => {
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
