import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private loginService: LoginService, private globalService: GlobalService, private router: Router) { }

  ngOnInit() {
    this.loginService.logout();
    this.globalService.tokenValue.next();
    this.router.navigateByUrl('/login');
  }

}
