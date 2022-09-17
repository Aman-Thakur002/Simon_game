var userPattern = [];
var gamePattern = [];
var buttonSeq = ["box1", "box2", "box3", "box4"];
var level = 0;
var score=0;
var started = false


$(".play-now").on("click", function () {
  if (!started ) {
    $(".play-now").css("display","none")
    $(".heading").text("Level " + level).css("display","block");
    nextSequence();
    started = true;
  }
});

$("button").click(function () {
  var selectedBox = $(this).attr("class").slice(0, 4);
  userPattern.push(selectedBox);

  audioPlay(selectedBox);
  animateBox(selectedBox);

  checkAnswer(userPattern.length - 1);

});

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userPattern[currentLevel]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
      score++;
    }
  } else {
    $("body").removeClass("theme");
    audioPlay("wrong");
    $("body").addClass("game-over");
    $(".heading").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
      $("body").addClass("theme");
    }, 200);

    startOver();
  }
}

// next round
function nextSequence() {
  userPattern = [];
  level++;
  $(".heading").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomBox = buttonSeq[randomNumber];
  gamePattern.push(randomBox);

  $("." + randomBox).fadeIn(200).fadeOut(200).fadeIn(200);
  audioPlay(randomBox);
}
// for animation of buttons
function animateBox(currentBox) {
  $("#1" + currentBox).addClass("pressed");
  setTimeout(function () {
    $("#1" + currentBox).removeClass("pressed");
  }, 100);
}
// to play sound
function audioPlay(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  $(".heading").text("Your score is:"+score);
  $(".play-now").css("display","flex");
  level = 0;
  score=0;
  gamePattern = [];
  started = false;
}
