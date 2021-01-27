/**
 * @param {number} x
 * @returns sigmoid activation of x
 */
export function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}
