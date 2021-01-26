class HyperParameterList {
  constructor(rootElem, hyperParams) {
    this.rootElem = rootElem;
    this.el = document.createElement('ul');
    this.el.classList.add('hyperparam-list');
    this.initChildren(hyperParams);
    rootElem.appendChild(this.el);
  }

  initChildren(hyperParams) {
    this.values = {};
    this.errors = {};
    for (const key in hyperParams) {
      const hyperParamSchema = hyperParams[key];
      const hyperParam = new HyperParameter(key, hyperParamSchema);
      this.el.appendChild(hyperParam.li);
      this.values[key] = hyperParam.el.value;
      this.errors[key] = null;
      const handleChange = () => {
        this.values[key] = hyperParam.el.value;
        const errorMsg = hyperParam.el.validate();
        if (errorMsg) {
          this.errors[key] = `${camelCaseToWord(key)} ${errorMsg}`;
        } else {
          this.errors[key] = null;
        }
        this.showErrors();
      };
      hyperParam.el.addChangeListener(handleChange);
    }
  }

  showErrors() {
    const errors = Object.values(this.errors).filter((err) => err);
    if (Object.values(errors).length === 0) {
      if (this.errorEl) {
        this.el.removeChild(this.errorEl);
        this.errorEl = null;
      }
      return;
    }
    if (!this.errorEl) {
      this.errorEl = document.createElement('li');
      this.errorEl.classList.add('error');
      this.el.appendChild(this.errorEl);
    }
    this.errorEl.innerText = Object.values(errors).join(',');
  }
}

class HyperParameter {
  constructor(key, hyperParamSchema) {
    this.li = document.createElement('li');
    this.li.innerHTML = `<label for="${key}">${camelCaseToWord(key)}</label>`;
    switch (hyperParamSchema.type) {
      case HYPER_PARAM_TYPES.ENUM:
        this.el = new Enum(key, hyperParamSchema);
        break;
      case HYPER_PARAM_TYPES.NUMBER:
        this.el = new Input(key, hyperParamSchema);
        break;
      case HYPER_PARAM_TYPES.RANGE:
        this.el = new Input(key, hyperParamSchema);
        break;
    }
    this.el.attach(this.li);
  }
}

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

class Enum {
  constructor(id, schema) {
    if (!schema.defaultIdx) {
      schema.defaultIdx = 0;
    }
    this.init(id, schema.default, schema.options);
  }

  init(id, defaultIdx, options) {
    this.select = document.createElement('select');
    this.select.id = id;
    let html = '';
    for (let i = 0; i < options.length; i++) {
      html += `<option value="${options[i]}" ${
        i === defaultIdx ? 'selected' : ''
      }>${options[i]}</option>`;
    }
    this.select.innerHTML = html;
  }

  addChangeListener(cb) {
    this.select.addEventListener('change', (ev) => {
      this.value = parseFloat(ev.target.value);
      cb();
    });
  }

  attach(parent) {
    parent.appendChild(this.select);
  }
}
