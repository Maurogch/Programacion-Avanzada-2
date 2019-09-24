import { data } from "./MOCK_DATA.js"

function loadData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data)
        }, 1000)
    })
}

function renderTable(data) {
    const tbody = document.getElementById("table").getElementsByTagName("tbody")[0]
    while (tbody.firstChild) tbody.removeChild(tbody.firstChild)

    data.forEach(e => {
        const row = tbody.insertRow(-1)
        const id = row.insertCell(-1)
        id.innerHTML = e.id
        const fname = row.insertCell(-1)
        fname.innerHTML = e.first_name
        const lname = row.insertCell(-1)
        lname.innerHTML = e.last_name
        const email = row.insertCell(-1)
        email.innerHTML = e.email
        const dni = row.insertCell(-1)
        dni.innerHTML = e.dni
    })
}

function sort() {
    loadData()
        .then(r => {
            const fieldOption = document.getElementById("field")
            const field = fieldOption.options[fieldOption.selectedIndex].value

            const sortOption = document.getElementById("sort")
            const sort = sortOption.options[sortOption.selectedIndex].value

            const result = sortData(r, field, sort)
            renderTable(result)
        })
}

function sortData(data, field, option) {
    if (option === "asc")
        return data.sort((a, b) => (a[field] > b[field]) ? 1 : ((b[field] > a[field]) ? -1 : 0))
    else if (option === "desc")
        return data.sort((a, b) => (a[field] < b[field]) ? 1 : ((b[field] < a[field]) ? -1 : 0))
    else
        window.alert("Invalid sorting option")
}

window.onload = () => {
    const sortBtn = document.getElementById("sortBtn")
    sortBtn.addEventListener("click", () => sort())
    loadData().then(r => renderTable(r))
}