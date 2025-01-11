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
const svgFiles = {
    B: "B_inkspace.svg",
    L: "L_inkspace.svg",
    A: "A_inkspace.svg",
    S: "S_inkspace.svg",
    T: "T_inkspace.svg",
};

function updateDisplay() {
    wordDisplay.innerHTML = '';
    for (let i = 0; i < word.length; i++) {
        const letter = word[i];
        const guessed = guessedLetters.includes(letter);

        const letterContainer = document.createElement("span");
        if (guessed) {
            const svgImage = document.createElement("img");
            svgImage.src = svgFiles[letter];
            svgImage.alt = letter;
            letterContainer.appendChild(svgImage);
        } else {
            letterContainer.textContent = " ";
            letterContainer.classList.add("letter-box");
        }
        
        wordDisplay.appendChild(letterContainer);
        wordDisplay.appendChild(document.createTextNode(" "));
    }
    scoreDisplay.textContent = score;
    livesDisplay.innerHTML = "🤎".repeat(lives);
}

function checkWinCondition() {
    if (!maskedWord.includes("_") && !gameOver) {
        gameOver = true;
        updateDisplay();
        setTimeout(() => {
            alert("Congratulations! You guessed the word correctly.");
        }, 120);
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
            document.body.classList.add("correct");
            document.body.classList.remove("incorrect");
        } else {
            lives--;
            document.body.classList.add("incorrect");
            document.body.classList.remove("correct");
        }
        guessedLetters.push(guess);
    } else if (guess.length === word.length) {
        if (guess === word) {
            score = 100;
            gameOver = true; 
            updateDisplay(); 
            document.body.classList.add("correct");
            document.body.classList.remove("incorrect");
    
            for (let i = 0; i < word.length; i++) {
                guessedLetters.push(word[i]);
            }
            setTimeout(() => {
                alert("Congratulations!");
            }, 140);
        } else {
            lives = 0;
            alert("You entered the wrong word! You lost the game.");
            gameOver = true;
            updateDisplay();
            document.body.classList.add("incorrect");
            document.body.classList.remove("correct");
        }
    } else {
        alert("Invalid input! Please enter 1 character for a letter guess or the full length for a word guess.");
        return;
    }

    updateDisplay();
    if (lives <= 0 && !gameOver) {
        gameOver = true;
        updateDisplay();
        setTimeout(() => {
            alert("You have run out of attempts! You lost the game.");
        }, 120);
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
    document.body.classList.remove("correct", "incorrect");
    document.body.style.backgroundColor = "";
});

updateDisplay();