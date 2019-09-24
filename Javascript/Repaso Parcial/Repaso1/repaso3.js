class Persona {
    constructor(nombre,apellido,edad){
        this._nombre = nombre;
        this._apellido = apellido;
        this._edad = edad;
    }

    set nombre(nombre) {
        this._nombre = nombre;
    }

    get nombre() {
        return this._nombre;
    }

    set apellido(apellido) {
        this._apellido = apellido;
    }

    get apellido() {
        return this._apellido;
    }

    set edad(edad) {
        this._edad = edad;
    }

    get edad() {
        return this._edad;
    }
}

var array = [new Persona('juan','perez','59'),
            new Persona('alejandro','munes','25'),
            new Persona('carlos','vivo','79'),
            new Persona('ivan','lala','12')];

console.log('array desordenado: ', array);

array.sort((a,b)=>{return (a.edad).localeCompare(b.edad)});

console.log('array ordenado: ', array);