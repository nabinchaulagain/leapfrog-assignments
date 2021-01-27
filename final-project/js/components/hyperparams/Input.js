class Input {
  constructor(id, schema) {
    if (schema.default === undefined) {
      schema.default = 0;
    }
    this.value = schema.default;
    this.init(id, schema.type, schema.range, schema.default);
  }

  init(id, type, range, def) {
    this.input = document.createElement('input');
    this.input.setAttribute('id', id);
    this.input.setAttribute('type', type);
    def && this.input.setAttribute('value', def);
    if (range) {
      this.range = range;
      range.min && this.input.setAttribute('min', range.min);
      range.max && this.input.setAttribute('max', range.max);
      range.step && this.input.setAttribute('step', range.step);
    }
  }

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

  addChangeListener(cb) {
    this.input.addEventListener('change', (ev) => {
      this.value = parseFloat(ev.target.value);
      cb();
    });
  }

  attach(parent) {
    parent.appendChild(this.input);
  }
}

export default Input;
