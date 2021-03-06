import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentAddComponent } from './components/student-add/student-add.component';
import { StudentViewComponent } from './components/student-view/student-view.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentPatchComponent } from './components/student-patch/student-patch.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { LogoutComponent } from './components/logout/logout.component';

const appRoutes: Routes = [
  { path: 'add', component: StudentAddComponent, canActivate: [AuthGuard] },
  { path: 'view/:id', component: StudentViewComponent, canActivate: [AuthGuard] },
  { path: 'patch/:id', component: StudentPatchComponent, canActivate: [AuthGuard] },
  { path: 'list', component: StudentListComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '', component: LoginComponent },
  { path: '**', redirectTo: '/list', pathMatch: 'full', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
