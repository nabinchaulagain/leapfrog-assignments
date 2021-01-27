class Matrix {
  /**
   * @param {number[][]} data
   */
  constructor(data) {
    this.data = data;
    this.shape = [this.data.length, this.data[0].length];
  }

  /**
   * generate random matrix
   * @param {number} rows - no. of rows
   * @param {number} cols - no. of columns
   * @param {number} min - minimum value of random number
   * @param {number} min - maximum value of random number
   */
  static randomMatrix(rows, cols, min = -1, max = 1) {
    return Matrix.generateMatrix(rows, cols, () => random(min, max));
  }

  /**
   * generate random matrix
   * @param {number} rows - no. of rows
   * @param {number} cols - no. of columns
   */
  static zeros(rows, cols) {
    return Matrix.generateMatrix(rows, cols, () => 0);
  }

  /**
   * generate matrix based on generate function
   * @param {number} rows - no. of rows
   * @param {number} cols - no. of columns
   * @param {function} generateFn - element generation function
   */
  static generateMatrix(rows, cols, generateFn) {
    const data = [];
    for (let i = 0; i < rows; i++) {
      data[i] = [];
      for (let j = 0; j < cols; j++) {
        data[i][j] = generateFn();
      }
    }
    return new Matrix(data);
  }

  /**
   * returns transpose of matrix
   * @returns {Matrix} transpose of this matrix
   */
  transpose() {
    const newData = [];
    const [rows, cols] = this.shape;
    for (let i = 0; i < cols; i++) {
      newData[i] = [];
      for (let j = 0; j < rows; j++) {
        newData[i][j] = this.data[j][i];
      }
    }
    return new Matrix(newData);
  }

  /**
   *  returns dot product of 2 matrices
   * @param {Matrix} mat - matrix to multiply with
   * @returns {Matrix} dot product of this matrix and mat
   */
  dot(mat) {
    const [row1, col1] = this.shape;
    const [row2, col2] = mat.shape;
    if (col1 !== row2) {
      throw new Error(`Can't multiply ${row1} X ${col1} and ${row2} X ${col2}`);
    }
    const newData = [];
    for (let i = 0; i < row1; i++) {
      newData[i] = [];
      for (let j = 0; j < col2; j++) {
        let val = 0;
        for (let k = 0; k < col1; k++) {
          val += this.data[i][k] * mat.data[k][j];
        }
        newData[i][j] = val;
      }
    }
    return new Matrix(newData);
  }

  /**
   * return matrix of element wise operations between 2 matrices
   * @param {Matrix} mat - operand matrix
   * @param {function} operation - operation
   * @returns {Matrix} matrix whose each element is the value returned by operation function on elements on first and second matrix respectively
   */
  elementWiseOperation(mat, operation) {
    const [row1, col1] = this.shape;
    const [row2, col2] = mat.shape;
    if (row1 !== row2 || col1 !== col2) {
      throw new Error(
        `Dimensions(${row1} X ${col1} and ${row2} X ${col2}) are unequal`
      );
    }
    const newData = [];
    for (let i = 0; i < row1; i++) {
      newData[i] = [];
      for (let j = 0; j < col1; j++) {
        newData[i][j] = operation(this.data[i][j], mat.data[i][j]);
      }
    }
    return new Matrix(newData);
  }

  /**
   * return hadamard product of 2 matrices
   * @param {Matrix} mat - operand matrix
   * @returns {Matrix} resultant matrix of element-wise multiplication between this matrix and mat
   */
  multiply(mat) {
    return this.elementWiseOperation(mat, (val1, val2) => val1 * val2);
  }

  /**
   * return element wise addition of 2 matrices
   * @param {Matrix} mat - operand matrix
   * @returns {Matrix} resultant matrix of element-wise addition between this matrix and mat
   */
  add(mat) {
    return this.elementWiseOperation(mat, (val1, val2) => val1 + val2);
  }

  /**
   * return element wise difference of 2 matrices
   * @param {Matrix} mat - operand matrix
   * @returns {Matrix} resultant matrix of element-wise difference between this matrix and mat
   */
  subtract(mat) {
    return this.elementWiseOperation(mat, (val1, val2) => val1 - val2);
  }

  /**
   * return maximum value array
   * @returns {number[]} maximum values of each row
   */
  max() {
    const maxArr = this.getExtreme(Number.MIN_VALUE, (data, max) => data > max);
    return maxArr;
  }

  /**
   * return minimum value array
   * @returns {number[]} minimum values of each row
   */
  min() {
    const maxArr = this.getExtreme(Number.MAX_VALUE, (data, max) => max > data);
    return maxArr;
  }

  /**
   * returns min or max values array
   * @returns {number[]} min/max of each row
   */
  getExtreme(defaultVal, compareFn) {
    const [rows, cols] = this.shape;
    const resArr = new Array(cols).fill(defaultVal);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (compareFn(this.data[i][j], resArr[j])) {
          resArr[j] = this.data[i][j];
        }
      }
    }
    return resArr;
  }

  /**
   * apply a function to each element in matrix
   * @param {function} func
   * @returns {Matrix} matrix containing the results of func being applied to each element in the matrix
   */
  applyFunc(func) {
    const newData = this.data.map((row) => row.map((data) => func(data)));
    return new Matrix(newData);
  }

  /**
   *  return matrix after given scalar addition
   * @param {number} scalar
   * @returns {Matrix} new matrix
   */
  scalarAddition(scalar) {
    return this.applyFunc((data) => data + scalar);
  }

  /**
   * return scalar multiplication of matrix with scalar
   * @param {number} scalar - multiplier
   * @returns {Matrix} scalar product result
   */
  scalarMultiply(scalar) {
    return this.applyFunc((data) => data * scalar);
  }

  /**
   * returns a matrix with a inserted a row in this matrix
   * @param {number[]} val
   * @returns {Matrix} matrix with inserted row at the end
   */
  insertRow(val) {
    const newData = this.clone().data;
    newData.push(val);
    return new Matrix(newData);
  }

  /**
   * returns a matrix with column inserted
   * @param {number | number[]} val
   * @returns {Matrix} matrix with column inserted at the beginning
   */
  insertCol(val) {
    const newData = this.clone().data;
    for (let i = 0; i < newData.length; i++) {
      if (Array.isArray(val)) {
        newData[i].unshift(val[i]);
      } else {
        newData[i].unshift(val);
      }
    }
    return new Matrix(newData);
  }

  /**
   * returns copy of matrix
   * @returns {Matrix} clone of this matrix
   */
  clone() {
    const clonedData = this.data.map((row) => [...row]);
    return new Matrix(clonedData);
  }
  /**
   * return number or 1d array
   * @returns {number|number[]} number or vectors
   */
  flatten() {
    const [rows, cols] = this.shape;
    if (rows === 1 && cols === 1) {
      return this.data[0][0];
    } else if (rows === 1) {
      return this.data[0];
    } else if (cols === 1) {
      return this.data.map((row) => row[0]);
    }
    throw new Error(`Can't flatten ${rows} X ${cols}`);
  }

  /** print matrix */
  print() {
    console.table(this.data);
  }
}
