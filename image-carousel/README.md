# Carousel with hold and transition time

## Usage

- Download the [carousel.js file](https://github.com/nabinchaulagain/leapfrog-assignments/tree/master/image-carousel/js/carousel.js) and link it.
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
  document.querySelector('.carousel-image-wrapper') //wrapper element
);

carousel.show();
```
