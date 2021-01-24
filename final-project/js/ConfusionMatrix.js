class ConfusionMatrix {
  constructor(root) {
    this.root = root;
    this.initData();
    this.table = document.createElement('table');
    this.table.classList.add('confusion-matrix');
    this.render();
    this.root.appendChild(this.table);
  }

  initData() {
    this.min = 0;
    this.matrix = [
      [0, 0],
      [0, 0],
    ];
    this.max = 0;
  }

  update(labels, predictions) {
    this.initData();
    for (let i = 0; i < labels.length; i++) {
      const label = labels[i];
      const prediction = predictions[i];
      this.matrix[prediction][label]++;
    }
    this.min = Math.min(
      this.matrix[0][0],
      this.matrix[0][1],
      this.matrix[1][0],
      this.matrix[1][1]
    );
    this.max = Math.max(
      this.matrix[0][0],
      this.matrix[0][1],
      this.matrix[1][0],
      this.matrix[1][1]
    );
    this.render();
  }
  render() {
    const tds = [];
    for (let i = 0; i < this.matrix.length; i++) {
      tds.push([]);
      for (let j = 0; j < this.matrix[0].length; j++) {
        const val = this.matrix[i][j];
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
