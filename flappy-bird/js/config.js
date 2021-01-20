var CANVAS_WIDTH = 400;
var CANVAS_HEIGHT = 600;

var GROUND_HEIGHT = 112;
var PLATFORM_HEIGHT = CANVAS_HEIGHT - GROUND_HEIGHT;

var MIN_PIPE_HEIGHT = 150;
var MAX_PIPE_HEIGHT = 250;
var PIPE_GAP = 100;
var PIPE_SPAWN_TIME = 200;

var BIRD_LEFT_OFFSET = 40;

var GRAVITY = 0.2;
var LIFT = 5;

var sprite = new Image();
sprite.src = './assets/images/sprite.png';
