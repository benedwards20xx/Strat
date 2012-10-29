var canvas = document.getElementsByTagName( 'canvas' )[ 0 ];
var context = canvas.getContext( '2d' );
var loop;

var W = 1200, H = 600;
var EDGE_RESTRICT = 60;

var numPlayers = 2;
var numBasePerPlayer = 2;
var startUnits = 10;
var playerColors = [ "blue", "red", 'green', 'orange' ];
var maxUnitsPerBase = 50;

//object for each player base, should be in order of players, 
//ie. first in array is player 1, second is player 2, etc.
var playerBases = [];
//base scores (or units, whatever)
var baseUnits = [];

function base(units, maxUnits, x, y, color) {
    this.units = units;
    this.maxUnits = maxUnits;
    this.x = x;
    this.y = y;
    this.color = color;

    /*function setPosition(x, y) {
        this.x = x;
        this.y = y;

    }
    function draw() {
        context.strokeStyle = this.color;
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, 30, 0, Math.PI * 2);
        context.closePath();
        context.stroke();
        context.fill();
    }*/
}

function drawCircle(x, y, inColor, outColor) {
    context.fillStyle = inColor;
    context.lineWidth = '5';
    context.strokeStyle = 'black';
    context.beginPath();
    context.arc(x, y, 30, 0, Math.PI * 2);
    context.closePath();
    context.stroke();
    context.fill();
}

function setupPlayerBases() {
    for (var i = 0; i < numPlayers; i++) {
        playerBases[i] = new Array(numBasePerPlayer);
    }

    for (var i = 0; i < numPlayers; i++) {
        for (var j = 0; j < playerBases[i].length; j++) {
            var randX = Math.floor(Math.random() * (W - EDGE_RESTRICT * 2));
            var randY = Math.floor(Math.random() * (H - EDGE_RESTRICT * 2));
            var baseX = randX + EDGE_RESTRICT;
            var baseY = randY + EDGE_RESTRICT;
            playerBases[i][j] = new base(startUnits, maxUnitsPerBase, baseX, baseY, playerColors[i]);
            var tBase = playerBases[i][j];
            drawCircle(tBase.x, tBase.y, tBase.color, tBase.color);
            
            context.font = '12pt Helvetica';
            context.fillText(tBase.units, tBase.x - 10, tBase.y + 50);
        }
    }
}

function drawBases() {
    for (var i = 0; i < numPlayers; i++) {
        for (var j = 0; j < playerBases[i].length; j++) {
            var tBase = playerBases[i][j];
            drawCircle(tBase.x, tBase.y, tBase.color, tBase.color);
            
            context.font = '12pt Helvetica';
            context.fillStyle = tBase.color;
            context.fillText(tBase.units, tBase.x - 10, tBase.y + 50);
        }
    }
}

function game() {
    //drawBackground();
    context.clearRect(0, 0, W, H);

    context.save();

    setupPlayerBases();

    context.restore();
}

function gameLoop() {
    for (var i = 0; i < numPlayers; i++) {
        for (var j = 0; j < playerBases[i].length; j++) {
            var tBase = playerBases[i][j];
            if (tBase.units < tBase.maxUnits) {
                tBase.units++;
            } 
        }
    }
    context.clearRect(0, 0, W, H);
    drawBases();
}

game();
loop = setInterval(gameLoop, 1000);