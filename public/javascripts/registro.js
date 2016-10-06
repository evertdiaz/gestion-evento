
$('#envio').on('click', function() {
	var $data = $('#registro input')
	var data = $.map($data, obj => obj.value)
  if(data[4] == "false") data[4]=false
    else if(data[4] == "true") data[4]=true
	var sendInfo = {
           nombres: data[0],
           apellidos: data[1],
           dni: data[2],
           cel: data[3],
           pago: data[4]
        }
    $.post('/api/registro', sendInfo, function(data, textStatus, jqXHR) {
    	if(textStatus) {
    		alert('Todo ok')
    		location.href = '/'
    	} 
    		else alert('Todo MAL')

    })
})

