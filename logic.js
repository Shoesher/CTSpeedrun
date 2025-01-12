// Initialize game variables with defaults
let key1 = localStorage.getItem("key1") || "z";
let key2 = localStorage.getItem("key2") || "w";
let timer = parseInt(localStorage.getItem("timer"), 10) || 10;
let input = [];
let interval;
const keyLButton = document.getElementById("keyL");
const keyRButton = document.getElementById("keyR");
keyLButton.textContent = key1;
keyRButton.textContent = key2;

//update user settings
function settingsHandler() {
    const newKey1 = document.getElementById("new_key1").value || "z";
    const newKey2 = document.getElementById("new_key2").value || "w";
    const newTimer = parseInt(document.getElementById("timer-duration").value, 10) || 10;

    //save to localStorage
    key1 = newKey1;
    key2 = newKey2;
    timer = newTimer;

    localStorage.setItem("key1", key1);
    localStorage.setItem("key2", key2);
    localStorage.setItem("timer", timer);

    alert(`Settings saved: Key1=${key1}, Key2=${key2}, Timer=${timer} seconds`);
}

//track key presses
function gameChecker() {
    const userInput = document.getElementById("userInput").value.trim();
    if (userInput) {
        const lastKey = userInput.slice(-1); // Get the input-1
        input.push(lastKey); //add input to array

        //change color based on the key
        if (lastKey === key1) {
            flashButton(keyLButton);
        } else if (lastKey === key2) {
            flashButton(keyRButton);
        }

        //clear field after input
        document.getElementById("userInput").value = "";
    }
}

// Change button color temporarily
function flashButton(button) {
    const originalColor = button.style.backgroundColor;
    button.style.backgroundColor = "white";
    setTimeout(() => {
        button.style.backgroundColor = originalColor;
    }, 35); 
}

//calculate user score
function gameHandler() {
    let score = 0;

    for (let i = 0; i < input.length - 1; i++) {
        if (input[i] === key1 && input[i + 1] === key2) {
            score++;
            i++; 
        }
    }

    //display score
    document.getElementById("message").textContent = `Game Over! Your score: ${score}`;
    input = []; // Clear input 
}

//handle the game timings
function gameTime() {
    let timeLeft = timer;
    document.getElementById("timer").textContent = `Timer: ${timeLeft}`;
    document.getElementById("message").textContent = ""; 

    //input tracking
    interval = setInterval(gameChecker, 10); // Check input every 200ms

    //timer display
    const countdown = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = `Timer: ${timeLeft}`;
        if (timeLeft <= 0) clearInterval(countdown);
    }, 1000);

    //Stop game
    setTimeout(() => {
        clearInterval(interval);
        gameHandler();
    }, timer * 1000);
}