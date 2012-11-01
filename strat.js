var canvas = document.getElementsByTagName( 'canvas' )[ 0 ];
var context = canvas.getContext( '2d' );
var loop;

var W = canvas.width, H = canvas.height;
var EDGE_RESTRICT = 60;

//for mouse drag functionality
var drag = false;
//var mouseX, mouseY;
var clickX, clickY;
//mouseX = W / 2;
//mouseY = H / 2;
var mouseBase;
var mousePlayerNum;


var startUnits = 10;
var playerColors = [ "blue", "red", 'green', 'orange' ];
var maxUnitsPerBase = 50;

//object for each player base, should be in order of players, 
//ie. first in array is player 1, second is player 2, etc.
var players = [];
var baseRadius = 20;

function base(units, maxUnits, x, y, color) {
    this.units = units;
    this.maxUnits = maxUnits;
    this.x = x;
    this.y = y;
    this.color = color;
}

function player(numBases, color, unitRate, score) {
    this.numBases = numBases;
    this.color = color;
    this.bases = [numBases];
    this.unitRate = unitRate;
    this.score = 0;
    for (var i = 0; i < numBases; i++) {
        var randX = Math.floor(Math.random() * (W - EDGE_RESTRICT * 2));
        var randY = Math.floor(Math.random() * (H - EDGE_RESTRICT * 2));
        var baseX = randX + EDGE_RESTRICT;
        var baseY = randY + EDGE_RESTRICT;
        this.bases[i] = new base(startUnits * unitRate, maxUnitsPerBase * unitRate, baseX, baseY, this.color);
    }
    //setupBases(this.bases);
}

function drawCircle(x, y, inColor, outColor) {
    context.fillStyle = inColor;
    context.lineWidth = '5';
    context.strokeStyle = 'black';
    context.beginPath();
    context.arc(x, y, baseRadius, 0, Math.PI * 2);
    context.closePath();
    context.stroke();
    context.fill();
}

function setupPlayerBases() {
    console.log('setupPlayerBases');

    for (var i = 0; i < players.length; i++) {
        for (var j = 0; j < players[i].bases.length; j++) {
            var tBase = players[i].bases[j];
            drawCircle(tBase.x, tBase.y, tBase.color, tBase.color);
            
            context.font = '12pt Helvetica';
            context.fillText(tBase.units, tBase.x - 7, tBase.y + 40);
        }
    }
}

function drawBases() {
    console.log('drawBases');
    for (var i = 0; i < players.length; i++) {
        for (var j = 0; j < players[i].bases.length; j++) {
            var tBase = players[i].bases[j];
            drawCircle(tBase.x, tBase.y, tBase.color, tBase.color);
            
            context.font = '12pt Helvetica';
            context.fillStyle = tBase.color;
            context.fillText(tBase.units, tBase.x - 7, tBase.y + 40);
        }
    }
}

function exampleLevel() {
    players[0] = new player(2, playerColors[0], 2, 0);
    players[1] = new player(2, playerColors[1], 1, 0);
}

function game() {
    //drawBackground();
    context.clearRect(0, 0, W, H);

    context.save();

    exampleLevel();

    setupPlayerBases();

    context.restore();
}

function gameLoop() {
    for (var i = 0; i < players.length; i++) {
        for (var j = 0; j < players[i].bases.length; j++) {
            var tBases = players[i].bases;
            var tBase = tBases[j];
            if (tBase.units <= 0) {
                tBases.splice(tBases.indexOf(tBase));
            }
            else if (tBase.units < tBase.maxUnits) {
                tBase.units += players[i].unitRate;
            } 
        }
    }
}

function drawLoop() {
    context.clearRect(0, 0, W, H);
    drawBases();
}

function windowToCanvas(canvas, x, y) {
    var box = canvas.getBoundingClientRect();
    return { x: x - box.left * (canvas.width / box.width), 
             y: y - box.top  * (canvas.height / box.height)
           };
}

canvas.addEventListener('mousedown', function (e) {
    // react to mouse down
    //for (var i = 0; i < players.length; i++) {
        var i = 0;
        if (!drag) {
            for (var j = 0; j < players[i].bases.length; j++) {
                var tBase = players[i].bases[j];
                var dx, dy, dist;
                dx = e.pageX - this.offsetLeft - tBase.x;
                dy = e.pageY - this.offsetTop  - tBase.y;
                dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < baseRadius) {
                    drag = true;
                    mouseBase = tBase;
                    mousePlayerNum = i;
                    clickX = dx;
                    clickY = dy;
                    break;
                } 
                else {
                    drag = false;
                }
            }
        }
    //}
});

canvas.addEventListener('mouseup', function (e) {
    // react to mouse up    
    //var loc = windowToCanvas(canvas, e.clientX, e.clientY);
    if (drag) {
        for (var i = 0; i < players.length; i++) {
            for (var j = 0; j < players[i].bases.length; j++) {
                var tBase = players[i].bases[j];
                var dx, dy, dist;
                dx = e.pageX - this.offsetLeft - tBase.x;
                dy = e.pageY - this.offsetTop  - tBase.y;
                dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < baseRadius && tBase != mouseBase && i != mousePlayerNum) {
                    var numUnitsSent = mouseBase.units / 2;
                    mouseBase.units -= Math.round(numUnitsSent);
                    tBase.units -= Math.round(numUnitsSent);
                } 
                //else {
                    //var numUnitsSent = 2;
                    //tBase.units -= Math.round(numUnitsSent);
                //}
            }
        }
    }
    drag = false;
});

canvas.addEventListener('mousemove', function (event) {
    /*if(drag) {
        x = event.pageX - this.offsetLeft - clickX;
        y = event.pageY - this.offsetTop - clickY;
        draw();
    }*/
});

game();
setInterval(gameLoop, 2000);
setInterval(drawLoop, 1000);