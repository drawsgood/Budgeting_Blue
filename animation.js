$(document).ready(function(){

$("#hideshowForm").hide();

$("#openBTN").click(function(){
	$("#collapseMe").slideToggle("fast");
    $("#hideshowForm").slideToggle("fast");
});

});