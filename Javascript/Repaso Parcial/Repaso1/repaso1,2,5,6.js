//Remove duplicates from array
function removeDuplicates (arr){
    return arr.filter((v,i) => arr.indexOf(v) === i);
}

//Determinar año biciesto en un array
//divisible por 4 y no divisible por 100 a menos que sea divisible por 400
var arr = [1992,2000,1900,1991];

arr.forEach(element => {
   if (element % 4 === 0 && (element % 100 !== 0 || element % 400 === 0)){
     console.log(element + ' es biciesto')
   }else{
     console.log(element + ' no es biciesto')
   }
});

//validar formulario
//inputs deben estar dentro de un form con onsubmit="enviarInformacion(); return false;"
//button debe de ser de type="submit"
function enviarInformacion(){
    var author = document.getElementById('author').value;
    var text = document.getElementById('text').value;
    
    if (author == '' || text == '') {
    document.getElementById('form').reportValidity();
    return;
    }
}

//crear tabla a vase de dos imput columans y filas, imagino que validación anterior existe (>=0)
function generate() {
  const rows = parseInt(document.getElementById("rowsInput").value);
  const columns = parseInt(document.getElementById("columnsInput").value);
  const table = document.getElementById("table");

  table.innerHTML = ''; //reset table
  for (let i = 0; i < rows; i++) { //add rows
    const row = table.insertRow(-1)
    for (let a = 0; a < columns; a++) { //add columns for each row
        const cell = row.insertCell(-1)
        cell.innerHTML = "cell"
    }
  }
}

//Devolver via dos promesas en secuencia un array de string capitalizado en la primer letra y ordenado alfabeticamente
arr = [
  'ghola',
  'apalabra',
  'zotrapalabra',
  'dstonks'
]

function capitalizeString(arr) {
return new Promise((resolve, reject) => {
  if (Array.isArray(arr)) {
    for (i in arr) {
      arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1);;
    }
    resolve(arr);
  } else {
    reject(Error('Variable is not a string'));
  }
});
}

function sortString(arr) {
return new Promise((resolve, reject) => {
  if (Array.isArray(arr)) {
    arr.sort((a, b) => { return (a).localeCompare(b) });
    resolve(arr);
  } else {
    reject(Error('Variable is not a string'));
  }
});
}

async function secuencia(arr) {
await capitalizeString(arr).then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err);
});

await sortString(arr).then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err);
});
}

secuencia(arr)


