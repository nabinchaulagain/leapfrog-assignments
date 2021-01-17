# Carousel with hold and transition time

## Usage

- Download the [carousel.js file](https://github.com/nabinchaulagain/leapfrog-assignments/image-carousel-2/js/carousel.js) and link it.
- Maintain the following html structure in your document.
  ```html
  <div class="carousel-container">
    <div class="carousel-image-wrapper">
      <img src="" alt="Image" />
      <img src="" alt="Image" />
      <img src="" alt="Image" />
    </div>
  </div>
  ```
- In your script file put the following code.

```js
var carousel = new Carousel(
  document.querySelector('.carousel-container'), //container element
  document.querySelector('.carousel-image-wrapper'), //wrapper element
  transitionTime, //transistion time for sliding in ms (defaults to 2000)
  holdTime, // hold time in ms (defaults to 1000)
  width, // width of image in px (defaults to 600)
  height //height of image in px (defaults to 400)
);

carousel.show();
```
