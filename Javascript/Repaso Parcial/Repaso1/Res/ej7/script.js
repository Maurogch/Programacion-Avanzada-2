function isNotString(input) {
    return typeof input !== "string"
}

function capitalize(arr) {
    return new Promise((resolve, reject) => {
        console.log("Capitalizing Firt Letter...")
        arr.forEach(e => {
            if (isNotString(e)) {
                reject(`Not all elements are strings ${e}`)
            }
        })
        resolve(arr.map(e => e.charAt(0).toUpperCase() + e.substring(1)))
    })
}

function sort(arr) {
    return new Promise((resolve, reject) => {
        console.log("Sorting...")
        arr.forEach(e => {
            if (isNotString(e)) {
                reject(`Not all elements are strings ${e}`)
            }
        })
        resolve(arr.sort())
    })
}

async function process() {
    const arr = ["banana", "orange", "apple", "mango", "blackberry", "cherry", "kiwi", "coconut"]

    console.log(`Initial array: ${arr}`)

    const capitalized = await capitalize(arr)

    console.log(`Capitalized: ${capitalized}`)

    const sorted = await sort(capitalized)

    console.log(`Sorted: ${sorted}`)
}

process()