var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userClickedPattern = []
var gameStarted = false;
var gameLevel = 0
var userLevel = 0
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4)
    var chosenColour = buttonColours[randomNumber]
    console.log(chosenColour)
    gamePattern.push(chosenColour)
    buttonPressedAnimation($("#"+chosenColour));
    gameLevel++;
    $(".title-level").text("Level "+gameLevel)
    userLevel = 0
}

$(".btn").click(function (event) {
    var obj = $(event.target)
    buttonPressedAnimation(obj)
    if(gameStarted){
        checkClick(obj.attr("id"))
    }
});
function checkClick(clickedId){
    if(clickedId !== gamePattern[userLevel]){
        endGame()
        return;
    }
    userLevel++;
    if(userLevel === gamePattern.length){
        setTimeout(nextSequence,500);
    }
}
function endGame(){
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    audio.addEventListener("ended",function(){
        window.location.reload();
    })
}
function buttonPressedAnimation(obj){
    obj.addClass("pressed")
    setTimeout(function(){
        obj.removeClass("pressed");
    },100);
    var audio = new Audio("sounds/wrong.mp3");
    switch (obj.attr("id")) {
        case "green":
            audio = new Audio("sounds/green.mp3");
            break;
        case "red":
            audio = new Audio("sounds/red.mp3");
            break;
        case "blue":
            audio = new Audio("sounds/blue.mp3");
            break;
        case "yellow":
            audio = new Audio("sounds/yellow.mp3");
            break;
        default:
            audio = new Audio("sounds/wrong.mp3");
    }
    audio.play();
}
$(document).on("keydown",function(){
    if(!gameStarted){
        gameStarted = true;
        nextSequence();
    }
});
