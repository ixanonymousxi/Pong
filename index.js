// JavaScript Document


//DeBug variables

var $debugP1 = $("<p>");
$debugP1.appendTo("#debug");

var $debugP2 = $("<p>");
$debugP2.appendTo("#debug");

var $debugP3 = $("<p>");
$debugP3.appendTo("#debug");

var $debugP4 = $("<p>");
$debugP4.appendTo("#debug");


//Game variables

var $game = $("#game-box");
var gameEdgeX;
var gameEdgeY;
var frames = 0;
var timer;


//Ball variables

var $ball = $("#ball");
var ballEdge = 35;

var ballProp = {
	position: {x:parseInt($ball.css("left")), y:parseInt($ball.css("top"))},
	velocity: {x:2,y:2},
	acceleration: {x:0,y:0}
	};


//Paddle variables

var $paddleL = $("#pLeft");
var $paddleR = $("#pRight");
var paddleEdge = 105;

var paddleLProp = {
	position: {x:parseInt($paddleL.css("left")), y:10},
	velocity: {x:0,y:0},
	acceleration: {x:0,y:0}
	};
	
var paddleRProp = {
	position: {x:parseInt($paddleR.css("left")), y:10},
	velocity: {x:0,y:0},
	acceleration: {x:0,y:0}
	};
	


	
//Paddle movement checking for event listener
	

$(document).on("keydown",function(e){
		switch(e.keyCode){
			//Up arrow pressed
			case 38:
			if (paddleLProp.position.y > 0){
			paddleLProp.acceleration.y -= 3.5;
			}
			break;
				
			//Down arrow pressed
			case 40:
			if (paddleLProp.position.y < gameEdgeY - paddleEdge)
			paddleLProp.acceleration.y += 3.5;
			break;
			}
		});
		



//Move function

function moveObject(objectProp,object){
	
	gameEdgeX = parseInt($game.css("width"));
	gameEdgeY = parseInt($game.css("height"));
	
	objectProp.velocity.x += objectProp.acceleration.x;
	objectProp.velocity.y += objectProp.acceleration.y;
	
	objectProp.position.x += objectProp.velocity.x;
	objectProp.position.y += objectProp.velocity.y;
	
	objectProp.acceleration.x = 0;
	objectProp.acceleration.y = 0;
	
	
	// Slow down paddle
	
	if (objectProp === paddleLProp){
		objectProp.velocity.y *= 0.96;
	}
	
	
	//Check Edges
	
	if (objectProp.position.x > gameEdgeX - ((objectProp === ballProp) ? ballEdge : paddleEdge) || objectProp.position.x < 0){
		objectProp.velocity.x *= -1;
	}
	
	if (objectProp.position.y < 0){
		objectProp.velocity.y *= (objectProp === ballProp) ? -1 : 0;
		objectProp.position.y = 0;
	}
	
	if (objectProp.position.y > gameEdgeY - ((objectProp === ballProp) ? ballEdge : paddleEdge)){
		objectProp.velocity.y *= (objectProp === ballProp) ? -1 : 0;
		if(objectProp === paddleLProp){
			objectProp.position.y = (gameEdgeY - paddleEdge);
		}
	}	
	
	
	object.css({"left": objectProp.position.x + "px", "top": objectProp.position.y + "px"});
	
	}



//Animate

function startGame(){
	
	moveObject(ballProp, $ball);
	moveObject(paddleLProp, $paddleL);
	moveObject(paddleRProp, $paddleR);
	frames++;
	timer = Math.round(frames/60);
	
	$debugP1.text( "left: " + $ball.css("left") + " " + " top: " + $ball.css("top"));
	$debugP2.text("box right: " + gameEdgeX + " " + "box bottom: " + gameEdgeY);
	$debugP3.text("paddle accel: " + paddleLProp.acceleration.y + " " + "paddle vel: " + paddleLProp.velocity.y);
	$debugP4.text("frames: " + frames + " " + "timer: " + timer);
	
	requestAnimationFrame(startGame);
}

startGame();

