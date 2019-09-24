//Bootstrap
//<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
//<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
//<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
//<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

//--Datatables
//<link rel="stylesheet" href="//cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css">
//<script src="//cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>

//Necesary
$(document).ready( function () {
    $('#dtTable').DataTable();
    //$('.dataTables_length').addClass('bs-select');
} );

//html
//<table id="dtTable" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
// <thead>
//   <tr>
//     <th class="th-sm">Id</th>
// </thead>
// <tfoot>
//   <tr>
//     <th>Id</th>
// </tfoot>
//</table>

//add row
var t = $('#dtTable').DataTable();
t.row
      .add(['value','value2','valueN']).draw(false);
//delete row (with button)
//needs column with button calling this function (use in add row)
//'<button onclick="deleteRow(this)">Delete</button>'
function deleteRow(row){
    var t = $('#dtTable').DataTable();
    t.row( $(row).parents('tr') )
     .remove()
     .draw();
}

//--Simple table
//add row
var table = document.getElementById("dtTable");
var row = table.insertRow(1);
var cell1 = row.insertCell();
var cellN = row.insertCell();
cell1.innerHTML = 'dato1';
cell2.innerHTML = 'datoN';
//delete row (with button)
//same as before needs column with button calling function
function deleteRow(row) {
    var i = row.parentNode.parentNode.rowIndex;
    document.getElementById("dtTable").deleteRow(i);
}
