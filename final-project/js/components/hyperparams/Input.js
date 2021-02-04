class Input {
  /**
   * @param {string} id - id of element
   * @param {Object} schema - hyperparam schema
   */
  constructor(id, schema) {
    if (schema.default === undefined) {
      schema.default = 0;
    }
    this.value = schema.default;
    this.init(id, schema.type, schema.range, schema.default);
  }

  /**
   * initialize input element
   * @param {string} id - id of element
   * @param {string} type - input type
   * @param {Object} range - range of input
   * @param {number} def - default value
   */
  init(id, type, range, def) {
    this.input = document.createElement('input');
    this.input.setAttribute('id', id);
    this.input.setAttribute('type', type);
    def !== undefined && this.input.setAttribute('value', def);
    if (range) {
      this.range = range;
      range.min && this.input.setAttribute('min', range.min);
      range.max && this.input.setAttribute('max', range.max);
      range.step && this.input.setAttribute('step', range.step);
    }
  }

  /** validate input based on min and max constraints defined in schema*/
  validate() {
    if (isNaN(this.value)) {
      return 'should be a number';
    }
    if (this.range) {
      const { min, max } = this.range;
      if (min !== undefined && this.value < min) {
        return `should be greater than ${min}`;
      } else if (max !== undefined && this.value > max) {
        return `should be less than ${max}`;
      }
    }
  }

  /**
   * attach listener to change event
   * @param {function} cb
   */
  addChangeListener(cb) {
    this.input.addEventListener('change', (ev) => {
      this.value = parseFloat(ev.target.value);
      cb();
    });
  }

  /**
   * attach to parent element
   * @param {HTMLElement} parent
   */
  attach(parent) {
    parent.appendChild(this.input);
  }
}

export default Input;
