// Mingde Yin GOL
// Aug 31, 2020


/*

INIT

*/

const TILE_SIZE = 20;
const PADDING = 1;

const GRID_OFFSET = 50;

const GRID_W = 50;
const GRID_H = 30;

var tiles; // tiles for map
var pBtn; // button to play and pause
var rBtn; // button to reset

var MODE = 0;

var mouseX;
var mouseY;

var canvas;
var ctx;


function startGame() {

    document.addEventListener("click", mouseClicked); // add event

    canvas = document.createElement("canvas")
    // this.canvas.width = window.innerWidth * BOARD_SIZE_FACTOR;
    // this.canvas.height = window.innerHeight * BOARD_SIZE_FACTOR;

    canvas.width = 1280
    canvas.height = 720

    document.body.insertBefore(canvas, document.body.childNodes[0]); // put the canvas into our document
    setInterval(draw, 20); // creates a routine to run the draw function

    ctx = canvas.getContext("2d");
    ctx.font = "30px Arial";

    tiles = new Array(GRID_W);

    for (var x = 0; x < GRID_W; x++) {
        tiles[x] = new Array(GRID_H);
        for (var y = 0; y < GRID_H; y++) tiles[x][y] = new GTile(x, y, position(x), position(y));
    }

    // init buttons
    pBtn = new PlayPauseButton(1175, 150, 70);

    rBtn = new ResetButton(1175, 550, 70);

    glider(10, 10);

    glider(17, 14);
    glider(1, 5);

}

function glider(x, y) {
    // creates a glider at upper left coordinates x and y

    tiles[x+1][y].alive = true;
    tiles[x+2][y+1].alive = true;
    tiles[x][y+2].alive = true;
    tiles[x+1][y+2].alive = true;
    tiles[x+2][y+2].alive = true;
}


function position(p) {
  // transforms array index to corresponding position on screen
  return p * (TILE_SIZE + PADDING) + GRID_OFFSET;
}

function inCell(x, y, s) {
  // checks if mouse is in the cell with indices ix, iy
  return mouseX > x && mouseX < x + s && mouseY > y && mouseY < y + s;
}

function mouseToCell(n) {
  /// apply reverse of position formula to construct cell indices
  return (n - GRID_OFFSET) / (TILE_SIZE + PADDING);
}

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
    if (MODE == 0) {
      this.alive = !this.alive;
    }
  }

}

class PlayPauseButton {
  // Serves as the main play/pause button in the game. Also displays text.

  constructor(x, y, s) {
    this.posX = x;
    this.posY = y;
    this.SIZE = s;
  }

  update() {
    // draw

    if (MODE == 0) {
      ctx.fillStyle = "#646464";
      ctx.fillRect(this.posX, this.posY, this.SIZE, this.SIZE);

      ctx.fillStyle = "#ffffff";

      ctx.fillText("Start/Stop", this.posX, this.posY+50);


      //text("Click on the tiles on the grid to birth or kill squares. Then, click the circle to begin.", posX - SIZE/2, posY + SIZE/2, 100, 400);
      //text("Start", posX - SIZE/2, posY- SIZE/2, SIZE, SIZE);
      
    }
    else {
      ctx.fillStyle = "#96c896";
      ctx.fillRect(this.posX, this.posY, this.SIZE, this.SIZE);

      ctx.fillStyle = "#ffffff";
      ctx.fillText("Start/Stop", this.posX, this.posY + 50);
      //text("Simulation Running. To terminate, click the circle.", posX - SIZE/2, posY + SIZE/2, 100, 400);
      //text("Stop", posX - SIZE/2, posY - SIZE/2, SIZE, SIZE);
    }

    
  }

  click() {
    if (inCell(this.posX, this.posY, this.SIZE)) MODE = 1-MODE;
  }
}

class ResetButton {
  // Resets the Game


  constructor(x, y, s) {
    this.posX = x;
    this.posY = y;
    this.SIZE = s;
  }

  update() {
    // draw

    ctx.fillStyle = "#646464";
    ctx.fillRect(this.posX, this.posY, this.SIZE, this.SIZE);

    ctx.fillStyle = "#ffffff";

    ctx.fillText("Reset", this.posX, this.posY + 50);

    //fill(255, 255, 255);
    //text("Reset", posX - SIZE/2, posY- SIZE/2, SIZE, SIZE);
    
  }

  click() {

    if (inCell(this.posX, this.posY, this.SIZE)) {
      MODE = 0;
      for (var x = 0; x < GRID_W; x++) {
        for (var y = 0; y < GRID_H; y++) tiles[x][y].alive = false;
      }

    } 
  }
}

function mouseClicked(e) {
  mouseX = e.clientX - canvas.offsetLeft;
  mouseY = e.clientY - canvas.offsetTop;

  pBtn.click();
  rBtn.click();

  var clickX = mouseToCell(mouseX);
  var clickY = mouseToCell(mouseY);
  if (clickX >= 0 && clickX < GRID_W && clickY >= 0 && clickY < GRID_H) {
      tiles[parseInt(clickX)][parseInt(clickY)].click();
  }

  draw(); // update screen
}




function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clears the canvas for redraw
  //background(60, 60, 60);

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

  pBtn.update();
  rBtn.update();
  
}
