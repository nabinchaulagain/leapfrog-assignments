import { camelCaseToWord, strArrayToSentence } from '../utils/misc.js';
import HyperParameter from './hyperparams/HyperParameter.js';

/** represents a list of hyperparameters */
class HyperParameterList {
  /**
   * @param {HTMLElement} rootElem
   * @param {Object} hyperParams
   */
  constructor(rootElem, hyperParams) {
    this.rootElem = rootElem;
    this.el = document.createElement('ul');
    this.el.classList.add('hyperparam-list');
    this.initChildren(hyperParams);
    rootElem.appendChild(this.el);
  }

  /**
   * initialize li's of hyper paramters
   * @param {Object} hyperParams
   */
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

  /** show errors on each hyperparameter */
  showErrors() {
    if (!this.hasErrors()) {
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
