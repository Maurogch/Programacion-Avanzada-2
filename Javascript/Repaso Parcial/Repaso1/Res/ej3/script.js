class Person {
    constructor(name, surname, age) {
        this.name = name
        this.surname = surname
        this.age = age
    }

    toString() {
        return `{name:${this.name},surname:${this.surname},age:${this.age}}`
    }
}

const people = [
    new Person("Johnny", "Roe", 33),
    new Person("John", "Doe", 21),
    new Person("Jane", "Doe", 18)
]

people.sort((a, b) => a.age - b.age)
    .forEach(p => console.log(p.toString()))
