$(document).ready(function(){

$("#hideshowForm").hide();

var myToggs = false;
	console.log(myToggs);

$("#openBTN").click(function(){

	if (myToggs == false) {
		$("#openBTN").addClass( "activatedStyling" );
		$("#openBTN").html("<i class='fa fa-close fa-large' aria-hidden='true'></i>");
		myToggs = true;
		console.log(myToggs);
	} else {
		$("#openBTN").removeClass( "activatedStyling" );
		$("#openBTN").html("<i style='margin-top: 14px;' class='fa fa-plus fa-large' aria-hidden='true'></i>");
		myToggs = false;
		console.log(myToggs);
	}

	$("#collapseMe").slideToggle("fast");
    $("#hideshowForm").slideToggle("fast");
});

});