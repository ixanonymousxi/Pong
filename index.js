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

var $debugP5 = $("<p>");
$debugP5.appendTo("#debug");

var $debugP6 = $("<p>");
$debugP6.appendTo("#debug");

var $debugP7 = $("<p>");
$debugP7.appendTo("#debug");


//Game variables

var $game = $("#game-box");
var gameEdgeX;
var gameEdgeY;
var runAnimation = true;
var gameStart = false;
var frames = 0;
var timer;


//Ball variables

var $ball = $("#ball");
var ballEdge = parseInt($ball.css("height"));
var ballStartX = parseInt($ball.css("left"));
var ballStartY = parseInt($ball.css("top"));

var ballProp = {
	position: {x:parseInt($ball.css("left")), y:parseInt($ball.css("top"))},
	velocity: {x:0,y:0},
	acceleration: {x:0,y:0}
	};


//Paddle variables

var $paddleL = $("#pLeft");
var $paddleR = $("#pRight");
var paddleEdgeY;
var paddleEdgeX;
var paddleLStartY = parseInt($paddleL.css("top"));
var paddleRStartY = parseInt($paddleR.css("top"));

var paddleLProp = {
	position: {x:parseInt($paddleL.css("left")), y:parseInt($paddleL.css("top"))},
	velocity: {x:0,y:0},
	acceleration: {x:0,y:0}
	};
	
var paddleRProp = {
	position: {x:parseInt($paddleR.css("left")), y:parseInt($paddleR.css("top"))},
	velocity: {x:0,y:0},
	acceleration: {x:0,y:0}
	};
	


//Reset function

function reset(){
	gameStart = false;
	ballProp.position.x = ballStartX;
	ballProp.position.y = ballStartY;
	ballProp.velocity.x = 0;
	ballProp.velocity.y = 0;
	paddleLProp.position.y = paddleLStartY;
	paddleRProp.position.y = paddleRStartY;
	runAnimation = true;
	}

	
//Left paddle movement checking for event listener
	
$(document).on("keydown",function(e){
		switch(e.keyCode){
			//Up arrow pressed
			case 38:
				if (!gameStart){
					ballProp.velocity.x = 3;
					ballProp.velocity.y = 3;
					gameStart = true;
					}
				if (paddleLProp.position.y > 0){
					paddleLProp.acceleration.y -= 3.5;
					}
			break;
				
			//Down arrow pressed
			case 40:
				if (!gameStart){
					ballProp.velocity.x = 3;
					ballProp.velocity.y = 3;
					gameStart = true;
					}
				if (paddleLProp.position.y < gameEdgeY - paddleEdgeY){
					paddleLProp.acceleration.y += 3.5;
					}
			break;
			
			//Space bar pressed
			case 32:
				if (!gameStart){
					ballProp.velocity.x = 3;
					ballProp.velocity.y = 3;
					gameStart = true;
					}
			break;
			}
			e.preventDefault();
		});	


//Move function

function moveObject(objectProp,object){
	
	//Game variable sets
	gameEdgeX = parseInt($game.css("width"));
	gameEdgeY = parseInt($game.css("height"));
	
	//Paddle variable sets
	
	paddleEdgeY = parseInt($paddleL.css("height"));
	paddleEdgeX = parseInt($paddleL.css("width"));
	
	
	//Right paddle movement
	
	if (objectProp === paddleRProp){
		
		if(ballProp.velocity.x > 0){
			
			if(ballProp.position.y + ballEdge <= objectProp.position.y + paddleEdgeY && 
			   ballProp.velocity.y < 0 && objectProp.position.y > 0){
				objectProp.acceleration.y -= 0.2;
				}
				
			if(ballProp.position.y >= objectProp.position.y  && 
			   ballProp.velocity.y > 0 && objectProp.position.y < gameEdgeY - paddleEdgeY ){
				objectProp.acceleration.y += 0.2;
				}
			}
			
		if(ballProp.velocity.x < 0){
			
			if(objectProp.position.y > (gameEdgeY*2)/5){
				objectProp.acceleration.y -= 0.5;
				}
				
			if(objectProp.position.y < (gameEdgeY*2)/5){
				objectProp.acceleration.y += 0.5;
				}
			}
		}
		
	
	//Move object
	
	objectProp.velocity.x += objectProp.acceleration.x;
	objectProp.velocity.y += objectProp.acceleration.y;
	
	objectProp.position.x += objectProp.velocity.x;
	objectProp.position.y += objectProp.velocity.y;
	
	objectProp.acceleration.x = 0;
	objectProp.acceleration.y = 0;
	
	
	// Slow down paddle
	
	if (objectProp === paddleLProp || objectProp === paddleRProp){
		objectProp.velocity.y *= 0.96;
	}
	
	
	//Check Edges
	
	if (objectProp.position.x > gameEdgeX - ((objectProp === ballProp) ? ballEdge : paddleEdgeY) || objectProp.position.x < 0){
		if(objectProp === ballProp){
			runAnimation = false;
			reset();
		}
		else{
			objectProp.velocity.x *= -1;
		}
	}
	
	if (objectProp.position.y < 0){
		objectProp.velocity.y *= (objectProp === ballProp) ? -1 : 0;
		objectProp.position.y = 0;
	}
	
	if (objectProp.position.y > gameEdgeY - ((objectProp === ballProp) ? ballEdge : paddleEdgeY)){
		objectProp.velocity.y *= (objectProp === ballProp) ? -1 : 0;
		if(objectProp === paddleLProp){
			objectProp.position.y = (gameEdgeY - paddleEdgeY);
		}
	}
	
	
	//Check if ball hits a paddle
			
	if (objectProp === ballProp){
		
		//Left paddle
		
		if((objectProp.position.x <= paddleLProp.position.x + paddleEdgeX) &&
		   (objectProp.position.y + ballEdge - 10 >= paddleLProp.position.y && 
		    objectProp.position.y <= paddleLProp.position.y + paddleEdgeY - 10)){
				objectProp.velocity.x *= -1;
				}
		
		//Right paddle
				
		if((objectProp.position.x + ballEdge >= paddleRProp.position.x &&
		    objectProp.position.x + ballEdge <= paddleRProp.position.x + 5) &&
		   (objectProp.position.y + ballEdge - 10 >= paddleRProp.position.y && 
		    objectProp.position.y <= paddleRProp.position.y + paddleEdgeY - 10)){
				objectProp.velocity.x *= -1;
				}
		
		
		}
	
	object.css({"left": objectProp.position.x + "px", "top": objectProp.position.y + "px"});
	
	}


//Animate

function game(){
	
	moveObject(ballProp, $ball);
	moveObject(paddleLProp, $paddleL);
	moveObject(paddleRProp, $paddleR);
	
	$debugP1.text( "ball x: " + $ball.css("left") + " " + " ball y: " + $ball.css("top"));
	$debugP2.text( "paddle x: " + parseInt($paddleL.css("left")) + " " + " paddle y: " + $paddleL.css("top"));
	$debugP3.text("box right: " + gameEdgeX + " " + "box bottom: " + gameEdgeY);
	
	if(runAnimation){
	requestAnimationFrame(game);
	}

}


game();

