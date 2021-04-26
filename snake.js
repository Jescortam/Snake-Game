//COUNTER
//CONTROLS

// Snake properties
let snakeBody = [];         // snake's coordinates
let isPaused = false;
let isAlive = true;
let dir = 39;               // direction
let movement = window.setInterval(function(){}, 9999999);

// Apple properties
let apple = {
    x: 5,
    y: 5
}

// Game modes and scores
let columns = 1;
let rows = 1;
let speed;
let newGameBox = document.getElementById("new-game-box");
const speedButtons = document.querySelectorAll('input[name="speed"');
const sizeButtons = document.querySelectorAll('input[name="size"');
const speedOptions = [100, 200, 400];   // Fast, Normal and Slow
const sizeColumns = [16, 12, 8];        // Large, Regular and Small
const sizeWidths = ["32px", "42.64px", "64px"];
let popUp = document.getElementById("pop-up");
let score = document.getElementById("score");
let highScore = document.getElementById("highscore");

// Display variables
let grid = document.getElementById("main-grid");
let container = [];
container = [];
    for (let i = 0; i < rows; i++) {
        grid.style.gridTemplateColumns += " auto";
        container[i] = [];
        for (let j = 0; j < columns; j++) {
            container[i].push(document.createElement("div"));
            grid.appendChild(container[i][j]);
            container[i][j].style.width = sizeWidths[i];
            container[i][j].style.height = sizeWidths[i];
        }
    }

// Updates the color on the green every interval of time
let refresh = function() {
    // Background
    container.forEach(function(row, i) {
        row.forEach(function(cell, j) {
            cell.style.backgroundColor = "#CCCCCC";
            cell.style.opacity = 0.5;
        })
    })

    // Apple
    container[apple.y][apple.x].style.backgroundColor = "#FF0000";
    container[apple.y][apple.x].style.opacity = 1;

    // Snake
    snakeBody.forEach(function(head, i){
        container[head[0]][head[1]].style.backgroundColor = "green";
        container[head[0]][head[1]].style.opacity = 1;
    });
}

// If the snake eats the apple, it changes the location
let moveApple = function() {
    apple.y = Math.floor(Math.random() * rows);
    apple.x = Math.floor(Math.random() * columns);

    // So that the apple doesn't appear in the snake's body
    for (let i = 0; i < snakeBody.length; i++) {
        if (apple.y === snakeBody[i][0] && apple.x === snakeBody[i][1]) {
            apple.y = Math.floor(Math.random() * rows);
            apple.x = Math.floor(Math.random() * columns);
            i = 0;  // If it is in the snake's body, do it all over again
        }
    }
}

// Draw the container
let createGrid = function() {
    // Checking which size was chosen
    for (let i = 0; i < sizeButtons.length; i++) {
        if (sizeButtons[i].checked) {
            // If it has not changed, return
            if (columns === sizeColumns[i]) {
                return;
            }
            columns = rows = sizeColumns[i];
            cellSize = sizeWidths[i];
            break;
        }
    }

    // Delete the old grid
    while (grid.hasChildNodes()) {
        grid.removeChild(grid.firstChild);
    }

    // Reset everything
    grid.style.gridTemplateColumns = "";
    container = [];

    // Drawing the new grid
    for (let i = 0; i < rows; i++) {
        grid.style.gridTemplateColumns += " auto";
        container[i] = [];
        for (let j = 0; j < columns; j++) {
            container[i].push(document.createElement("div"));
            grid.appendChild(container[i][j]);
            container[i][j].style.width = cellSize;
            container[i][j].style.height = cellSize;
        }
    }
}

// When the button is clicked, the game starts
let startButton = document.getElementById("start");
startButton.onclick = function() {
    // Hiding the menu
    popUp.style.visibility = "hidden";
    newGameBox.style.visibility = "hidden";

    // Checking the speed
    for (let i = 0; i < speedButtons.length; i++) {
        if (speedButtons[i].checked) {
            speed = speedOptions[i];
            break;
        }
    }

    // Setting the time interval
    clearInterval(movement);
    movement = window.setInterval(move, speed);

    // Creates the grid (obviously)
    createGrid();

    // Resets the snake's properties
    snakeBody = [[1,2], [1, 1]];
    dir = 39;
    isAlive = true;
    isPaused = false;
    score.innerHTML = snakeBody.length;

    // Puts the apple in a random place
    moveApple();
}

