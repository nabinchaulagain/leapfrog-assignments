var box = document.querySelector(".box");
var ball = document.querySelector(".ball");

var y = 0.1;
var speed = 5;

function animate() {
  if (y <= 0 || y >= 436) {
    speed = -speed;
  }
  y += speed;
  ball.style.top = y + "px";
  requestAnimationFrame(animate);
}
animate();
