/**
 * @param {number} x
 * @returns sigmoid activation of x
 */
export function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

/**
 * @param {number} x
 * @returns derivative of sigmoid of x
 */
export function sigmoidPrime(x) {
  return sigmoid(x) * sigmoid(1 - x);
}
