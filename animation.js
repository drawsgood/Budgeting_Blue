$(document).ready(function(){

$("#hideshowForm").hide();

var myToggs = false;
	console.log(myToggs);

$("#openBTN").click(function(){

//	if (myToggs == false) {
//		$("#openBTN").addClass( "activatedStyling" );
//		$(".centerIcon").fadeOut("fast");
//		$("#openBTN").html("<i class='fa fa-close fa-large' aria-hidden='true'></i>");
//		myToggs = true;
//		console.log(myToggs);
//	} else {
//		$("#openBTN").removeClass( "activatedStyling" );
//		$(".centerIcon").fadeIn();
//		$("#openBTN").html("<i style='margin-top: 14px;' class='fa fa-plus fa-large' aria-hidden='true'></i>");
//		myToggs = false;
//		console.log(myToggs);
//	}
	$(".centerIcon").fadeToggle();
    $(this).toggleClass('rotated activatedStyling');
	$("#collapseMe").slideToggle("fast");
    $("#hideshowForm").slideToggle("fast");
});

});