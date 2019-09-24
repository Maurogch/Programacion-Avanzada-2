import { data } from "./MOCK_DATA.js"

$(document).ready( function () {
    $('#dtTable').DataTable();
} );

window.onload = () => {
    loadData().then((result) => {
        //console.log('result :', result);
        loadTable(result);
    });
}

function loadData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data)
        }, 1000)
    })
}

function loadTable(users){
    var t = $('#dtTable').DataTable();
    
    users.forEach(user => {
        t.row
            .add([
                user.id,
                user.first_name,
                user.last_name,
                user.email,
                user.dni
            ]).draw(false);
    });  
}