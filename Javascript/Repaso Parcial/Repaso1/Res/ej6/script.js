function generate() {
    const rows = parseInt(document.getElementById("rowsInput").value)
    const columns = parseInt(document.getElementById("columnsInput").value)

    if (Number.isNaN(rows) || Number.isNaN(columns))
        window.alert("Invalid input")
    else {
        const table = document.getElementById("table")
        while (table.firstChild) table.removeChild(table.firstChild)
        let i;
        for (i = 0; i < rows; i++) {
            const row = table.insertRow(-1)
            createColumns(row, columns)
        }
    }
}

function createColumns(row, total) {
    let i;
    for (i = 0; i < total; i++) {
        const cell = row.insertCell(-1)
        cell.innerHTML = "cell"
    }
}
