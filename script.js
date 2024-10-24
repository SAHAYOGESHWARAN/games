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
let gameInterval;
let isGameRunning = false;

document.getElementById("startGame").addEventListener("click", startGame);

function startGame() {
    if (!isGameRunning) {
        isGameRunning = true;
        gameInterval = setInterval(updateGameArea, 20);
    }
}

function updateGameArea() {
    clearCanvas();
    moveCar();
    drawCar();
    generateObstacles();
    drawObstacles();
    checkCollision();
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
    // Logic for generating obstacles
}

function drawObstacles() {
    // Logic for drawing obstacles
}

function checkCollision() {
    // Logic for checking collision between car and obstacles
}