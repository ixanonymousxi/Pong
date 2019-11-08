// JavaScript Document


//Ball variables

var $ball = $("#ball");

var ballProp = {
	position: {x:0,y:0},
	velocity: {x:0,y:0},
	acceleration: {x:0,y:0}
	};



//Move function

function moveObject(objectProp, object){
	
	objectProp.velocity.x += objectProp.acceleration.x;
	objectProp.velocity.y += objectProp.acceleration.y;
	
	objectProp.position.x += objectProp.velocity.x;
	objectProp.position.y += objectProp.velocity.y;
	
	object.css({"left": objectProp.position.x + "px", "top": objectProp.position.y + "px"});
	
	};
	
	
//DeBug

var $debugP1 = $("<p>");
$debugP1.appendTo("#debug");
$debugP1.text( "left: " + $ball.css("left") + " " + " top: " + $ball.css("top"));

