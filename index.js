// JavaScript Document


//Game variables

var $game = $("#game-box");
var gameEdgeX;
var gameEdgeY;
var runAnimation = true;
var gameStart = false;
var frames = 0;
var timer;

var scoreHTracker = 0;
var $scoreH = $("<p>");
$scoreH.addClass("scores");
$scoreH.css("left", "22%");
$scoreH.text(scoreHTracker);
$scoreH.appendTo($game);

var scoreCTracker = 0;
var $scoreC = $("<p>");
$scoreC.addClass("scores");
$scoreC.css("left", "72%");
$scoreC.text(scoreCTracker);
$scoreC.appendTo($game);

var $winLose = $("<p>");
$winLose.addClass("winLose");
$winLose.appendTo($game);

var $playAgain = $("<button>");
$playAgain.addClass("playAgain");
$playAgain.text("Play Again?");
$playAgain.appendTo($game);
$playAgain.hide();

//Variables determining starting direction of the ball

var randomNumX = Math.floor(Math.random() * 2);
var randomNumY = Math.floor(Math.random() * 2);
var startDirX = randomNumX === 0 ? 1 : -1;
var startDirY = randomNumY === 0 ? 1 : -1;

//Ball variables

var $ball = $("#ball");
var ballEdge = parseInt($ball.css("height"));
var ballStartX = parseInt($ball.css("left"));
var ballStartY = parseInt($ball.css("top"));
var ballSpeed = (parseInt($game.css("width")) < 845) ? 3 : 4;

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
var paddleRAccel = (parseInt($game.css("width")) < 845) ? 0.2 : 0.4;

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
	
	randomNumX = Math.floor(Math.random() * 2);
	randomNumY = Math.floor(Math.random() * 2);
	startDirX = randomNumX === 0 ? 1 : -1;
	startDirY = randomNumY === 0 ? 1 : -1;

	
	if(scoreHTracker >= 3 || scoreCTracker >= 3){
		scoreHTracker = 0;
		scoreCTracker = 0;
		$scoreH.text(scoreHTracker);
		$scoreC.text(scoreCTracker);
	}
	
	runAnimation = true;
	}


	
//Left paddle movement checking for event listener
	
$(document).on("keydown",function(e){
		switch(e.keyCode){
			//Up arrow pressed
			case 38:
				if (!gameStart){
					ballProp.velocity.x = ballSpeed * startDirX;
					ballProp.velocity.y = ballSpeed * startDirY;
					gameStart = true;
					}
				if (paddleLProp.position.y > 0){
					paddleLProp.acceleration.y -= 3.5;
					}
			break;
				
			//Down arrow pressed
			case 40:
				if (!gameStart){
					ballProp.velocity.x = ballSpeed * startDirX;
					ballProp.velocity.y = ballSpeed * startDirY;
					gameStart = true;
					}
				if (paddleLProp.position.y < gameEdgeY - paddleEdgeY){
					paddleLProp.acceleration.y += 3.5;
					}
			break;
			
			//Space bar pressed
			case 32:
				if (!gameStart){
					ballProp.velocity.x = ballSpeed * startDirX;
					ballProp.velocity.y = ballSpeed * startDirY;
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
				objectProp.acceleration.y -= paddleRAccel;
				}
				
			if(ballProp.position.y >= objectProp.position.y  && 
			   ballProp.velocity.y > 0 && objectProp.position.y < gameEdgeY - paddleEdgeY ){
				objectProp.acceleration.y += paddleRAccel;
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
	
	if (objectProp.position.x > gameEdgeX - ballEdge || objectProp.position.x < 0){
			
			runAnimation = false;
			
			if(objectProp.velocity.x > 0){
				scoreHTracker++;
				$scoreH.text(scoreHTracker);
				if(scoreHTracker >= 3){
					$winLose.text("You Win!");
					$winLose.show();
					$playAgain.show();
					$playAgain.click(function(){
						$winLose.hide(); 
						$playAgain.hide(); 
						reset();
						});	
					}
				}
				
			if(objectProp.velocity.x < 0){
				scoreCTracker++;
				$scoreC.text(scoreCTracker);
				if(scoreCTracker >= 3){
					$winLose.text("You Lose!");
					$winLose.show();
					$playAgain.show();
					$playAgain.click(function(){
						$winLose.hide(); 
						$playAgain.hide(); 
						reset();
						});	
					//$playAgain.click(reset);
					//$playAgain.on("click", function(){$winLose.text("CLicked!"); reset();});
					//$playAgain.on("click", reset);
					//$(document).on("click", ".playAgain", reset);
					//$(document).ready(function(){$(document).on("click", ".playAgain", function(){reset();});});
					//$("body").on("click", ".playAgain", function(){reset();});
					//$(document).ready(function(){$("body").on("click", ".playAgain", function(){reset();});});
					}
				}
				
			if(scoreHTracker < 3 && scoreCTracker < 3){
				reset();
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
	
	if(runAnimation){
	moveObject(ballProp, $ball);
	moveObject(paddleLProp, $paddleL);
	moveObject(paddleRProp, $paddleR);
	}
	
	requestAnimationFrame(game);

}


game();

