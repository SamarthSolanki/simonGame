var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userInput = [];
var started = false;
var level = 0;
function nextSequence()
{
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColors[randomNumber];

  gamePattern.push(randomChosenColour);
  animation(randomChosenColour);

  playSound(randomChosenColour);

}

function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animation(name)
{
  $("#"+ name).fadeIn(100).fadeOut(100).fadeIn(100);
}

function animatePress(currentColor)
{
  $("#"+ currentColor).addClass("pressed");

  setTimeout(() => {  $("#"+ currentColor).removeClass("pressed"); }, 100);
}

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  animatePress(userChosenColour);
  playSound(userChosenColour);
  userInput.push(userChosenColour);
  checkAnswer(userInput.length-1);
});

$(document).keypress(function()
{
  if (!started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }

});

function checkAnswer(currentLevel)
{
  if(userInput[currentLevel]===gamePattern[currentLevel])
  {
    console.log("sucess");
    if(userInput.length === gamePattern.length)
    {
      setTimeout(function () {
        nextSequence();
        userInput = [];
      },1000);
    }
  }
  else {
    console.log("failure");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){  $("body").removeClass("game-over"); }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
  userInput = [];
}
