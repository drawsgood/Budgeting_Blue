$(document).ready(function(){

$("#hideshowForm").hide();

var myToggs = false;
	console.log(myToggs);

$("#openBTN").click(function(){

	if (myToggs == false) {
		$("#openBTN").html("<i style='background-color: #7cbbf0; color: #fff;' class='fa fa-close fa-large' aria-hidden='true'></i>");
		myToggs = true;
		console.log(myToggs);
	} else {
		$("#openBTN").html("<i style='margin-top: 14px;' class='fa fa-plus fa-large' aria-hidden='true'></i>");
		myToggs = false;
		console.log(myToggs);
	}

	$("#collapseMe").slideToggle("fast");
    $("#hideshowForm").slideToggle("fast");
});

});