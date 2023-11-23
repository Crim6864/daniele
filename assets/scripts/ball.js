// Setting the 2d field and color.
const WIDTH = 500,
    HEIGHT = 500,
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

canvas.width = WIDTH;
canvas.height = HEIGHT;
canvas.style.background = "#123456";

// Variables for the blocks / game
var blockArr = [],
    blockIndex = 0,
    numBlockCol = 7,
    numBlockRow = 4,
    colWidth = WIDTH / numBlockCol,
    padding = colWidth / 4,
    isGameOver;

// Block Properties
var blockProp = {
    w: colWidth,
    h: padding
};

// Player Properties
var playerProp = {
    x: (WIDTH / 2 - colWidth / 2),
    y: (HEIGHT - 1.5 * padding),
    w: colWidth,
    h: padding
};

// Ball Properties
var ballProp = {
    x: WIDTH / 2,
    y: HEIGHT / 2,
    radius: padding / 3
};

InitializeBlocks();

// New player
var player = new Player(playerProp.x, playerProp.y, playerProp.w, playerProp.h);

// New Ball
var ball = new Ball(ballProp.x, ballProp.y, ballProp.radius);

// Initialize the blocks
function InitializeBlocks() {
    for (let i = 1; i < numBlockCol; i++) {
        for (let j = 0; j < numBlockRow; j++) {
            blockArr[blockIndex] = new Block(padding / 2 + (i) * (colWidth) - colWidth / 2, colWidth + j * (colWidth - 2 * padding), blockProp.w - padding, blockProp.h, true);
            blockIndex++;
        }
    }
}

// Block function
function Block(x, y, width, height, isShow) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.isShow = isShow;
}

// Display the Block
function DisplayBlock() {
    blockArr.forEach((b) => {
        if (b.isShow) {
            context.beginPath();
            context.fillStyle = '#E15517';
            context.fillRect(b.x, b.y, b.width, b.height);
            context.closePath();
        }
    });
}

// Player function
function Player(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.lifeCount = 3; // How many lifes you have
    this.xDirSpeed = 0;
}

// Draw the Player
Player.prototype.drawPlayer = function () {
    context.beginPath();
    context.fillStyle = '#9EE117';
    context.fillRect(this.x, this.y, this.width, this.height);
    context.closePath();
};

// Ball function
function Ball(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.xDirSpeed = Math.random() < 0.5 ? 2 : -2;
    this.yDirSpeed = Math.random() < 0.5 ? 2 : -3;
}

// Draw the ball
Ball.prototype.drawBall = function () {
    context.beginPath();
    context.fillStyle = '#e3f245';
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
};

// Ball updates
Ball.prototype.updateBall = function (playerObj) {
    this.x += this.xDirSpeed;
    this.y += this.yDirSpeed;

    // Check if the ball hits left or right or the top of the canvas
    if (this.x - this.radius < 0) {
        this.xDirSpeed = -this.xDirSpeed;
    }
    else if (this.x + this.radius > WIDTH) {
        this.xDirSpeed = -this.xDirSpeed;
    }
    else if (this.y - this.radius < 0) {
        this.yDirSpeed = -this.yDirSpeed;
    }

    // Check Player Colision
    if (this.x + this.radius > playerObj.x && this.x - this.radius < (playerObj.x + playerObj.width) && this.y + this.radius > (HEIGHT - 1.5 * padding)) {
        this.yDirSpeed = -this.yDirSpeed;
        this.y += this.yDirSpeed;
        this.xDirSpeed += Math.floor(playerObj.xDirSpeed / 3) + 1;
    }

    // Check if there is no colision
    if ((this.x + this.radius < playerObj.x || (this.x + this.radius) > (playerObj.x + playerObj.width)) && this.y + this.radius > HEIGHT) {
        playerObj.lifeCount--;
        if (playerObj.lifeCount <= 0) {
            document.getElementById('gameover').innerHTML = 'Game Over!!!';
            document.getElementById('liferemaining').innerHTML = playerObj.lifeCount;
            isGameOver = true;
        }
        else {
            this.x = WIDTH / 2;
            this.y = HEIGHT / 2;
            this.xDirSpeed = Math.random() < 0.5 ? 2 : -2;
            this.yDirSpeed = Math.random() < 0.5 ? 2 : -3;
        }
    }
};

// Draws the Game
function drawGame() {
    DisplayBlock();
    player.drawPlayer();
    ball.drawBall();
}

// Update Game
function updateGame() {
    ball.updateBall();
}

// Ball animation / check game
function animateGame() {
    context.clearRect(0, 0, WIDTH, HEIGHT);
    drawGame();
    if (!isGameOver && !isLevelCompleted) {
        updateGame();
    }  

    requestAnimationFrame(animateGame);
}

drawGame();