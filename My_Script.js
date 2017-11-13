var finalNum = 50;
$(document).ready(function() {
	$.getJSON("current.json?"+Math.random(), function(obj) {
		var myVal = obj.startingValue;
				$.each(obj.entries, function(key, value) {
					finalNum -= Number(value.amount);
					$('#list').append("<tr class='myBorderColor'><td style='border: none;' class='myBGColor'>$"+value.amount+"</td><td style='border: none; text-align: right' class='myBGColor'>"+value.category+"</td>");
				});

				$('#total').append("<h1 style='font-size: 60pt; font-weight: 200;' class='text-center'>$"+myVal.fart.toFixed(2)+"</h1>");		
				console.log(myVal.fart.toFixed(2));		

				console.log(finalNum.toFixed(2));
				$('input[id=balance]').attr('value', finalNum.toFixed(2));
	});
});