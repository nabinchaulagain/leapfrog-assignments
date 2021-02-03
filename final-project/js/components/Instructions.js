class Instructions {
  /**
   * @param {HTMLElement} root - root container
   */
  constructor(root) {
    this.root = root;
    this.init();
  }

  /** intialize element and container */
  init() {
    this.el = document.createElement('div');
    this.el.classList.add('instructions-container');
    this.el.innerHTML = `
    <div class="instructions">
    <div class="right close-icon">&times;</div>
    <h1>Instructions</h1>
      <ul>
        <li>Click on the canvas to draw points. left click draws a red point (class 0) and right click draws a green point (class 1).</li>
        <li>Once you feel like you have enough points, choose an algorithm and click on the train and visualize button.</li>
        <li>That's it! Now you can see the colored decision boundary of the selected algorithm as well as metrics to evaluate the results.</li>
        <li class="instruction-note">Note: you dont need to manually draw points, you can also upload or generate a dataset.</li>
      </ul>
    </div>
    `;
    this.container = this.el.querySelector('.instructions');
  }

  /** show intructions on DOM */
  show() {
    this.root.appendChild(this.el);
    this.setPosition();
    this.addEventListeners();
  }

  /** add resize and click handlers */
  addEventListeners() {
    this.resizeHandler = this.setPosition.bind(this);
    window.addEventListener('resize', this.resizeHandler);
    const closeIcon = this.el.querySelector('.close-icon');
    const closeHandler = (ev) => {
      if (ev.target === this.el || ev.target === closeIcon) {
        //if clicked outside the information box or on the close icon
        this.destroy();
      }
    };
    this.closeHandler = closeHandler.bind(this);
    document.addEventListener('click', this.closeHandler);
  }

  /** align the container properly */
  setPosition() {
    this.container.style.left =
      (window.innerWidth - this.container.clientWidth) / 2 + 'px'; //center horizontally
    this.container.style.top =
      (window.innerHeight - this.container.clientHeight) / 4 + 'px'; //align vertically with a margin of about 25% from top
  }

  /** remove element from DOM and remove all event listeners used by component */
  destroy() {
    document.removeEventListener('click', this.closeHandler);
    window.removeEventListener('resize', this.resizeHandler);
    this.el.parentNode.removeChild(this.el);
  }
}

export default Instructions;
