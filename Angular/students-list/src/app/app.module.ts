import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Required for Material
import * as $ from 'jquery';

// App Modules
import { AppRoutingModule } from './app-routing.module';
import { AngularMaterialModule } from './shared/angular.material.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';

// App Components
import { AppComponent } from './app.component';
import { StudentAddComponent } from './components/student-add/student-add.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentViewComponent } from './components/student-view/student-view.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentAddComponent,
    StudentListComponent,
    StudentViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}