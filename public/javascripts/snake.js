function init() {
	const canvas = document.getElementById("gamecanvas");
	W = canvas.width = 500;
	H = canvas.height = 500;
	game_over = false;
	
	pen = canvas.getContext('2d')
	rect = {
		x: 20,
		y: 20,
		w: 40,
		h: 40,
		speed: 10,
	};
	
}

function draw() {
	pen.clearRect(0,0,W,H)
	pen.fillRect(rect.x, rect.y, rect.w, rect.h);
	pen.fillStyle = "Red";
}

function update() {
	rect.x += rect.speed;
	if(rect.x>W-rect.w || rect.x < 0) {
		rect.speed *= -1;
	}
}

function gameLoop() {
	if(game_over == true) {
		clearInterval(move);
	}
	console.log("in gameLoop")
	draw();
	update();
}

init();
var move = setInterval(gameLoop, 100);

