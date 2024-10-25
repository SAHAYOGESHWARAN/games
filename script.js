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
let isGamePaused = false;
let score = 0;
let keys = {};
let trafficLightState = 'green'; // Traffic light state: green, yellow, red
let lightChangeInterval;
let bgMusic = document.getElementById("bgMusic");

// Event Listeners for Game Controls
document.getElementById("startGame").addEventListener("click", startOrResumeGame);
document.getElementById("pauseGame").addEventListener("click", pauseGame);

function startOrResumeGame() {
    if (!isGameRunning) {
        startGame();
    } else if (isGamePaused) {
        resumeGame();
    }
    bgMusic.play(); // Play background music
}

function startGame() {
    isGameRunning = true;
    isGamePaused = false;
    score = 0;
    obstacles = [];
    gameInterval = setInterval(updateGameArea, 20);
    lightChangeInterval = setInterval(changeTrafficLight, 3000); // Change light every 3 seconds
    document.getElementById("score").innerText = "0";
}

function resumeGame() {
    if (isGamePaused) {
        isGamePaused = false;
        gameInterval = setInterval(updateGameArea, 20);
    }
}

function pauseGame() {
    if (isGameRunning && !isGamePaused) {
        isGamePaused = true;
        clearInterval(gameInterval);
        clearInterval(lightChangeInterval);
        bgMusic.pause(); // Pause background music
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
    if (trafficLightState === 'green' || trafficLightState === 'yellow') { // Allow movement on green and yellow light
        if (keys["ArrowLeft"] && car.x > 0) {
            car.x -= car.speed;
        }
        if (keys["ArrowRight"] && car.x < canvas.width - car.width) {
            car.x += car.speed;
        }
    }
}

document.addEventListener("keydown", function (event) {
    keys[event.code] = true;
});

document.addEventListener("keyup", function (event) {
    keys[event.code] = false;
});

function generateObstacles() {
    if (Math.random() < 0.02) {
        let obstacleX = Math.random() * (canvas.width - 40);
        obstacles.push({ x: obstacleX, y: 0, width: 40, height: 80 });
    }
}

function moveObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].y += obstacleSpeed;
    }
    obstacles = obstacles.filter(obstacle => obstacle.y < canvas.height);
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
    document.getElementById("score").innerText = score;
}

function gameOver() {
    clearInterval(gameInterval);
    clearInterval(lightChangeInterval);
    bgMusic.pause();
    isGameRunning = false;
    isGamePaused = false;
    alert("Game Over! Your final score is: " + score);
}

// Traffic Light Logic
function changeTrafficLight() {
    const trafficLight = document.getElementById("trafficLight");
    if (trafficLightState === 'green') {
        trafficLightState = 'yellow';
        setActiveLight('yellow');
    } else if (trafficLightState === 'yellow') {
        trafficLightState = 'red';
        setActiveLight('red');
    } else {
        trafficLightState = 'green';
        setActiveLight('green');
    }
}

function setActiveLight(color) {
    document.querySelectorAll('.light').forEach(light => light.classList.remove('active'));
    document.querySelector(`.light.${color}`).classList.add('active');
}
