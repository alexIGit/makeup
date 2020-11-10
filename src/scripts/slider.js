'use strict';

export default class Slider {
  constructor(selector) {
    this.name = selector;
    this.selector = selector;
    this.slider = document.getElementById(selector);
    this.container = this.slider.querySelector('[data-slider=container]');
    this.items = [...this.container.children];
    this.arrowLeft = this.slider.querySelector('[data-slider=arrow--prev]');
    this.arrowRight = this.slider.querySelector('[data-slider=arrow--next]');
    this.shiftItems = 0;
    this.widthContainer;
    this.widthItem;
  }
}

function __moveSliderOnClick(direction) {
  // console.log(`shiftItems start: ${this.shiftItems}`);
  // console.log(`widthContainer: ${this.widthContainer}`);

  let containerCoords = this.container.getBoundingClientRect()
    , containerCoordLeft= containerCoords.left
    , containerCoordRight= containerCoords.right

    , itemFirst = this.items[0]
    , itemLast = this.items[this.items.length - 1]

    , itemFirstCoordLeft = itemFirst.getBoundingClientRect().left
    , itemLastCoordRight = itemLast.getBoundingClientRect().right

    , isNeedMovingToRight = containerCoordLeft > itemFirstCoordLeft
    , isNeedMovingToLeft = containerCoordRight < itemLastCoordRight
  ;

  if (direction == 'left' && isNeedMovingToRight) {
    this.shiftItems = this.shiftItems + this.widthItem;
    this.items.forEach((item) => {
      item.style.transform = `translateX(${this.shiftItems}px)`;
    });
  }

  if (direction == 'right' && isNeedMovingToLeft) {
    this.shiftItems = this.shiftItems - this.widthItem;
    this.items.forEach((item) => {
      item.style.transform = `translateX(${this.shiftItems}px)`;
    });
  }

  if (!isNeedMovingToRight) {
    this.arrowLeft.style.display = 'none';
  } else {
    this.arrowLeft.style.display = 'inline-block';
  }

  if (!isNeedMovingToLeft) {
    this.arrowRight.style.display = 'none';
  } else {
    this.arrowRight.style.display = 'inline-block';
  }
  // console.log(`shiftItems finish: ${this.shiftItems}`);
  // console.log('----------')
}

Slider.prototype.__checkNeedToResponsive = function checkNeedToResponsive() {
  const widthContainer = this.container.clientWidth
    , widthItem = this.items[0].offsetWidth // 5 - min margin beetwen items
  ;

  this.widthContainer = widthContainer;
  this.widthItem = widthItem;

  let widthItems = this.items.length * widthItem;

  if (widthItems > widthContainer) {
    return true;
  } else {
    return false;
  }
};

Slider.prototype.__move = function moveSlider() {
  this.arrowLeft.addEventListener(
      'click', __moveSliderOnClick.bind(this, 'left'));
  this.arrowRight.addEventListener(
      'click', __moveSliderOnClick.bind(this, 'right'));
};

Slider.prototype.__doResponse = function doResponseSlider() {
  if (!this.__checkNeedToResponsive()) {
    this.slider.classList.remove('slider--responsive');
    return false;
  }

  this.slider.classList.add('slider--responsive');
  this.__move();
  return true;
};


Slider.prototype.init = function initSlider() {
  this.__doResponse();
  window.addEventListener('resize', this.__doResponse.bind(this));
};
