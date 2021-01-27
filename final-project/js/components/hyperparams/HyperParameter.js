import { HYPER_PARAM_TYPES } from '../../constants.js';
import { camelCaseToWord } from '../../utils/misc.js';
import Input from './Input.js';
import Enum from './Enum.js';

class HyperParameter {
  constructor(key, hyperParamSchema) {
    this.key = key;
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
    if (hyperParamSchema.dataValidator) {
      this.dataValidator = hyperParamSchema.dataValidator;
    }
  }
}

export default HyperParameter;
