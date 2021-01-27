import { camelCaseToWord, strArrayToSentence } from '../utils/misc.js';
import HyperParameter from './hyperparams/HyperParameter.js';

class HyperParameterList {
  constructor(rootElem, hyperParams) {
    this.rootElem = rootElem;
    this.el = document.createElement('ul');
    this.el.classList.add('hyperparam-list');
    this.initChildren(hyperParams);
    rootElem.appendChild(this.el);
  }

  initChildren(hyperParams) {
    this.list = [];
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
        if (!hyperParam.el.validate) {
          return;
        }
        const errorMsg = hyperParam.el.validate();
        if (errorMsg) {
          this.errors[key] = `${camelCaseToWord(key)} ${errorMsg}`;
        } else {
          this.errors[key] = null;
        }
        this.showErrors();
      };
      hyperParam.el.addChangeListener(handleChange);
      this.list.push(hyperParam);
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
    this.errorEl.innerText = strArrayToSentence(Object.values(errors));
  }

  hasErrors() {
    const errors = Object.values(this.errors).filter((err) => err);
    return errors.length !== 0;
  }

  validateData(data) {
    for (const hParam of this.list) {
      if (!hParam.dataValidator) {
        continue;
      }
      const error = hParam.dataValidator(data);
      if (error) {
        this.errors[hParam.key] = `${camelCaseToWord(hParam.key)} ${error}`;
      }
    }
    this.showErrors();
  }
}

export default HyperParameterList;
