/** Returns a random integer in a range
 * @param {number} min - minimum number (inclusive)
 * @param {number} max - maximum number (inclusive)
 * @returns {number}
 */
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/** Returns distance between two points
 * @param {number} x1
 * @param {number} x2
 * @param {number} y1
 * @param {number} y2
 * @returns {number}
 */
function distance(x1, x2, y1, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

/**
 * Returns a random color in rgb() style
 * @returns {string}
 */
function randomColor() {
  return (
    "rgb(" + random(0, 255) + "," + random(0, 255) + "," + random(0, 255) + ")"
  );
}
