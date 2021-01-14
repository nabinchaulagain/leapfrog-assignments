var points = [
  { x: 10, y: 20 },
  { x: 200, y: 40 },
  { x: 60, y: 20 },
  { x: 50, y: 100 },
  { x: 400, y: 200 },
  { x: 450, y: 300 },
  { x: 70, y: 320 },
  { x: 120, y: 120 },
  { x: 150, y: 80 },
];

var graph = document.querySelector(".graph");

function initializePoints(points) {
  points.forEach((point) => {
    var pointElement = document.createElement("div");
    attachStyles(pointElement, point);
    pointElement.addEventListener("click", handlePointClick);
    graph.appendChild(pointElement);
  });
}

function attachStyles(pointElement, point) {
  pointElement.style.width = POINT_SIZE;
  pointElement.style.height = POINT_SIZE;
  pointElement.style.borderRadius = "100%";
  pointElement.style.background = POINT_COLOR;
  pointElement.style.left = point.x + "px";
  pointElement.style.bottom = point.y + "px";
  pointElement.style.position = "absolute";
}

function handlePointClick(ev) {
  graph.removeChild(ev.target);
}

initializePoints(points);
