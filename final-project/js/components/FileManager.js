import { readFile } from '../utils/file.js';
import { UPLOAD_MAX_SIZE } from '../constants.js';
import Matrix from '../utils/Matrix.js';

class FileManager {
  /**
   * @param {HTMLElement} container
   */
  constructor(container) {
    this.container = container;
    this.initButtons();
    this.attachButtons();
    this.errorEl = null;
  }

  /** add upload and download buttons */
  initButtons() {
    this.buttonsContainer = document.createElement('div');
    this.buttonsContainer.classList.add('file-btns');
    //download button
    this.saveBtn = document.createElement('button');
    this.saveBtn.classList.add('file-btn', 'btn', 'btn-red');
    this.saveBtn.innerHTML = 'Download data';
    //upload field
    this.uploadField = document.createElement('input');
    this.uploadField.setAttribute('type', 'file');
    this.uploadField.setAttribute('accept', '.json');
    this.uploadBtn = document.createElement('button');
    this.uploadBtn.classList.add('file-btn', 'btn', 'btn-yellow');
    this.uploadBtn.innerHTML = 'Upload ';
    //emulate a click on the actual input field by clicking on the button
    this.uploadBtn.addEventListener('click', () => {
      this.uploadField.click();
    });
  }

  /** add buttons to dom */
  attachButtons() {
    this.buttonsContainer.appendChild(this.saveBtn);
    this.buttonsContainer.appendChild(this.uploadBtn);
    this.container.appendChild(this.buttonsContainer);
  }

  /** add click listener to download button */
  addDownloadListeners(cb) {
    this.saveBtn.addEventListener('click', cb);
  }

  /** add change listener to upload button */
  addUploadListener(cb) {
    this.uploadField.addEventListener('change', async (ev) => {
      this.clearError();
      const file = ev.target.files[0];
      const hasError = this.validateUpload(file);
      if (hasError) {
        return;
      }
      const text = await readFile(ev.target.files[0]);
      const hasFileContentError = this.validateUploadContent(text);
      if (hasFileContentError) {
        return;
      }
      cb(JSON.parse(text));
    });
  }

  /**
   * validate uploaded file
   * @param {Blob} file
   * @returns {boolean} whether or not file has any error
   */
  validateUpload(file) {
    if (file.type !== 'application/json') {
      this.showError('File must be in json format');
      return true;
    }
    if (file.size >= UPLOAD_MAX_SIZE) {
      this.showError('File should be less than 1Mb');
      return true;
    }
    return false;
  }

  /**
   * validate file content
   * @param {text} content - raw string content of file
   * @returns {boolean} whether or not file content is correct
   */
  validateUploadContent(content) {
    let hasError = false;
    try {
      const { labels, features } = JSON.parse(content);
      if (
        !Matrix.isVector(labels) ||
        !Matrix.isMatrix(features) ||
        labels.length !== features.length
      ) {
        hasError = true;
      }
    } catch (err) {
      hasError = true;
    }
    if (hasError) {
      this.showError('File content is in incorrect format');
    }
    return hasError;
  }

  /** remove error message from screen */
  clearError() {
    if (this.errorEl) {
      this.container.removeChild(this.errorEl);
      this.errorEl = null;
    }
  }

  /**
   * show error
   * @param {string} error error message
   */
  showError(error) {
    if (!this.errorEl) {
      this.errorEl = document.createElement('div');
      this.errorEl.classList.add('error');
      this.container.appendChild(this.errorEl);
    }
    this.errorEl.innerHTML = error;
  }
}

export default FileManager;
