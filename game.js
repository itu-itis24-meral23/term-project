const word = "BLAST";
let maskedWord = "_ ".repeat(word.length).trim();
let score = 0;
let lives = 3;
let gameOver = false;
let guessedLetters = [];

const wordDisplay = document.getElementById("word-display");
const guessInput = document.getElementById("guess-input");
const submitButton = document.getElementById("submit-button");
const resetButton = document.getElementById("reset-button");
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");

function updateDisplay() {
    wordDisplay.textContent = maskedWord;
    scoreDisplay.textContent = score;
    livesDisplay.innerHTML = "💜".repeat(lives);
}

function checkWinCondition() {
    if (!maskedWord.includes("_")) {
        alert("Congratulations!You guessed the word correctly.");
        gameOver = true;
    }
}

function checkGuess(guess) {
    if (gameOver) {
        alert("The game is over. Press the 'Reset' button to restart.");
        return;
    }

    if (!guess) {
        alert("Please enter a letter or word!");
        return;
    }
    if (guessedLetters.includes(guess)) {
        alert("This letter has already been guessed!");
        return;
    }
    if (guess.length === 1) {
        let correctGuess = false;
        const updatedWord = maskedWord.split(" ");
        for (let i = 0; i < word.length; i++) {
            if (word[i] === guess) {
                updatedWord[i] = guess;
                correctGuess = true;
            }
        }
        maskedWord = updatedWord.join(" ");

        if (correctGuess) {
            score += 20;
        } else {
            lives--;
        }
        guessedLetters.push(guess);
    } else if (guess.length === word.length) {
        if (guess === word) {
            score = 100; 
            maskedWord = word.split("").join(" "); 
            alert("Congratulations! You guessed the correct word!");
            gameOver = true;
        } else {
            lives = 0;
            alert("You entered the wrong word! You lost the game.");
            gameOver = true;
        }
    } else {
        alert("Invalid input! Please enter 1 character for a letter guess or the full length for a word guess.");
        return;
    }

    updateDisplay();
    if (lives <= 0 && !gameOver) {
        alert("You have run out of attempts! You lost the game.");
        gameOver = true;
    }
    checkWinCondition();
}

submitButton.addEventListener("click", () => {
    const guess = guessInput.value.toUpperCase().trim();
    guessInput.value = "";
    checkGuess(guess);
});
guessInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const guess = guessInput.value.toUpperCase().trim();
        guessInput.value = "";
        checkGuess(guess);
    }
});
resetButton.addEventListener("click", () => {
    maskedWord = "_ ".repeat(word.length).trim();
    score = 0;
    lives = 3;
    gameOver = false;
    guessedLetters = [];
    updateDisplay();
});

updateDisplay();