import { camelCaseToWord, strArrayToSentence } from '../utils/misc.js';
import HyperParameter from './hyperparams/HyperParameter.js';

/** represents a list of hyperparameters */
class HyperParameterList {
  /**
   * @param {HTMLElement} rootElem
   * @param {Object} hyperParams
   */
  constructor(root, hyperParams) {
    this.root = root;
    this.container = document.createElement('div');
    this.container.classList.add('hyperparams-container');
    this.el = document.createElement('ul');
    this.el.classList.add('hyperparam-list');
    this.initChildren(hyperParams);
    root.appendChild(this.container);
  }

  /**
   * initialize li's of hyper paramters
   * @param {Object} hyperParams
   */
  initChildren(hyperParams) {
    this.list = [];
    this.values = {};
    this.errors = {};
    this.errorEl = null;
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
    this.container.appendChild(this.el);
  }

  /** show errors on each hyperparameter */
  showErrors() {
    if (!this.hasErrors()) {
      if (this.errorEl) {
        this.container.removeChild(this.errorEl);
        this.errorEl = null;
      }
      return;
    }
    if (!this.errorEl) {
      this.errorEl = document.createElement('div');
      this.errorEl.classList.add('error');
      this.container.appendChild(this.errorEl);
    }
    this.errorEl.innerText = strArrayToSentence(this.getErrors());
  }

  /**
   * returns array of errors
   * @returns {string[]} array of error messages
   */
  getErrors() {
    const errors = Object.values(this.errors).filter((err) => err);
    return errors;
  }

  /**
   * returns whether or not any hyperparmater has any errors
   * @returns {boolean} boolean indicating whether any hyperparameter has any error or not
   */
  hasErrors() {
    const errors = this.getErrors();
    return errors.length !== 0;
  }

  /**
   *  validate each of the hyperparameters on the plot data
   * @param {number[][]} data - 2d array of points
   */
  validateData(data) {
    let hasError = false;
    for (const hParam of this.list) {
      if (!hParam.dataValidator) {
        continue;
      }
      const error = hParam.dataValidator(data, hParam.el.value);
      if (error) {
        hasError = true;
        this.errors[hParam.key] = `${camelCaseToWord(hParam.key)} ${error}`;
      }
    }
    hasError && this.showErrors();
  }
}

export default HyperParameterList;
