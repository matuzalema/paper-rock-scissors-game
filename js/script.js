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
var scoreOutput = document.getElementById("scoreOutput");
var buttonsToPlay = document.getElementsByClassName('player-move');

// var resultText;var compChoice;
// var playerScore = 0;
// var compScore = 0;
// var numberOfRounds;


// teble outputs	
var tableRounds = document.getElementById('tableRounds');
var playerChoice = document.getElementsByClassName('playerChoice');


var params = {
	compChoice: null,
	playerChoice: null, 
	resultText: null, 
	playerScore : 0, 
	compScore : 0,
	numberOfRounds: null,
	progress : []
};

function RoundsStatus(roundNumber, roundPlayerChoice, roundCompChoice, roundPlayerScore, roundCompScore) {
  this.roundNumber = roundNumber;
  this.roundPlayerChoice = roundPlayerChoice;
  this.roundCompChoice = roundCompChoice;
  this.roundPlayerScore = roundPlayerScore;
  this.roundCompScore = roundCompScore;
}


// add date to table - number round
var addnumberOfRounds = function(){
	params.numberOfRounds = tableRounds.insertAdjacentHTML('afterbegin', '<p> jeden </p>');
};

addnumberOfRounds();
// clear fields

var clearFields = function(){
	playerChoiceText.innerHTML = "";
	compChoiceText.innerHTML = "";
	resultOfRounds.innerHTML = "";
	resultOutput.innerHTML = "";
	scoreOutput.innerHTML = "";
};

// new game

buttons.classList.add('display'); 
newGameButton.addEventListener("click", function(){
	clearFields();
	params.playerScore = 0;
	params.compScore = 0;
	
	params.numberOfRounds = prompt("How many won rounds you have to finish the game");
	rounds.innerHTML = params.numberOfRounds + " rounds means victory";
	buttons.classList.remove('display');
	rounds.classList.remove('display');
	
});

//Listeners - buttons papper, rock, scissors

for (var i=0; i<buttonsToPlay.length; i++){
	buttonsToPlay[i].addEventListener('click', function(){
		var playerChoice = event.currentTarget.getAttribute('id');
		playerMove(playerChoice);
	});
}

// React on click functions, playerChoice, compChoice

var playerMove = function(playerChoice){
	storePlayerChoice(playerChoice);
	storeCompChoice(randomNumber());
	addScoreText();
	roundsCounter();
	scoreOutput.innerHTML = params.playerScore + ":" + params.compScore;
	printToFinishText();
	
};

var addScoreText = function(){
	resultOutput.innerHTML = "";
	params.resultText = resultOutput.insertAdjacentHTML('afterbegin', resultOfDraw() + "<br>" +  "You played: " + choiceOfPlayer(params.playerChoice) + "<br>" + " Computer played: " + params.compChoice);
};

var storePlayerChoice = function(choice){
	params.playerChoice = choice;
	playerChoiceText.innerHTML = "";
	playerChoiceText.insertAdjacentHTML('afterbegin', 'Your choice: ' + choice);
};

var storeCompChoice = function(choice){
	params.compChoice = choice;
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

	if ( params.compChoice=== "paper" && params.playerChoice === "paper") {
		return "Draw";
	} else if (params.compChoice === "rock" && params.playerChoice === "rock") {
		return "Draw";
	} else if (params.compChoice === "scissors" && params.playerChoice === "scissors") {
		return "Draw";
	} else if (params.compChoice === "scissors" && params.playerChoice === "rock") {
		return "You won!";
	} else if (params.compChoice === "paper" && params.playerChoice === "scissors") {
		return "You won!";
	} else if (params.compChoice === "rock" && params.playerChoice === "paper") {
		return "You won!";
	} else {
		return "Computer won!";
	}

};

// rounds counter

var roundsCounter = function (){
	if (resultOfDraw() === "You won!") {
		params.playerScore += 1;
	} else if (resultOfDraw() === "Computer won!"){
		params.compScore +=1;
	}

	//store result status for history
	var roundsStatus = new RoundsStatus(1, params.playerChoice, params.compChoice, params.playerScore, params.compScore);

	params.progress.push(roundsStatus);
};


// finish game

var printToFinishText = function(){
	if (params.playerScore == params.numberOfRounds || params.compScore == params.numberOfRounds) {
		textFinished = resultOfRounds.insertAdjacentHTML('afterbegin', printResultOfGame());
	}
};

var printResultOfGame = function() {
	if (params.playerScore === params.numberOfRounds) {
		document.getElementById("modal-overlay").classList.add('show');
		return 'You won lucky!';
	} else {
		document.getElementById("modal-overlay").classList.add('show');
		return 'Computer won!';
	}
};

// modals

  var showModal = function(){
    event.preventDefault();
    document.querySelector('#modal-overlay').classList.add('show');

    //show modal after click
    // var currentLink = event.currentTarget.getAttribute('href');
    // currentLinkName = currentLink.substring(1);
    // getCurrentLink = document.getElementById(currentLinkName);
    // getCurrentLink.classList.add("show");
  };
  
// var modalLinks = document.querySelectorAll('.show-modal');

//   for(var i = 0; i < modalLinks.length; i++){
//     modalLinks[i].addEventListener('click', showModal);
//   }
  

  var hideModal = function(event){
    event.preventDefault();
    document.querySelector('#modal-overlay').classList.remove('show');
    clearFields();
    buttons.classList.add('display');
    rounds.classList.add('display');

    // getCurrentLink.classList.remove('show');
  };
  
var closeButtons = document.querySelectorAll('.modal .close');
  
  for(var i = 0; i < closeButtons.length; i++){
    closeButtons[i].addEventListener('click', hideModal);
  }
  
  
 document.querySelector('#modal-overlay').addEventListener('click', hideModal);
  
  
  var modals = document.querySelectorAll('.modal');
  
  for(var i = 0; i < modals.length; i++){
    modals[i].addEventListener('click', function(event){
      event.stopPropagation();
    });
  }