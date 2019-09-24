const years = [1992, 2000, 1900]

function isLeapYear(year) {
    if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0))
        console.log(`${year} is a leap year`)
    else
        console.log(`${year} is not a leap year`)

}

years.forEach(y => isLeapYear(y))