// Moves the snake in his direction
let move = function() {
    // If you lose or pause the game
    if (isPaused || !isAlive) {
        grid.style.filter = "brightness(66.6%)";
        popUp.style.visibility = "visible";
        if (isPaused) {
            popUp.innerHTML = "PAUSE";
        } else {
            popUp.innerHTML = "GAME OVER";
            newGameBox.style.visibility = "visible";
            startButton.innerHTML = "Retry";
            if (snakeBody.length > highScore.innerHTML) {
                highScore.innerHTML = snakeBody.length; 
            }
        }
        return;
    } else {    // If the game still is active
        grid.style.filter = "brightness(100%)";
        popUp.style.visibility = "hidden";
    }

    switch(dir) {   //If the direction points to his body or the grid limits, the snake dies
        case 37:    // Left
            for (let i = 1; i < snakeBody.length; i++) {
                if (snakeBody[0][0] === snakeBody[i][0] && snakeBody[0][1] - 1 === snakeBody[i][1]) {
                    isAlive = false;
                    return;
                }   
            }
            if (snakeBody[0][1] <= 0) {
                isAlive = false;
                return;
            } else {
                snakeBody.unshift([snakeBody[0][0], snakeBody[0][1] - 1]);
            }
            break;
        case 38:    // Up
            for (let i = 1; i < snakeBody.length; i++) {
                if (snakeBody[0][0] - 1 === snakeBody[i][0] && snakeBody[0][1] === snakeBody[i][1]) {
                    isAlive = false;
                    return;
                }   
            }
            if (snakeBody[0][0] <= 0) {
                isAlive = false;
                return;
            } else {
                snakeBody.unshift([snakeBody[0][0] - 1, snakeBody[0][1]]);
            }
            break;
        case 39:    // Right
            for (let i = 1; i < snakeBody.length; i++) {
                if (snakeBody[0][0] === snakeBody[i][0] && snakeBody[0][1] + 1 === snakeBody[i][1]) {
                    isAlive = false;
                    return;
                }   
            }
            if (snakeBody[0][1] >= columns - 1) {
                isAlive = false;
                return;
            } else {
                snakeBody.unshift([snakeBody[0][0], snakeBody[0][1] + 1]);
            }
            break;
        case 40:    // Down
            for (let i = 1; i < snakeBody.length; i++) {
                if (snakeBody[0][0] + 1 === snakeBody[i][0] && snakeBody[0][1] === snakeBody[i][1]) {
                    isAlive = false;
                    return;
                }   
            }
            if (snakeBody[0][0] >= rows - 1) {
                isAlive = false;
                return;
            } else {
                snakeBody.unshift([snakeBody[0][0] + 1, snakeBody[0][1]]);
            }
            break;
    }

    // If the snake doesn't eat the apple
    if (snakeBody[0][0] !== apple.y || snakeBody[0][1] !== apple.x) {
        snakeBody.pop();
    } else { // If it does
        moveApple();
        score.innerHTML = snakeBody.length;
    }

    // Refresh the grid
    refresh();
}

// What it does depending which key you press
let action = function(key) {
    if (isAlive) {              // The condition prevents it moving backwards
        switch (key.code) {
            case "ArrowLeft": 
                if (snakeBody[0][1] - 1 === snakeBody[1][1]) return;
                dir = 37;
                break;
            case "ArrowUp": 
                if (snakeBody[0][0] - 1 === snakeBody[1][0]) return;
                dir = 38;
                break;
            case "ArrowRight": 
                if (snakeBody[0][1] + 1 === snakeBody[1][1]) return;
                dir = 39;
                break;
            case "ArrowDown": 
                if (snakeBody[0][0] + 1 === snakeBody[1][0]) return;
                dir = 40;
                break;
            case "Escape":  // Pause
                if (isPaused) { isPaused = false; } 
                else { isPaused = true; }
                break;
        }
    }
}

// Creates the grid before the game starts
createGrid();   

// Makes the game respond to key presses
document.body.addEventListener("keydown", function(key) {action(key)});
