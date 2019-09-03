var count = 0;

function insertRow(){
  var table = document.getElementsByClassName("myTable")[0];
  var row = table.insertRow();

  var cell1 = row.insertCell();
  var cell2 = row.insertCell();

  cell1.innerHTML = "columna" + count;
  cell2.innerHTML = "columna" + (count + 1);

  count++;
}

function deleteRow(){
  var table = document.getElementsByClassName("myTable")[0];
  table.deleteRow(-1);
}