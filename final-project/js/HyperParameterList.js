class HyperParameterList {
  constructor(rootElem, hyperParams) {
    this.el = document.createElement('ul');
    this.el.classList.add('hyperparam-list');
    this.initChildren(hyperParams);
    rootElem.appendChild(this.el);
  }

  initChildren(hyperParams) {
    for (const key in hyperParams) {
      const hyperParamSchema = hyperParams[key];
      const hyperParam = new HyperParameter(key, hyperParamSchema);
      this.el.appendChild(hyperParam.li);
    }
  }
}

class HyperParameter {
  constructor(key, hyperParamSchema) {
    this.li = document.createElement('li');
    this.li.innerHTML = `<label for="${key}">${key}</label>`;
    let child;
    switch (hyperParamSchema.type) {
      case HYPER_PARAM_TYPES.ENUM:
        child = new Enum(key, hyperParamSchema);
        break;
      case HYPER_PARAM_TYPES.NUMBER:
        child = new Input(key, hyperParamSchema);
        break;
      case HYPER_PARAM_TYPES.RANGE:
        child = new Input(key, hyperParamSchema);
        break;
    }
    child.attach(this.li);
  }
}

class Input {
  constructor(id, schema) {
    this.init(id, schema.type, schema.range, schema.default);
  }

  init(id, type, range, def) {
    this.input = document.createElement('input');
    this.input.setAttribute('id', id);
    this.input.setAttribute('type', type);
    def && this.input.setAttribute('value', def);
    if (range) {
      range.min && this.input.setAttribute('min', range.min);
      range.max && this.input.setAttribute('max', range.max);
      range.step && this.input.setAttribute('step', range.step);
    }
  }

  attach(parent) {
    parent.appendChild(this.input);
  }
}

class Enum {
  constructor(id, schema) {
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

  attach(parent) {
    parent.appendChild(this.select);
  }
}
