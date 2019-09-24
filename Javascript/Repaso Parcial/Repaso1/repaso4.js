class Item {
    constructor(nombre,precio){
        this._nombre = nombre;
        this._precio = precio;
    }

    toString() {
        return `Nombre: ${this._nombre}\nPrecio: ${this._precio}`;
    }

    set nombre(nombre) {
        this._nombre = nombre;
    }

    get nombre() {
        return this._nombre;
    }

    set precio(precio) {
        this._precio = precio;
    }

    get precio() {
        return this._precio;
    }
}

class Carrito {
    constructor(items = []) {
        this._items = items
    }

    agregarItem(item) {
        this._items.push(item);
    }

    toString() { 
        return `${this.items.join("\n\n")}`;
    }

    calcularPrecioTotal() {
        var total = 0;

        this._items.forEach(item => {
            total += item.precio;
        });

        return total;
    }

    set items(items) {
        this._items = items;
    }

    get items() {
        return this._items;
    }
}

var carrito = new Carrito();

carrito.agregarItem(new Item('Dentrifico', 14.50))
carrito.agregarItem(new Item('lavandina', 25.3))
carrito.agregarItem(new Item('detergente', 12.6))
carrito.agregarItem(new Item('desengrasante', 15.9))
carrito.agregarItem(new Item('mopa', 40))

console.log(carrito.calcularPrecioTotal());

console.log(carrito.toString())