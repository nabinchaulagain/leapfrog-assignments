class Enum {
  constructor(id, schema) {
    if (!schema.defaultIdx) {
      schema.defaultIdx = 0;
    }
    this.value = schema.options[schema.defaultIdx];
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

export default Enum;
