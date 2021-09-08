function init() {
	canvas = document.getElementById("gamecanvas");
	W = canvas.width = 800;
	H = canvas.height = 800;
	pen = canvas.getContext('2d');
	cell_size = 67;
	game_over = false;
	score = 0;
	food_img = new Image();
	food_img.src = "../assets/apple.png";

	tropy_img = new Image();
	tropy_img.src = "../assets/trophy.png";

	food = getRandomFood();
	snake = {
		init_len: 5,
		color: "blue",
		cells: [],
		direction: "right",

		createSnake:function() {
			for(var i = this.init_len; i>0; i--) {
				this.cells.push({x:i, y:0});
			}
		},
		
		drawSnake:function() {
			for(var i=0; i<this.cells.length; i++) {
				pen.fillStyle = this.color;
				pen.fillRect(
					this.cells[i].x*cell_size,
					this.cells[i].y*cell_size,
					cell_size-2,
					cell_size-2
					);
				}
			},
			
		movesnake:function() {
			console.log("moving snake");
			var headX = this.cells[0].x;
			var headY = this.cells[0].y;

			if (headX == food.x && headY == food.y) {
				console.log("food eaten");
				food = getRandomFood();
				score++;
			}
			else {
				this.cells.pop();
			}

			var nextX, nextY;
			if (this.direction == "right") {
				nextX = headX+1;
				nextY = headY;
			}			
			else if (this.direction == "left") {
				nextX = headX-1;
				nextY = headY;
			}
			else if (this.direction == "down") {
				nextX = headX;
				nextY = headY + 1;
			}
			else if (this.direction == "up") {
				nextX = headX;
				nextY = headY - 1;
			}

			this.cells.unshift({x:nextX, y:nextY});

			var lastX = Math.round(W/cell_size);
			var lastY = Math.round(H/cell_size);

			if (this.cells[0].x < 0 || this.cells[0].y < 0 || this.cells[0].x > lastX || this.cells[0].y > lastY) {
				game_over = true;
			}
		}
	};

	snake.createSnake();
	function keyPressed(e) {
		console.log("key pressed", e.key);
		if (e.key == "ArrowRight") {
			snake.direction = "right";
		}
		else if (e.key == "ArrowLeft") {
			snake.direction = "left";
		}
		else if (e.key == "ArrowDown") {
			snake.direction = "down";
		}
		else if (e.key == "ArrowUp") {
			snake.direction = "up";
		}
	}
	document.addEventListener('keydown', keyPressed);
	
}

function draw() {
	/* pen.clearRect(0,0,W,H)
	pen.fillRect(snake.x, snake.y, snake.w, snake.h);
	pen.fillStyle = "Red"; */
	pen.clearRect(0,0,W,H);
	snake.drawSnake();

	pen.fillStyle = food.color;
	pen.drawImage(food_img, food.x*cell_size, food.y*cell_size, cell_size, cell_size);

	pen.drawImage(tropy_img, 18, 20, cell_size, cell_size);
	pen.fillStyle = "red";
	pen.font = "20px Roboto";
	pen.fillText(score, 45, 50);
}

function update() {
	/* snake.x += snake.speed;
	if(snake.x>W-snake.w || snake.x < 0) {
		snake.speed *= -1;
	} */

	snake.movesnake();

}

function getRandomFood() {
	var foodX = Math.round(Math.random()*(W-cell_size)/cell_size);
	var foodY = Math.round(Math.random()*(H-cell_size)/cell_size);

	var food = {
		x:foodX,
		y:foodY,
		color:"red",
	}
	return food;
}

function gameLoop() {
	if(game_over == true) {
		clearInterval(move);
		alert("Game Over");
		return;
	}
	console.log("in gameLoop")
	draw();
	update();
}

init();
var move = setInterval(gameLoop, 100);

