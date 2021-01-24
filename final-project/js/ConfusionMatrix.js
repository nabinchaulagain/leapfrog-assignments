class ConfusionMatrix {
  constructor(root) {
    this.root = root;
    this.matrix = [
      [0, 0],
      [0, 0],
    ];
    this.table = document.createElement('table');
    this.table.classList.add('confusion-matrix');

    this.render();
    this.root.appendChild(this.table);
  }

  update(labels, predictions) {
    this.matrix = [
      [0, 0],
      [0, 0],
    ];
    for (let i = 0; i < labels.length; i++) {
      const label = labels[i];
      const prediction = predictions[i];
      this.matrix[prediction][label]++;
    }
    this.render();
  }
  render() {
    this.table.innerHTML = `
      <thead>
        <th class="empty-column"></th>
        <th>Actual class red</th>
        <th>Actual class green</th>
      </thead>
      <tbody>
        <tr>
          <th>Predicted class red</th>
          <td class="data-column">${this.matrix[0][0]}</td>
          <td class="data-column">${this.matrix[0][1]}</td>
        </tr>
        <tr>
          <th>Predicted class green</th>
          <td class="data-column">${this.matrix[1][0]}</td>
          <td class="data-column">${this.matrix[1][1]}</td>
        </tr>
      </tbody>
    `;
  }
}
