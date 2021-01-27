import Matrix from '../utils/Matrix.js';

class ConfusionMatrix {
  /**
   * @param {HTMLElement} root - root element
   */
  constructor(root) {
    this.root = root;
    this.initData();
    this.table = document.createElement('table');
    this.table.classList.add('confusion-matrix');
    this.render();
    this.root.appendChild(this.table);
  }

  /** initialize data regarding the confusion matrix */
  initData() {
    this.min = 0;
    this.matrix = Matrix.zeros(2, 2);
    this.max = 0;
  }

  /**
   * update the data based on labels and predictions
   * @param {number[]} labels - actual classes
   * @param {number[]} predictions - predicted classes
   */
  update(labels, predictions) {
    this.initData();
    for (let i = 0; i < labels.length; i++) {
      const label = labels[i];
      const prediction = predictions[i];
      this.matrix.data[prediction][label]++;
    }
    this.min = Math.max(...this.matrix.min()); //get min value from entire matrix
    this.max = Math.max(...this.matrix.max()); //get max value from entire matrix
    this.render();
  }

  /** show the confusion matrix */
  render() {
    const tds = [];
    const [rows, cols] = this.matrix.shape;
    for (let i = 0; i < rows; i++) {
      tds.push([]);
      for (let j = 0; j < cols; j++) {
        const val = this.matrix.data[i][j];
        let style = `background:rgba(10,50,128,${val / this.max});`;
        style += `color:${val / this.max > 0.5 ? '#fff' : '#000'}`;
        const td = `<td class="data-column" style="${
          this.max === this.min ? '' : style
        }">${val}</td>`;
        tds[i][j] = td;
      }
    }
    this.table.innerHTML = `
      <thead>
        <th class="empty-column"></th>
        <th>Actually red</th>
        <th>Actually green</th>
      </thead>
      <tbody>
        <tr>
          <th>Predicted red</th>
          ${tds[0].join('')}
        </tr>
        <tr>
          <th>Predicted green</th>
         ${tds[1].join('')}
        </tr>
      </tbody>
    `;
  }
}

export default ConfusionMatrix;
