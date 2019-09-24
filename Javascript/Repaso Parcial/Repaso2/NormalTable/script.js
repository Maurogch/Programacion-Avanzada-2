import {data} from './MOCK_DATA.js';
var localUsers = [];
var usersInTable = [];
var pagination = 0;

window.onload = () => {
    loadData().then((result) => {
        localUsers = result;
        loadTable(result);
    });

    document.getElementById('button').addEventListener("click", () => orderTable())
    document.getElementById('bnext').addEventListener("click", () => next())
    document.getElementById('bprev').addEventListener("click", () => prev())
}

function next(){
    pagination += 10;
    loadTable(localUsers, pagination, pagination+9);
}

function prev(){
    pagination -= 10;
    loadTable(localUsers, pagination, pagination+9);
}

function loadData(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data);
        },1000)
    });
}

function loadTable(users, start = 0, end = 9){
    usersInTable = users.slice(start,end);
    var table = document.getElementById('tablebody');
    table.innerHTML = '';

    usersInTable.forEach(user => {
        var row = table.insertRow();
        for (var key in user) {
            var cell = row.insertCell();
            cell.innerHTML = user[key];
        }
    });
}

function orderTable(){
    let key = document.getElementById('selectKey').value;
    let order = document.getElementById('selectOrder').value;

    if (order === 'asc'){
        usersInTable.sort((a,b)=>{return (a[key]).toString().localeCompare(b[key])});
    } else if(order === 'des'){
        usersInTable.sort((a,b)=>{return (b[key]).toString().localeCompare(a[key])});
    }
   
    loadTable(usersInTable);
}

