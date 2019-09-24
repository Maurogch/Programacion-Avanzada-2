class Item {
    constructor(name, price) {
        this.name = name
        this.price = price
    }

    toString() {
        return `{name:${this.name},price:${this.price}}`
    }
}

class Cart {
    constructor(items = []) {
        this.items = items
    }

    total() {
        let total = 0
        this.items.forEach(i => total += i.price)
        return total
    }

    toString() {
        return `[${this.items.join(",")}]`
    }
}

const cart = new Cart([
    new Item("P1", 100),
    new Item("P2", 49.99),
    new Item("P3", 30)
])

console.log(cart.total())

console.log(cart.toString())
