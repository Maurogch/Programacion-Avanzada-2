import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.loginService.logout();
    this.router.navigateByUrl('/login');
  }
}
