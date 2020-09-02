// Mingde Yin GOL
// Aug 31, 2020


/*

INIT

*/

const PADDING = 1; // padding between tiles

const GRID_OFFSET = 0; // option to offset the grid
var TILE_SIZE = 20; // size of each tile


var GRID_W;
var GRID_H;

var tiles; // tiles for map

var MODE = 0; // gamestate

var canvas; // canvas itself
var ctx; // context for canvas

var interval; // repetition interval

function startGame() {

    gamediv = document.getElementById("gamediv");

    document.addEventListener("click", mouseClicked); // add event

    canvas = document.createElement("canvas")

    canvas.width = gamediv.offsetWidth - 30; // minus padding
    canvas.height = canvas.width * 3/5;

    gamediv.appendChild(canvas);// put the canvas into our document

    ctx = canvas.getContext("2d"); // sets the ctx variable

    reset();
    draw();
}


// starting/stopping the game
function startstop() {
    MODE = 1-MODE;
    if (MODE == 1) interval = setInterval(draw, parseInt(document.getElementById("timestepNUD").value));
    // creates a routine to run the draw function
    else clearInterval(interval);    
}

function FRChange() {
    startstop();
    startstop();
}

function reset() {
    MODE = 0;

    TILE_SIZE = parseInt(document.getElementById("tileSizeNUD").value);
    GRID_W = Math.floor((canvas.width-2*GRID_OFFSET)/TILE_SIZE);
    GRID_H = Math.floor((canvas.height-2*GRID_OFFSET)/TILE_SIZE);

    tiles = new Array(GRID_W);
    for (var x = 0; x < GRID_W; x++) {
        tiles[x] = new Array(GRID_H);
        for (var y = 0; y < GRID_H; y++) tiles[x][y] = new GTile(x, y, position(x), position(y));
    }
}

// transforms array index to corresponding position on screen
position = (p) => p * (TILE_SIZE + PADDING) + GRID_OFFSET;

/// apply reverse of position formula to construct cell indices
mouseToCell = (n) => (n - GRID_OFFSET) / (TILE_SIZE + PADDING);

function wrap(n, limit) {
  // allows wrap-around access of indices
  if (n >= 0 && n < limit) return n;
  else if (n < 0) return n + limit; // underflow
  else return n - limit; // overflow
}

class GTile {

  constructor(ix, iy, px, py) {
    // constructor
    this.indX = ix;
    this.indY = iy;
    this.posX = px;
    this.posY = py;
    this.alive = false;
    this.nextState = false;
  }

  prepareState() {
    // perform GOL mechanics

    var neighbours = 0;

    // check 8 surrounding cells
    let acX = [-1, 0, 1, -1, 1, -1, 0, 1];
    let acY = [-1, -1, -1, 0, 0, 1, 1, 1];

    for (var i = 0; i < 8; i++) {
      if (tiles[wrap(this.indX + acX[i], GRID_W)][wrap(this.indY + acY[i], GRID_H)].alive) neighbours++;
      // adds to neighbours if tile is alive
    }

    this.nextState = ((neighbours == 2 && this.alive) || neighbours == 3); // set next state
  }

  propagateState() {
    // updates all states after checking
    this.alive = this.nextState;
  }

  update() {
    if (MODE == 1) this.propagateState(); // update, if we're playing

    // draw
    if (this.alive) ctx.fillStyle = "#0ac80a";
    else if (MODE == 1) ctx.fillStyle = "#646464";
    else ctx.fillStyle = "#969696";
    ctx.fillRect(this.posX, this.posY, TILE_SIZE, TILE_SIZE);
  }

  click() {
    if (MODE == 0) this.alive = !this.alive;
  }
}

function mouseClicked(e) {
  var clickX = mouseToCell(e.clientX - canvas.offsetLeft + window.scrollX);
  var clickY = mouseToCell(e.clientY - canvas.offsetTop + window.scrollY);

  if (clickX >= 0 && clickX < GRID_W && clickY >= 0 && clickY < GRID_H) tiles[parseInt(clickX)][parseInt(clickY)].click();

  draw(); // update screen
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clears the canvas for redraw

  if (MODE == 1) {
    // calculate
    for (var x = 0; x < GRID_W; x++) {
      for (var y = 0; y < GRID_H; y++) tiles[x][y].prepareState();
    }
  }

  // draw
  for (var x = 0; x < GRID_W; x++) {
    for (var y = 0; y < GRID_H; y++) tiles[x][y].update();
  }
  
}


function glider(x, y) {
    // creates a glider at upper left coordinates x and y
    tiles[wrap(x+1, GRID_W)][wrap(y, GRID_H)].alive = true;
    tiles[wrap(x+2, GRID_W)][wrap(y+1, GRID_H)].alive = true;
    tiles[wrap(x, GRID_W)][wrap(y+2, GRID_H)].alive = true;
    tiles[wrap(x+1, GRID_W)][wrap(y+2, GRID_H)].alive = true;
    tiles[wrap(x+2, GRID_W)][wrap(y+2, GRID_H)].alive = true;
}

function spaceship(x,y) {
    // creates a spaceship at upper left coordinates x and y

    tiles[wrap(x+1, GRID_W)][wrap(y, GRID_H)].alive = true;
    tiles[wrap(x+2, GRID_W)][wrap(y, GRID_H)].alive = true;
    tiles[wrap(x+3, GRID_W)][wrap(y, GRID_H)].alive = true;
    tiles[wrap(x+4, GRID_W)][wrap(y, GRID_H)].alive = true;

    tiles[wrap(x, GRID_W)][wrap(y+1, GRID_H)].alive = true;
    tiles[wrap(x+4, GRID_W)][wrap(y+1, GRID_H)].alive = true;

    tiles[wrap(x+4, GRID_W)][wrap(y+2, GRID_H)].alive = true;

    tiles[wrap(x, GRID_W)][wrap(y+3, GRID_H)].alive = true;
    tiles[wrap(x+3, GRID_W)][wrap(y+3, GRID_H)].alive = true;
}

function putgliders() {
    // create gliders
    glider(1, 5);
    glider(10, 10);
    glider(17, 14);
    
}

function putspaceships() {
    // create spaceships
    spaceship(5, 1);
    spaceship(4, 16);
    spaceship(12, 19);
}