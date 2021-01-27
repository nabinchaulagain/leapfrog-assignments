/** Represents a min-max scaler*/
class Scaler {
  /**
   * @param {number} min
   * @param {number} max
   */
  constructor(min, max) {
    this.min = min;
    this.max = max;
  }

  /**
   * returns scaled value between 0-1
   * @param {number} x
   * @returns {number} scaled value between 0 and 1
   */
  scaleSingle(x) {
    return [
      (x[0] - this.min[0]) / (this.max[0] - this.min[0]),
      (x[1] - this.min[1]) / (this.max[1] - this.min[1]),
    ];
  }

  /**
   * returns array of values scaled in range 0-1
   * @param {number[]} X
   * @returns {number[]} array of scaled values
   */
  scale(X) {
    const scaled = [];
    for (let i = 0; i < X.length; i++) {
      const x = X[i];
      scaled[i] = this.scaleSingle(x);
    }
    return scaled;
  }
}

export default Scaler;
