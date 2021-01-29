class Heatmap {
  /**
   * @param {HTMLElement} root - root element
   * @param {string[]} rowHeadings - headings of each row
   * @param {string[]} colHeadings - heading of each column
   */
  constructor(root, rowHeadings, colHeadings) {
    this.rows = rowHeadings.length;
    this.cols = colHeadings.length;
    this.rowHeadings = rowHeadings;
    this.colHeadings = colHeadings;
    this.root = root;
    this.el = document.createElement('table');
    this.el.classList.add('heatmap');

    this.root.appendChild(this.el);
  }

  /**add class to table element
   * @param {string} cls
   */
  addClass(cls) {
    this.el.classList.add(cls);
  }

  /**
   * returns list of table header html strings
   * @returns {string[]} array of table header strings in html format
   */
  getThList() {
    const thList = ['<th class="empty-column"></th>']; // start with a empty column on header row
    for (let i = 0; i < this.cols; i++) {
      const th = `<th>${this.colHeadings[i]}</th>`;
      thList.push(th);
    }
    return thList;
  }

  /**
   * returns list of table row strings in html format
   * @param {Matrix} matrix - matrix containing value of each cell
   * @param {number} min - minimum value
   * @param {max} max - maximum value
   * @param {number[]} - color scheme of heatmap in rgb array
   * @returns {string[]} array of table row strings
   */
  getTrList(matrix, min, max, colorScheme) {
    const trList = [];
    for (let i = 0; i < this.rows; i++) {
      const tdList = [`<th>${this.rowHeadings[i]}</th>`];
      for (let j = 0; j < this.cols; j++) {
        const val = matrix.data[i][j];
        const bgColor = `rgba(${colorScheme.join(',')},${val / max})`;
        const textColor = val / max > 0.5 ? '#fff' : '#000';
        const tdStyle = `background:${bgColor};color:${textColor}`;
        const td = `
          <td class="data-column" style="${max === min ? '' : tdStyle}">
            ${val}
          </td>
        `;
        tdList.push(td);
      }
      const tr = `<tr>${tdList.join('')}</tr>`;
      trList.push(tr);
    }
    return trList;
  }

  /**
   * renders the heatmap
   * @param {Matrix} matrix - matrix containing value of each cell
   * @param {number} min - minimum value
   * @param {max} max - maximum value
   * @param {number[]} - color scheme of heatmap in rgb array
   */
  render(matrix, min = 0, max = 1, colorScheme = [10, 50, 128]) {
    const thList = this.getThList();
    const trList = this.getTrList(matrix, min, max, colorScheme);
    this.el.innerHTML = `
      <thead>
        ${thList.join('')}
      </thead>
      <tbody>
       ${trList.join('')}
      </tbody>
    `;
  }
}

export default Heatmap;
