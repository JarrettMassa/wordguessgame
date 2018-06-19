var wordBank=['murder',
			'chainsaw',
			'sociopath'];

var previousGuesses=[];
var displayArray=[];
var miscArray=[];

var chosenWord;
var guessCounter;
var miscInt;

var gameInProgress = false;
var AbcArray='abcdefghijklmnopqrstuvwxyz';
var correctSound = new Audio('assets/sounds/correct.wav');
var screamSound1 = new Audio('assets/sounds/scream1.mp3');
var ScreamSound2 = new Audio('assets/sounds/scream2.mp3');
var ScreamSound3 = new Audio('assets/sounds/scream3.mp3');

function startGame(){
	resetVariables();
	chosenWord=wordBank[Math.floor(Math.random() * wordBank.length)];
	for (var i=0 ; i < chosenWord.length ; i++){
		displayArray[i]="_";
	}
	updateStats();

	document.getElementById("resultvid").style.opacity = 0;
	document.getElementById("resultvid").pause();
}

function resetVariables(){
	guessCounter = 5;
	previousGuesses.length = 0;
	displayArray.length = 0;
	updateStats();
}

function playRandomScream(){
	if ((Math.floor(Math.random() * 3)) === 0){		
		screamSound1.play();
	}
	else if((Math.floor(Math.random() * 3)) === 1){
		ScreamSound2.play();
	}
	else{
		ScreamSound3.play();
	}
}

function checkAnswer(playerGuess){

	if (previousGuesses.includes(playerGuess) | AbcArray.includes(playerGuess) === false){
		return;
	}

	previousGuesses.push(playerGuess);

	if (chosenWord.includes(playerGuess)){
		correctSound.play();
		miscArray=chosenWord.split("");
		do{
			miscInt=miscArray.indexOf(playerGuess);
			displayArray[miscInt]=playerGuess.toUpperCase();
			miscArray[miscInt]="-";
		}while(miscArray.includes(playerGuess))
	}
	else {
		playRandomScream();
		guessCounter--;
	}
	updateStats();

		
}

function checkKeyPress(event){
	if (event.key === 'Enter' & gameInProgress === false){
		gameInProgress = true;
		startGame();
	}
	else if(gameInProgress === true){
		checkAnswer(event.key);
		checkResult();
	}
}

function updateStats(){
	document.getElementById("guessesLeft").innerHTML = "Guesses Left: " + guessCounter;
	document.getElementById("lettersGuessed").innerHTML = (previousGuesses.join(", "));
	document.getElementById("gameDisplay").innerHTML = (displayArray.join(" "));
}

function checkResult(){
	if (guessCounter === 0){
		document.getElementById("gameDisplay").innerHTML = chosenWord;
		document.getElementById("halloween").pause();
		document.getElementById("resultvid").style.opacity = 1;
		document.getElementById("resultvid").src = "assets/videos/loser.mp4";
		document.getElementById("resultvid").play();
		gameInProgress = false;
	}
	else if (displayArray.includes("_") === false){
		document.getElementById("gameDisplay").innerHTML = chosenWord;
		document.getElementById("halloween").pause();
		document.getElementById("resultvid").style.opacity = 1;
		document.getElementById("resultvid").src = "assets/videos/winner.mp4";
		document.getElementById("resultvid").play();
		gameInProgress = false;
	}
}



