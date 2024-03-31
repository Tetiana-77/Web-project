var myGamePiece;
var myObstacles = [];
var myScore;
var bonusScore = 0;
var myBonuses = [];
var gameResults = [];
var topResultsDiv = document.getElementById("topResults");
var bottomResultsDiv = document.getElementById("bottomResults");

function loadGame() {
    myGameArea.setup();

}
function startGame() {
    document.getElementById("startButton").style.display = "none";
    myGamePiece = new component(30, 30, "red", 10, 120);
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    myGameArea.start();
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    setup: function () {
        var gameDiv = document.getElementById("gameArea");
        gameDiv.appendChild(this.canvas);

        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
    },
    start: function () {
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
        restartButton.style.display = "block";
        this.context.fillStyle = "black";
        this.context.font = "30px Consolas";
        this.context.fillText("Game Over", 150, 150);
        gameOver();
        loadGameResults();
    }
}
function restartGame() {
    restartButton.style.display = "none";
    myGameArea.clear();
    myObstacles = [];
    myBonuses = [];
    bonusScore = 0;
    myScore = 0;
    startGame();
}
function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.crashWith = function (otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var boundaryLeft = new component(1, myGameArea.canvas.height, "transparent", 0, 0);
    var boundaryRight = new component(1, myGameArea.canvas.height, "transparent", myGameArea.canvas.width - 1, 0);
    var boundaryTop = new component(myGameArea.canvas.width, 1, "transparent", 0, 0);
    var boundaryBottom = new component(myGameArea.canvas.width, 1, "transparent", 0, myGameArea.canvas.height - 1);

    //check for collision with canvas borders
    if (myGamePiece.crashWith(boundaryLeft) || myGamePiece.crashWith(boundaryRight) ||
        myGamePiece.crashWith(boundaryTop) || myGamePiece.crashWith(boundaryBottom)) {
        myGameArea.stop();
        return;
    }
    //check for collision with obstacles
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    myGameArea.clear();
    myGameArea.frameNo += 1;
    //generate components
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        myObstacles.push(new component(10, height, "green", x, 0));
        myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
        generateBonus();
    }

    updateObstacles()
    updateBonuses()
    checkCollision();
    myScore.text = "SCORE: " + Math.floor((myGameArea.frameNo + bonusScore) / 10);
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
}

function updateObstacles() {
    for (var i = 0; i < myObstacles.length; i++) {
        myObstacles[i].speedX = -1;
        myObstacles[i].newPos();
        myObstacles[i].update();
    }
}

function updateBonuses() {
    for (var i = 0; i < myBonuses.length; i++) {
        myBonuses[i].speedX = -1;
        myBonuses[i].newPos();
        myBonuses[i].update();
    }
}

function generateBonus() {
    var x = myGameArea.canvas.width;
    var bonusX, bonusY;
    do {
        bonusX = x;
        bonusY = Math.floor(Math.random() * (myGameArea.canvas.height - 10));
    } while (checkOverlap(bonusX, bonusY, 10, 10)); // check for overlap with other components
    // Add a new bonus component in yellow color
    myBonuses.push(new component(10, 10, "yellow", bonusX, bonusY));
}
function checkCollision() {
    // check for collision with obstacle components
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            return;
        }
    }
    // check for collision with bonus components
    for (i = 0; i < myBonuses.length; i += 1) {
        if (myGamePiece.crashWith(myBonuses[i])) {
            bonusScore += 100;
            console.log(bonusScore)
            myBonuses.splice(i, 1);
        }
    }
}
// check for overlap
function checkOverlap(x, y, width, height) {
    for (var i = 0; i < myObstacles.length; i++) {
        if (x < myObstacles[i].x + myObstacles[i].width &&
            x + width > myObstacles[i].x &&
            y < myObstacles[i].y + myObstacles[i].height &&
            y + height > myObstacles[i].y) {
            return true;
        }
    }
    return false;
}
function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) { return true; }
    return false;
}

function moveup() {
    myGamePiece.speedY = -1;
}

function movedown() {
    myGamePiece.speedY = 1;
}

function moveleft() {
    myGamePiece.speedX = -1;
}

function moveright() {
    myGamePiece.speedX = 1;
}

function clearmove() {
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}

function saveGameResults() {
    localStorage.setItem("gameResults", JSON.stringify(gameResults));
}

// Save game results when the game ends
function gameOver() {
    gameResults.push(Math.floor((myGameArea.frameNo + bonusScore) / 10));
    saveGameResults();
}

function displayGameResults() {
    var sortedResults = gameResults.sort((a, b) => b - a);
    var topResults = sortedResults.slice(0, 3);
    var bottomResults = sortedResults.slice(-3);

    var topList = topResultsDiv.querySelector("ol") || topResultsDiv.appendChild(document.createElement("ol"));
    topList.innerHTML = "";

    var bottomList = bottomResultsDiv.querySelector("ol") || bottomResultsDiv.appendChild(document.createElement("ol"));
    bottomList.innerHTML = "";

    //display top 3
    topResults.forEach((result) => {
        var resultItem = document.createElement("li");
        resultItem.textContent = result;
        topList.appendChild(resultItem);
    });

    //display bottom 3
    bottomResults.forEach((result) => {
        var resultItem = document.createElement("li");
        resultItem.textContent = result;
        bottomList.appendChild(resultItem);
    });
}

function loadGameResults() {
    var savedResults = localStorage.getItem("gameResults");
    if (savedResults) {
        gameResults = JSON.parse(savedResults);
        displayGameResults();
    }
}

loadGameResults();