function onLoadTable(){
    var t = $('#dtTable').DataTable();
    t.row.add().draw( false ); /*add div with loader, reasearch how to put colspan 6*/

    apiRequest().then((response) => {
        hideLoader();
        loadTable(response);
    }).catch((err) => {
        console.log(err);
    });
}

function apiRequest(){
    return new Promise(function(resolve, reject){
        var request = new XMLHttpRequest();
        request.open('GET', 'https://utn-2019-avanzada2-tp5.herokuapp.com/records?from=0&to=50');
        request.responseType = 'json';

        request.onload = function(){
            if(request.status == 200){
                resolve(request.response)
            }else{
                reject(Error('Data load error'));
            }
        }

        request.onerror = function(){
            reject(Error('There was a network problem'));
        }

        request.send();
    });
}

function loadTable(rows){
    var t = $('#dtTable').DataTable();
    rows.forEach(item => {
        /*var table = document.getElementById("dtTable");
        var row = table.insertRow(1);

        var cell1 = row.insertCell();
        var cell2 = row.insertCell();
        var cell3 = row.insertCell();
        var cell4 = row.insertCell();
        var cell5 = row.insertCell();
        var cell6 = row.insertCell();

        cell1.innerHTML = item.id;
        cell2.innerHTML = item.first_name;
        cell3.innerHTML = item.last_name;
        cell4.innerHTML = item.email;
        cell5.innerHTML = item.gender;
        cell6.innerHTML = item.last_connected_ip;*/

        t.row.add([item.id,
            item.first_name,
            item.last_name,
            item.email,
            item.gender,
            item.last_connected_ip]).draw( false );
        
    });
}

function hideLoader(){
    var x = document.getElementById("loader");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
}