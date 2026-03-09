var finalNum = 150;
$(document).ready(function() {
	$.getJSON("current.json?"+Math.random(), function(obj) {
		var myVal = obj.startingValue;
				$.each(obj.entries, function(key, value) {
					finalNum -= Number(value.amount);
					$('#list').append(
						"<tr class='myBorderColor'>" +
						"<td style='border:none' class='myBGColor'>$"+value.amount+"</td>" +
						"<td style='border:none;text-align:right' class='myBGColor'>"+value.category+"</td>" +
						"<td><button class='deleteBtn' data-id='"+key+"'>Delete</button></td>" +
						"</tr>"
						);
				});

				$('#total').append("<h1 style='font-size: 60pt; font-weight: 200;' class='text-center'>$"+myVal.fart.toFixed(2)+"</h1>");		
				console.log(myVal.fart.toFixed(2));		

				console.log(finalNum.toFixed(2));
				$('input[id=balance]').attr('value', finalNum.toFixed(2));
	});
});

$(document).on("click", ".deleteBtn", function(){

	var index = $(this).data("id");

	$.post("delete.php", { index: index }, function(){
		location.reload();
	});

});