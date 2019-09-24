const numbers = [1, 2, 2, 4, 5, 4, 7, 8, 7, 3, 6]

const filtered = numbers.reduce((total, currentValue) => total.includes(currentValue) ? total : [...total, currentValue], [])

console.log(filtered)
