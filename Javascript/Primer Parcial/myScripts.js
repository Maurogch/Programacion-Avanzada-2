//var clientsInTable = [];
var localClients = [];
var sortState = 0;
//var pagination = 0;

window.onload = () => {
    loadClients();
}

function sortTable(){
    if(sortState === 1){
        localClients.sort((a,b)=>{return (a.lastName + ' ' + a.firstName).toString().localeCompare(b.lastName + ' ' + b.firstName)});
        sortState = 0;
        document.getElementById('NameArrow').classList.remove("fa-sort-up");
        document.getElementById('NameArrow').classList.add("fa-sort-down");
    }else{
        localClients.sort((a,b)=>{return (b.lastName + ' ' + b.firstName).toString().localeCompare(a.lastName + ' ' + a.firstName)});
        sortState = 1
        document.getElementById('NameArrow').classList.remove("fa-sort-down");
        document.getElementById('NameArrow').classList.add("fa-sort-up");
    }

    loadTable();
}

function loadTable(start = 0, end = 9){
    //  clientsInTable = clients.slice(start,end);
    var table = document.getElementById('tablebody');
    table.innerHTML = '';

    localClients.forEach(client => {
        var row = table.insertRow();
        var cell1 = row.insertCell();
        cell1.innerHTML = client.clientId;
        var cell2 = row.insertCell();
        cell2.innerHTML = client.firstName + ' ' + client.lastName;
        var cell3 = row.insertCell();
        cell3.innerHTML = client.email;
        var cell4 = row.insertCell();
        cell4.innerHTML = client.account.balance;
        var cell5 = row.insertCell();
        cell5.innerHTML = pharseDate(client.account.lastOperationDate);
    });
}

function pharseDate(input) {
    let options = {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};
    let date = new Date(input);
    return date.toLocaleDateString('es-US', options);
}

function sendInformation(){
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var email = document.getElementById('email').value;
    var balance = document.getElementById('balance').value;
    
    if (firstName == '' || lastName == '' || email == '' || balance == '') {
    document.getElementById('form').reportValidity();
    return;
    }

    addClient(firstName,lastName,email,balance);
}

async function loadClients(){
    let clients;
    let accounts;
    let completeArr = [];

    await promise('GET', 'http://avanzada2-parcial1.herokuapp.com/api/clients', 'json').then((result) => {
        clients = result;
    }).catch((err) => {
        console.log(err);
    });

    await promise('GET', 'http://avanzada2-parcial1.herokuapp.com/api/accounts', 'json').then((result) => {
        accounts = result;
    }).catch((err) => {
        console.log(err);
    }); 


    clients.forEach(client => {
        let account = new Account();
        accounts.forEach(acc => {
            if(acc.id === client.account_id){
                account = new Account(acc.id, acc.balance, acc.last_operation_date);
            }
        });

        completeArr.push(new Client(client.id, account, client.last_name, client.first_name, client.email));
    });
    completeArr.sort((a,b)=>{return (a.lastName + ' ' + a.firstName).toString().localeCompare(b.lastName + ' ' + b.firstName)});
    localClients = completeArr;
    loadTable();
}

async function addClient(firstName,lastName,email,balance){
    let clientId;
    let clientUrl = 'http://avanzada2-parcial1.herokuapp.com/api/clients?first_name=' + firstName
        + '&last_name=' + lastName
        + '&email=' + email;
    
    await promise('POST', clientUrl, 'json').then((result) => {
        clientId = result.id;
    }).catch((err) => {
        alert(err);
    console.log(err);
    });

    let accountUrl = 'http://avanzada2-parcial1.herokuapp.com/api/accounts?client_id=' + clientId
        + '&balance=' + balance;

    await promise('POST', accountUrl, 'json').then((result) => {
        alert('Cliente agregado exitosamente');
    }).catch((err) => {
    console.log(err);
    });
}

function promise(method, url, dataType = 'json') {
    return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();

        request.open(method,url);

        request.responseType = dataType;

        request.onload = function () {
            if (request.status == 200) {
                resolve(request.response);
            } else {
                reject(request.response.message);
            }
        };

        request.onerror = function () {
            reject('Hubo un problema de conexión');
        };

        request.send();
    });
}


/*-------CLIENT CLASS--------*/
class Client {
    constructor(clientId,account,lastName,firstName,email){
        this._clientId = clientId;
        this._account = account;
        this._lastName = lastName;
        this._firstName = firstName;
        this._email = email;
    }

    method() {
        
    }

    set clientId(clientId) {
        this._clientId = clientId;
    }

    get clientId() {
        return this._clientId;
    }

    set account(account) {
        this._account = account;
    }

    get account() {
        return this._account;
    }

    set lastName(lastName) {
        this._lastName = lastName;
    }

    get lastName() {
        return this._lastName;
    }

    set firstName(firstName) {
        this._firstName = firstName;
    }

    get firstName() {
        return this._firstName;
    }

    set email(email) {
        this._email = email;
    }

    get email() {
        return this._email;
    }
}

/*-------ACCOUNT CLASS--------*/
class Account {
    constructor(accountId,balance = 0,lastOperationDate=0){
        this._accountId = accountId;
        this._balance = balance;
        this._lastOperationDate = lastOperationDate;
    }

    method() {
        
    }

    set accountId(accountId) {
        this._accountId = accountId;
    }

    get accountId() {
        return this._accountId;
    }

    set balance(balance) {
        this._balance = balance;
    }

    get balance() {
        return this._balance;
    }

    set lastOperationDate(lastOperationDate) {
        this._lastOperationDate = lastOperationDate;
    }

    get lastOperationDate() {
        return this._lastOperationDate;
    }
}