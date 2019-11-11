$(document).ready(function() {
    // Insert your JQuery code for the menu
 
 //montrer--cacher regle.
 $("#regle").click(function(e){
 	e.preventDefault;
    $("#li").slideToggle("slow");
  });

//redirection vers game.html
$("#start-game").click(function(){
	$(location).attr('href',"game.html");
})
    

});
