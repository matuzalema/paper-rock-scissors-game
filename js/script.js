var paper = document.getElementById("paper");
var rock = document.getElementById("rock");
var scissors = document.getElementById("scissors");
var newGameButton = document.getElementById("newGame");
var playerChoiceText = document.getElementById("playerChoice");
var compChoiceText = document.getElementById("compChoice");
var resultOutput = document.getElementById("resultOutput");
var resultOfRounds = document.getElementById("result");
var rounds = document.getElementById("rounds");
var textFinished = document.getElementById("textFinished");
var buttons = document.getElementById("buttons");
var compChoice;
var playerChoice;
var resultText;
var playerScore = 0;
var compScore = 0;
var numberOfRounds;

// clear fields

var clearFields = function(){
	playerChoiceText.innerHTML = "";
	compChoiceText.innerHTML = "";
	resultOfRounds.innerHTML = "";
	resultOutput.innerHTML = "";
};

// new game
buttons.classList.add('display');
newGameButton.addEventListener("click", function(){
	clearFields();
	playerScore = 0;
	compScore = 0;
	
	numberOfRounds = prompt("How many won rounds you have to finish the game");
	rounds.innerHTML = numberOfRounds + " rounds means victory";
	buttons.classList.remove('display');
	
});


//Listeners

paper.addEventListener('click', function(){
	playerMove("paper");
});

rock.addEventListener('click', function(){
	playerMove("rock");
});

scissors.addEventListener('click', function(){
	playerMove("scissors");
});

// React on click functions, playerChoice, compChoice

var playerMove = function(playerChoice){
	storePlayerChoice(playerChoice);
	storeCompChoice(randomNumber());
	addScoreText();
	roundsCounter();
	resultOfRounds.innerHTML = playerScore + ":" + compScore;
	printToFinishText();
	
};

var addScoreText = function(){
	resultOutput.innerHTML = "";
	resultText = resultOutput.insertAdjacentHTML('afterbegin', resultOfDraw() + "<br>" +  "You played: " + choiceOfPlayer(playerChoice) + "<br>" + " Computer played: " + compChoice);
};

var storePlayerChoice = function(choice){
	playerChoice = choice;
	playerChoiceText.innerHTML = "";
	playerChoiceText.insertAdjacentHTML('afterbegin', 'Your choice: ' + choice);
};

var storeCompChoice = function(choice){
	compChoice = choice;
	compChoiceText.innerHTML = "";
	compChoiceText.insertAdjacentHTML('afterbegin', 'Computer: ' + choice);
};

var choiceOfPlayer = function(playerChoice){
	return playerChoice;
	};

var randomNumber = function() {
    var drawnNumber = Math.floor((Math.random()*3)+1);
    if (drawnNumber === 1) {
		return "paper";
	}
	else if (drawnNumber === 2){
		return "rock";
	}
	else if (drawnNumber === 3){
		return "scissors";
	}
};

// check who won 

var resultOfDraw = function (){
	if ( compChoice=== "paper" && playerChoice === "paper") {
		return "Draw";
	} else if (compChoice === "rock" && playerChoice === "rock") {
		return "Draw";
	} else if (compChoice === "scissors" && playerChoice === "scissors") {
		return "Draw";
	} else if (compChoice === "scissors" && playerChoice === "rock") {
		return "You won!";
	} else if (compChoice === "paper" && playerChoice === "scissors") {
		return "You won!";
	} else if (compChoice === "rock" && playerChoice === "paper") {
		return "You won!";
	} else {
		return "Computer won!";
	}
};

// rounds counter

var roundsCounter = function (){
	if (resultOfDraw() === "You won!") {
		playerScore += 1;
	} else if (resultOfDraw() === "Computer won!"){
		compScore +=1;
	}
};


// finish game

var printToFinishText = function(){
	if (playerScore == numberOfRounds || compScore == numberOfRounds) {
		textFinished = resultOfRounds.insertAdjacentHTML('afterbegin', printResultOfGame());
	}
};

var printResultOfGame = function() {
	if (playerScore === numberOfRounds) {
		document.getElementById("buttons").classList.add('display');
		return 'You won the entire game ';
	} else {
		document.getElementById("buttons").classList.add('display');
		return 'Computer won the entire game ';
	}
};

