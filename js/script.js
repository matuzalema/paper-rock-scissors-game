var buttons = document.getElementById("buttons");

var newGameButton = document.getElementById("newGame");
var playerChoiceText = document.getElementById("playerChoice");
var compChoiceText = document.getElementById("compChoice");
var resultOutput = document.getElementById("resultOutput");
var resultOfRounds = document.getElementById("result");
var rounds = document.getElementById("rounds");
var scoreOutput = document.getElementById("scoreOutput");
var buttonsToPlay = document.getElementsByClassName('player-move');
var outputEntered = document.getElementById("outputEntered");
var playerChoice = document.getElementsByClassName('playerChoice');


var params = {
	compChoice: null,
	playerChoice: null, 
	resultText: null, 
	playerScore : 0, 
	compScore : 0,
	numberOfRounds: null,
	roundNumber: 0,
	progress : []
};

function RoundsStatus(roundNumber, roundPlayerChoice, roundCompChoice, roundPlayerScore, roundCompScore) {
  this.roundNumber = roundNumber;
  this.roundPlayerChoice = roundPlayerChoice;
  this.roundCompChoice = roundCompChoice;
  this.roundPlayerScore = roundPlayerScore;
  this.roundCompScore = roundCompScore;
}

// clearFields
var clearFields = function(){
	playerChoiceText.innerHTML = "";
	compChoiceText.innerHTML = "";
	resultOfRounds.innerHTML = "";
	resultOutput.innerHTML = "";
	scoreOutput.innerHTML = "";
	params.playerScore = 0;
	params.compScore = 0;
	params.progress = [];
	params.roundNumber = 1;
};

// prompt validation
var validateAndDisplayFields = function(textForChecking){
  if (textForChecking == null) { 
  } else if (textForChecking == '' || isNaN(textForChecking)) {
    	if(textForChecking == ''){
    		outputEntered.innerHTML = 'Please enter number';
    	} else {
    		 outputEntered.innerHTML = 'You have to enter number';
    	}  
    rounds.innerHTML = "";
    buttons.classList.add('hide');
    rounds.classList.add('hide');
    clearFields();
	refreshTable();
  } else {
    outputEntered.innerHTML = "";
    rounds.innerHTML = params.numberOfRounds + " rounds means victory";
    buttons.classList.remove('hide');
    rounds.classList.remove('hide');
    clearFields();
	refreshTable();
  }
};


// ============== new game ========================

buttons.classList.add('hide');

newGameButton.addEventListener("click", function(){
	params.numberOfRounds = prompt("How many won rounds you have to finish the game");
	validateAndDisplayFields(params.numberOfRounds);	
});

//Listeners - buttons papper, rock, scissors
for (var i=0; i<buttonsToPlay.length; i++){
	buttonsToPlay[i].addEventListener('click', function(){
		var playerChoice = event.currentTarget.getAttribute('id');
		playerMove(playerChoice);
	});
}

//  ============ React on click functions, playerChoice, compChoice =============

var playerMove = function(playerChoice){
	storePlayerChoice(playerChoice);
	storeCompChoice(randomNumber());
	addScoreText();
	roundsCounter();
	scoreOutput.innerHTML = params.playerScore + " : " + params.compScore;
	printToFinishText();
	params.roundNumber += 1;
	refreshTable();	
};

var addScoreText = function(){
	resultOutput.innerHTML = "";
	params.resultText = resultOutput.insertAdjacentHTML('afterbegin', resultOfDraw());
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
	var roundsStatus = new RoundsStatus(params.roundNumber, params.playerChoice, params.compChoice, params.playerScore, params.compScore);
	params.progress.push(roundsStatus);
};

// ============= create table =============

var refreshTable = function(){
	// clear table
	var tableData = document.getElementById("tableData");
		tableData.innerHTML = ""; 

	// add new table
	for (var i=params.progress.length-1; i>-1; i--){
		tableData.insertAdjacentHTML('afterbegin', 
		'<tr>'+
		'<td>' + params.progress[i].roundNumber + '</td>'+
		'<td>' + params.progress[i].roundPlayerChoice + '</td>'+


		'<td>' + params.progress[i].roundCompChoice + '</td>'+
		'<td>' + params.progress[i].roundPlayerScore + '</td>'+
		'<td>' + params.progress[i].roundCompScore + '</td>'+
		'</tr>');
	}
};

	
// ======== finish game ============

var printToFinishText = function(){
	if (params.playerScore == params.numberOfRounds || params.compScore == params.numberOfRounds) {
		var textFinished = document.getElementById("textFinished");
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

// ========== modals ==============

var showModal = function(){
	event.preventDefault();
	document.querySelector('#modal-overlay').classList.add('show');
};
  

var hideModal = function(event){
	event.preventDefault();
	document.querySelector('#modal-overlay').classList.remove('show');
	clearFields();
	buttons.classList.add('hide');
	rounds.classList.add('hide');
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