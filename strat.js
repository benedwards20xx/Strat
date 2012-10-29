var canvas = document.getElementsByTagName( 'canvas' )[ 0 ];
var context = canvas.getContext( '2d' );
var loop;

var W = 1200, H = 600;
var EDGE_RESTRICT = 20;

var numPlayers = 2;
var playerColors = [ "blue", "red" ];
var playerBase = [];

playerBase[0] = 10;
playerBase[1] = 20;

function drawCircle(x, y) {
    context.beginPath();
    context.arc(x, y, 30, 0, Math.PI * 2);
    context.closePath();
    context.stroke();
    context.fill();
}

function drawBackground() {
    context.clearRect(0, 0, WIDTH, HEIGHT);
}

function drawRandomBase() {
    for (var n = 0; n < numPlayers; n++) {
        var randX = Math.floor(Math.random() * (W - EDGE_RESTRICT * 2));
        var randY = Math.floor(Math.random() * (H - EDGE_RESTRICT * 2));
        context.strokeStyle = playerColors[n];
        context.fillStyle = playerColors[n];
        drawCircle(randX, randY);
        context.font = '12pt Helvetica';
        context.lineWidth = '2';
        context.strokeText(playerBase[n], randX - 10, randY + 50);
        context.fillText(playerBase[n], randX - 10, randY + 50);
    }
}

function game() {
    //drawBackground();
    context.clearRect(0, 0, W, H);

    context.save();

    drawRandomBase();
    for (var n = 0; n < numPlayers; n++) {
        playerBase[n]++;
    }

    context.restore();
}

loop = setInterval(game(), 1000);
