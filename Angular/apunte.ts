//Importar jQuery, popper, bootstrap
//yarn install jquery
//yarn install popper.js
//yarn install bootrsrap
//add "./node_modules/jquery/dist/jquery.min.js",
//    "./node_modules/popper.js/dist/umd/popper.min.js",
//    "./node_modules/bootstrap/dist/js/bootstrap.min.js"
// to angular.json, "scripts": []
//add "./node_modules/bootstrap/dist/css/bootstrap.min.css"
// to angular.json, "styles": []
//add import * as $ from 'jquery'; in app.module.ts

//import {FormsModule } from '@angular/forms'
//es necesario para ngModel double binding en forms, a veces esta linea debe ser puesta manualmente

//Comunicación entre componente cuando hay ruteo
//----Servicios----

//get parm passsed by route
//route.snapshot.paramMap.get('param')

//Agregar a tabla un boton para eliminar alumnos
//Mostrar alumno va a un formulario de edición (con edicion posible)

//--------------------------Form Groups------------------------------------//
/*
Using @angular/forms when you use a <form> tag it automatically creates a FormGroup.

For every contained ngModel tagged <input> it will create a FormControl and add it into the FormGroup created above; this FormControl will be named into the FormGroup using attribute name.

Example:

<form #f="ngForm">
    <input type="text" [(ngModel)]="firstFieldVariable" name="firstField">
    <span>{{ f.controls['firstField']?.value }}</span>
</form>
Said this, the answer to your question follows.

When you mark it as standalone: true this will not happen (it will not be added to the FormGroup).
ex: <input type="text" [(ngModel)]="firstFieldVariable" [ngModelOptions]="{standalone: true}">
*/
