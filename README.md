# Snake-Game
A basic version of the snake game using HTML and JS. Hope you like it.  
https://jescortam.github.io/Snake-Game/

![Screenshot 2023-05-05 232421](https://user-images.githubusercontent.com/69122617/236601947-f8acc4b1-94a3-407d-9bee-e0f99e15bfdf.png)


## Controls: 
* Arrow keys to change the snake's direction.  
* Escape to pause the game.

## Code explanation:

### Snake properties
* **snakeBody**: Array containing the coordinates for each square of the snake.
* **isPaused**: Checks if the game is paused or not.
* **isAlive**: Checks if the snake has died or not.

* **dir**: The initial value is 39, which means right (39 is the key code for the right arrow key).
* **movement**: Is the movement speed of the snake (can be customized in the menu).

### Apple properties:
* **x**: Location in the horizontal axis.
* **y**: Location in the vertical axis.

### General properties:
* **columns**: Number of columns in the grid.
* **rows**: Number of rows in the grid.
* **speed**: Movement speed of the snake.
* **speedOptions**: Array containing the different speed options available.
* **sizeColumns**: Array containing the different options for the number of columns.
* **sizeWidths**: Array containing the different cell widths available.

### Functions:
* **refresh()**: Updates the coloring of each cell every interval of time.
* **moveApple()**: Changes the location of the apple when eaten.
* **createGrid()**: Creates and displays the grid.
* **startButton.onClick()**: Starts the game when the start button is clicked.
* **move()**: Moves the snake in the direction it is facing.
* **action()**: Does something depending on which key the player presses
