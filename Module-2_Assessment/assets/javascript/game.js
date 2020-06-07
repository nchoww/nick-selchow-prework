const topLineElement = document.querySelector('#top-line');
const winNumberElement = document.querySelector('#win-number');
const wordElement = document.querySelector('#word');
const remainingGuessesElement = document.querySelector('#remaining-guesses');
const lettersGuessedElement = document.querySelector('#letters-guessed');

// Array containing possible word selections
const wordChoices = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 
                     'saturn', 'uranus', 'neptune', 'pluto', 'sun',];

// Shuffle the array so each game is different
for (let i = wordChoices.length - 1; i > 0; i--) {
	let j = Math.floor(Math.random() * (i + 1));
	[wordChoices[i], wordChoices[j]] = [wordChoices[j], wordChoices[i]];
}

remainingGuessesElement.innerText = '0';
winNumberElement.innerText = '0';

const gameObject = {
	winCount: 0,
	guessesLeft: 0,
	gameInProgress: false,
	currentWordIndex: -1,
	lettersGuessed: [],
	wordProgress: [],
	
	start: function () {
		console.log('starting!');
		this.setGuesses(12);
		this.lettersGuessed = [];
		lettersGuessedElement.innerText = 'none';
		this.gameInProgress = true;
		this.currentWordIndex++;
		this.updateWord();
		topLineElement.innerText = 'Press any key to guess that letter';
	},
	
	updateWord: function() {
		this.wordProgress = [];
		const word = wordChoices[this.currentWordIndex];
		for (let i = 0; i < word.length; i++) {
			this.wordProgress.push('_');
		}
		wordElement.innerText = this.wordProgress.join(' ');
	},
	
	currentWord: function() { return wordChoices[this.currentWordIndex]; },
	
	guessLetter: function (letter) {
		// check if the letter has already been guessed
		if (this.lettersGuessed.includes(letter)) {
			return;
		}
		
		this.lettersGuessed.push(letter);
		//lettersGuessedElement.innerText = this.lettersGuessed;
		lettersGuessedElement.innerText = this.lettersGuessed.join(' ');

		for (let i = 0; i < this.wordProgress.length; i++) {
			if (this.currentWord()[i] === letter) {
				this.wordProgress[i] = letter;
			}
		}
		wordElement.innerText = this.wordProgress.join(' ');
		
		// check to see if word is completed
		if (!this.wordProgress.includes('_')) {
			this.endGame();
		} else {
			this.setGuesses(this.guessesLeft - 1);
		}
	},
	
	setGuesses: function (guesses) {
		// check to see if game is over
		if (guesses === 0) {
			this.endGame();
		}
		this.guessesLeft = guesses;
		remainingGuessesElement.innerText = guesses;
	},
	
	endGame: function () {
		this.gameInProgress = false;
		
		// check to see if player won
		if (this.wordProgress.includes('_')) {
			topLineElement.innerText = 'Sorry, you lost :( Press any key to play again.';
		} else {
			topLineElement.innerText = 'Congratulations, you win! Press any key to play again.';
			this.winCount++;
			winNumberElement.innerText = this.winCount;
		}
	},
}

const keyPressed = function (event) {
	if (!gameObject.gameInProgress) {
		gameObject.start();
	} else {
		const keyNum = event.which;
		// check if key pressed is a letter, ignore if not
		if (keyNum >= 65 && keyNum <= 90) {
			gameObject.guessLetter(event.key.toLowerCase());
		}
	}
}

document.addEventListener('keyup', keyPressed);