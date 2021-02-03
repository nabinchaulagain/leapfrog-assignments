class Enum {
  /**
   * @param {string} id - id of element
   * @param {Object} schema - hyperparam schema
   */
  constructor(id, schema) {
    if (!schema.defaultIdx) {
      schema.defaultIdx = 0;
    }
    this.value = schema.defaultIdx;
    this.init(id, schema.default, schema.options);
  }

  /**
   *
   * @param {string} id - id of element
   * @param {number} defaultIdx - which index should be selected by default
   * @param {number[]} options - options list
   */
  init(id, defaultIdx, options) {
    this.select = document.createElement('select');
    this.select.id = id;
    let html = '';
    for (let i = 0; i < options.length; i++) {
      html += `<option value="${i}" ${i === defaultIdx ? 'selected' : ''}>${options[i]}</option>`;
    }
    this.select.innerHTML = html;
  }

  addChangeListener(cb) {
    this.select.addEventListener('change', (ev) => {
      this.value = parseInt(ev.target.value);
      cb();
    });
  }

  attach(parent) {
    parent.appendChild(this.select);
  }
}

export default Enum;
