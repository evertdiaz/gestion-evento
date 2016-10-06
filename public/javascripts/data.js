// Hacer el GET como una funcion aparte
// Validar cuando haya datos, cosa que si los hay se elimina y vuelve a llenar cuando se haga
// alguna accion del CRUD
$('document').ready(function() {
  var dat = []
  // Llenar Datos en la tabla
  $.get('/asistentes', function(data) {
    data = data.map(obj => {
      delete obj["__v"]
      delete obj["_id"]
      return obj
    })
    dat = data
    var len = data.length
    var txt = ""
    if(len > 0){
        for(var i=0;i<len;i++){
            
            if(data[i].dni){
              txt += `<tr>
              <td>${data[i].nombres}</td>
              <td>${data[i].apellidos}</td>
              <td>${data[i].dni}</td>
              <td>${data[i].cel}</td>
              <td>${data[i].pago}</td>
              <td> <button class="btn-edit" id="edt${i}">Editar</button> </td>
              <td> <button class="btn-confirm" id="cpg${i}">Confirmar Pago</button> </td>
              <td> <button class="btn-delete" id="elm${i}">Eliminar</button> </td>
              </tr>`
            }
        }
        if(txt != ""){
            $("#registro").append(txt)
        }
    }
    // Estos botones muestran un problema. Si se declaran fuera de este bucle no funcionan
    // ya que no existen antes que se ejecute la funcion de GET, al ponerlos dentro del bucle
    // se espera a que termine la creación y luego recien se crea el listener aca abajo.
    // NOTA-> CORREGIR

    // Trigger de botones Editar
    // Se manejará con sus indices de array y su ID, entonce el primer boton: #edt0
    // Se manejará con el JSON incluido en dat[0] Para esto sacamos la ultima letra
    // del ID de $this, la metemos en i y la usamos con dat[i] luego modificamos las 
    // Areas necesarias en frontend con un formulario como el de registro pero llenado
    // previamente con el JSON actual dat[i] luego al confirmar la edicion
    // obtener la nueva data al igual que el script de registro
    // y las mandamos por PUT al api/editar o confirm o delete
    $('#registro .btn-edit').click(function() {
      alert('Hola soy un boton Edit')
      // Crear un Endpoint con PUT en el backend para manejar la edicion
      // Se trabajará con el /api/edit
      // Luego actualizar la tabla con ActualizarTabla(dat)
    })
    // Trigger de botones Confirmar Pago
    $('#registro .btn-confirm').click(function() {
      alert('Hola soy un boton Confirmar')
      // Crear un endpoint con PUT en backend para manejar edicion de pago a true
      // Se trabajará con el /api/confirm, method PUT
      // Luego actualizar la tabla con ActualizarTabla(dat)
    })
    // Trigger de botones Borrar
    $('#registro .btn-delete').click(function() {
      alert('Hola soy un boton Delete')
      // Crear endpoint para borrado
      // Se trabajará con el /api/delete, method DELETE
      // Luego actualizar la tabla con ActualizarTabla(dat)
    })
  })

  // Trigger para generar Excel
  $('#excel').click(function() {
    if(dat == '')
        return;
    // Funcion para Generar Excel
    JSONToCSVConvertor(dat, "Reporte de Asistentes", true);
  });

  
})

function ActualizarTabla(dat) {
  // Añadir el borrado de la data actual de la tabla

  $.get('/asistentes', function(data) {
    dat = data
    var len = data.length
    var txt = ""
    if(len > 0){
        for(var i=0;i<len;i++){
            if(data[i].dni){
              txt += `<tr>
              <td>${data[i].nombres}</td>
              <td>${data[i].apellidos}</td>
              <td>${data[i].dni}</td>
              <td>${data[i].cel}</td>
              <td>${data[i].pago}</td>
              <td> <button class="btn-edit" id="edt${i}">Editar</button> </td>
              <td> <button class="btn-confirm" id="cpg${i}">Confirmar Pago</button> </td>
              <td> <button class="btn-delete" id="elm${i}">Eliminar</button> </td>
              </tr>`
            }
        }
        if(txt != ""){
            $("#registro").append(txt)
        }
    }
  })
}

// Funcion para generación de Excel

// NOTA: Este script genera un excel sacando la data automaticamente de cómo está en la BD
// También se inserta el _v y el ObjectId, ARREGLAR ESTO, que NO se genere.
// Puede ser eliminando SIEMPRE estos dos apartados de la variable dat
// que es la que contiene al JSON recibido por GET.
function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    
    var CSV = '';    
    //Set Report title in first row or line
    
    CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";
        
        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {
            
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);
        
        //append Label row with line break
        CSV += row + '\r\n';
    }
    
    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);
        
        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {        
        alert("Invalid data");
        return;
    }   
    
    //Generate a file name
    var fileName = "MyReport_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
    
    //Initialize file format you want csv or xls
    var uri = 'data:text/xls;charset=utf-8,' + escape(CSV);
    
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    
    
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = uri;
    
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".xls";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}