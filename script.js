const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let car = {
    x: 180,
    y: 500,
    width: 40,
    height: 80,
    speed: 5
};

let obstacles = [];
let obstacleSpeed = 2;
let gameInterval;
let isGameRunning = false;
let score = 0;

document.getElementById("startGame").addEventListener("click", startGame);

function startGame() {
    if (!isGameRunning) {
        isGameRunning = true;
        score = 0;
        obstacles = [];
        gameInterval = setInterval(updateGameArea, 20);
    }
}

function updateGameArea() {
    clearCanvas();
    moveCar();
    drawCar();
    generateObstacles();
    moveObstacles();
    drawObstacles();
    checkCollision();
    updateScore();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawCar() {
    ctx.fillStyle = "blue";
    ctx.fillRect(car.x, car.y, car.width, car.height);
}

function moveCar() {
    document.addEventListener("keydown", function (event) {
        if (event.code === "ArrowLeft" && car.x > 0) {
            car.x -= car.speed;
        }
        if (event.code === "ArrowRight" && car.x < canvas.width - car.width) {
            car.x += car.speed;
        }
    });
}

function generateObstacles() {
    if (Math.random() < 0.02) {  // Generate a new obstacle occasionally
        let obstacleX = Math.random() * (canvas.width - 40);
        obstacles.push({ x: obstacleX, y: 0, width: 40, height: 80 });
    }
}

function moveObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].y += obstacleSpeed;
    }
    obstacles = obstacles.filter(obstacle => obstacle.y < canvas.height);  // Remove off-screen obstacles
}

function drawObstacles() {
    ctx.fillStyle = "red";
    for (let i = 0; i < obstacles.length; i++) {
        ctx.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);
    }
}

function checkCollision() {
    for (let i = 0; i < obstacles.length; i++) {
        if (car.x < obstacles[i].x + obstacles[i].width &&
            car.x + car.width > obstacles[i].x &&
            car.y < obstacles[i].y + obstacles[i].height &&
            car.height + car.y > obstacles[i].y) {
            gameOver();
        }
    }
}

function updateScore() {
    score++;
    document.getElementById("score").innerText = "Score: " + score;
}

function gameOver() {
    clearInterval(gameInterval);
    isGameRunning = false;
    alert("Game Over! Your final score is: " + score);
}
