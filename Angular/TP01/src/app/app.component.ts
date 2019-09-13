import { Component } from '@angular/core';
import { Article } from './model/article';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Lista de productos';
  articles = [];

  constructor(){
    let article1 = new Article();
    let article2 = new Article();
    let article3 = new Article();
    let article4 = new Article();
    let article5 = new Article();
    
    article1.id = 1;
    article2.id = 2;
    article3.id = 3;
    article4.id = 4;
    article5.id = 5;

    article1.name = "Smart TV Philips";
    article2.name = "Aire Acondicionado Slip Midea";
    article3.name = "El Caloventor Axel 1900W";
    article4.name = "Termotanque a Gas Señoral";
    article5.name = "Celular libre Motorola G7";

    article1.description = "Televisor LED Full HD 43";
    article2.description = "Cuenta con 3250 W Frío y 3050 W Calor , con eficiencia energética A (frío) y C (calefacción)";
    article3.description = "Cuenta con 3 niveles de potencia, corte por sobre temperatura, motor silencioso, fusible térmico de protección y termostato regulable";
    article4.description = "Termotanque a Gas con piloto analizador; se puede apoyar o colgar. Producto de alta eficiencia certificado bajo normativa";
    article5.description = "El Celular libre Motorola G7 Power ice violet tiene una poderosa batería de 5.000 mAh, diseñada para durar hasta 55 horas con una sola carga";

    article1.price = 22000;
    article2.price = 30000;
    article3.price = 900;
    article4.price = 10000;
    article5.price = 15000;

    article1.stock = 100;
    article2.stock = 100;
    article3.stock = 100;
    article4.stock = 100;
    article5.stock = 100;

    article1.img = "../assets/art1.jpg";
    article2.img = "../assets/art2.jpg";
    article3.img = "../assets/art3.jpg";
    article4.img = "../assets/art4.jpg";
    article5.img = "../assets/art5.jpg";

    this.articles.push(article1);
    this.articles.push(article2);
    this.articles.push(article3);
    this.articles.push(article4);
    this.articles.push(article5);
  }
}
