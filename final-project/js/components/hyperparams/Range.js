import Input from './Input.js';
class Range extends Input {
  /**
   * initialize input element
   * @param {string} id - id of element
   * @param {string} type - input type
   * @param {Object} range - range of input
   * @param {number} def - default value
   */
  init(id, type, range, def) {
    super.init(id, type, range, def);
    this.indicator = document.createElement('span'); //span that shows range value
    this.indicator.classList.add('range-indicator');
    this.indicator.innerHTML = this.value;
    this.input.addEventListener(
      'change',
      (ev) => (this.indicator.innerHTML = ev.target.value)
    );
  }
  /**
   * attach to parent element
   * @param {HTMLElement} parent
   */
  attach(parent) {
    parent.appendChild(this.input);
    parent.appendChild(this.indicator);
  }
}

export default Range;
