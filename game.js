var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0

$(document).keypress(function(){
    if (started == false){
        //when game starts
        $("#level-title").text("Level"+ level)
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
  
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

    
  });
  


function nextSequence(){

    userClickedPattern= [];

    level++;
    $("#level-title").text("Level "+ level)

    var randomNumber =Math.floor(Math.random() * 4) ;
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    




  

}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);

}


function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
         // If the user has finished their sequence
         if (userClickedPattern.length === gamePattern.length) {
            // Call nextSequence after a 1-second delay
            setTimeout(function() {
                nextSequence();
            }, 1000);

           
        }
    }else{
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);


        $("h1").text("Game Over, Press Any Key to Restart : P");
        startOver();
    }

}

function startOver() {
    level=0;
    gamePattern=[];
    started=false;

}


