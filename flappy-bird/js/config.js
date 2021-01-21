var CANVAS_WIDTH = 400;
var CANVAS_HEIGHT = 600;

var GROUND_HEIGHT = 112;
var PLATFORM_HEIGHT = CANVAS_HEIGHT - GROUND_HEIGHT;

var MIN_PIPE_HEIGHT = 150;
var MAX_PIPE_HEIGHT = 250;
var PIPE_GAP = 100;
var PIPE_SPAWN_TIME = 200; // spawn pipes every 'PIPE_SPAWN_TIME' frame

var BIRD_LEFT_OFFSET = 40;

var GRAVITY = 0.2;
var LIFT = 4.5;

var SCORE_UPDATE_INTERVAL = 1000;

var BIRD_UPDATE_TIME = 10; // update bird image every 'BIRD_UPDATE_TIME' frame

var START_SC = {
  sX: 0,
  sY: 228,
  width: 172,
  height: 152,
  dX: 114,
  dY: 80,
};

var END_SC = {
  sX: 175,
  sY: 228,
  width: 225,
  height: 200,
  dX: 90,
  dY: 90,
};

var sprite = new Image();
sprite.src = './assets/images/sprite.png';

var playBtn = new Image();
playBtn.src = './assets/images/play-btn.png';
var playBtnPos = {
  sX: 0,
  sY: 0,
  sWidth: 55,
  sHeight: 32,
  dX: 145,
  dY: 240,
  dWidth: 110,
  dHeight: 64,
};
