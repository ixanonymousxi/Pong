// JavaScript Document

//Game container variables

var $game = $("#game-box");
var gameEdgeX = parseInt($game.css("width"));
var gameEdgeY = parseInt($game.css("height"));


//Ball variables

var $ball = $("#ball");

var ballProp = {
	position: {x:parseInt($ball.css("left")), y:parseInt($ball.css("top"))},
	velocity: {x:2,y:2},
	acceleration: {x:0,y:0}
	};



//Move function

function moveObject(objectProp,object){
	
	objectProp.velocity.x += objectProp.acceleration.x;
	objectProp.velocity.y += objectProp.acceleration.y;
	
	objectProp.position.x += objectProp.velocity.x;
	objectProp.position.y += objectProp.velocity.y;
	
	objectProp.acceleration.x *= 0;
	objectProp.acceleration.y *= 0;
	
	//Check Edges
	
	if (objectProp.position.x > gameEdgeX - 35 || objectProp.position.x < 0){
		objectProp.velocity.x *= -1;
	}
	
	if (objectProp.position.y > gameEdgeY - 35 || objectProp.position.y < 0){
		objectProp.velocity.y *= -1;
	}
	
	object.css({"left": objectProp.position.x + "px", "top": objectProp.position.y + "px"});
	
	}
	

//DeBug

var $debugP1 = $("<p>");
$debugP1.appendTo("#debug");

var $debugP2 = $("<p>");
$debugP2.appendTo("#debug");



//Animate

function startGame(){
	
	moveObject(ballProp, $ball);
	
	$debugP1.text( "left: " + $ball.css("left") + " " + " top: " + $ball.css("top"));
	$debugP2.text("box right: " + gameEdgeX + " " + "box bottom: " + gameEdgeY);
	
	requestAnimationFrame(startGame);
}

startGame();

