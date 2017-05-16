document.addEventListener('DOMContentLoaded', introAnimate());

function introAnimate() {
    var open = document.getElementById('intro');
    open.style.display = "block";
    var mario = document.getElementById('char1');
    var goomba = document.getElementById('char2');
    var yoshi = document.getElementById('char3');
    var wario = document.getElementById('char4');
    var luigi = document.getElementById('char5');
    var peach = document.getElementById('char6');
    var toad = document.getElementById('char7');

    TweenMax.to(mario, 5, { x: 300, y: 150, ease: Elastic.easeOut });
    TweenMax.to(goomba, 5, { x: 100, y: 1000, ease: Elastic.easeOut });
    TweenMax.to(yoshi, 5, { x: 70, y: 900, ease: Elastic.easeOut });
    TweenMax.to(wario, 5, { x: 0, y: 190, ease: Elastic.easeOut });
    TweenMax.to(luigi, 5, { x: 10, y: 500, ease: Elastic.easeOut });
    TweenMax.to(peach, 5, { x: -10, y: 800, ease: Elastic.easeOut });
    TweenMax.to(toad, 5, { x: 0, y: 750, ease: Elastic.easeOut });
}

function display() {
    // console.log('displaying');
    var toDisp = document.getElementById('game-wrap');
    var toClose = document.getElementById("intro");
    toDisp.style.display = 'block';
    toClose.style.display = 'none';
}
var $progress = $('.progress'),
    $bg = $('#page-wrap');

var tl = new TimelineLite();


$('a').click(function() {

    CSSPlugin.defaultTranformPerspective = 800;
    TweenLite.lagSmoothing(0); // fixes auto pause problem when browser is not open
    tl.from($bg, 1, { opacity: 0 })
        .from($progress, 30, { scaleX: 0, transformOrigin: 'left', ease: Linear.easeNone }, 0)
        .to($progress, 0.2, { opacity: 0, top: -8 });
});

$('button').click(function() {
    tl.restart();
});


//============ Memory game scripts ===========//

var memArr = ["mario.png", "mario.png", "goomba.png", "goomba.png", "yoshi.png", "yoshi.png", "wario.png", "wario.png", "luigi.png", "luigi.png", "peach.png", "peach.png", "toad.png", "toad.png"];
var memVals = [];
var memTiles = [];
var numFlips = 0;
var timeset;


// shuffling function added to array class for ease access to length and other properties

Array.prototype.shuffle = function() {
    var len = this.length;
    var j, temp;
    // simple swap for shuffling 
    for (var i = 0; i < len; i++) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
};

// sets the cards on to the "playing board"
function setGame() {
    numFlips = 0;
    var board = '';
    memArr.shuffle();
    console.log(memArr);

    for (var i = 0; i < memArr.length; i++) {

        board += '<div id="card_' + i + '" onclick="flipCard(this,\'' + memArr[i] + '\')"></div>';
        // console.log('<div id="tile_' + i + '" onclick="flipCard(this,\'' + memArr[i] + '\')"></div>');
    }
    document.getElementById('memory-board').innerHTML = board;

}

// function to flip cards
function flipCard(card, val) {
    // only run if we have < 2 cards and the cards have yet to be written
    if (card.innerHTML == "" && memVals.length < 2) {

        if (val == "mario.png") {
            card.style.backgroundImage = "url('img/mario-card.jpg')";
        } else if (val == "goomba.png") {
            card.style.backgroundImage = "url('img/goomba-card.jpg')";
        } else if (val == "yoshi.png") {
            card.style.backgroundImage = "url('img/yoshi-card.jpg')";
        } else if (val == "wario.png") {
            card.style.backgroundImage = "url('img/wario-card.jpg')";
        } else if (val == "luigi.png") {
            card.style.backgroundImage = "url('img/luigi-card.jpg')";
        } else if (val == "peach.png") {
            card.style.backgroundImage = "url('img/peach-card.jpg')";
        } else if (val == "toad.png") {
            card.style.backgroundImage = "url('img/toad-card.jpg')";
        }

        // memVals holds positions/vals to all cards faced down
        console.log(memVals);
        if (memVals.length == 0) {
            // no cards yet -- first one about to be chosen
            memVals.push(val);
            memTiles.push(card.id);
            console.log("first: " + memVals);
            console.log("first memTiles: " + memTiles);

            // console.log(card.id);
        } else if (memVals.length == 1) {
            // second card -- check for same cards here
            memVals.push(val);
            memTiles.push(card.id);
            console.log('second: ' + memVals);
            console.log("second memTiles: " + memTiles);


            if (memVals[0] == memVals[1]) {
                console.log("MATCH!!!!");
                numFlips += 2;
                memVals = [];
                memTiles = [];
                if (numFlips === memArr.length) {
                    console.log('player finished');
                    document.getElementById('memory-board').innerHTML = '';
                    // alert("Game finished");
                    endTime();
                    $('#modal-win').modal('show');
                    $('#myModal').modal('hide');
                }
            } else {
                // cards are not the same!
                function flipBack() {
                    console.log("NOT A MATCH!");
                    var t1 = document.getElementById(memTiles[0]);
                    var t2 = document.getElementById(memTiles[1]);
                    t1.style.background = "url('img/mario-logo.jpg') no-repeat";
                    t1.innerHTML = "";
                    t2.style.background = "url('img/mario-logo.jpg') no-repeat";
                    t2.innerHTML = "";

                    memVals = [];
                    memTiles = [];
                }
                setTimeout(flipBack, 800);
            }
        }
    }
}

function startTime() {
    timeset = setTimeout(showModal, 30000);
    // alert('time is up');
}

function endTime() {
    clearTimeout(timeset);
}

function showModal() {
    endTime();
    $('#myModal').modal('show');
}

window.addEventListener('DOMContentLoaded', setGame());
