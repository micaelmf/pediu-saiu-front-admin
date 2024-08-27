/**
 * Listen to click outside event
 */

/**
 * Class definition
 */

export default class OnClickOutside {
  constructor(element, callback) {
    this.element = element;
    this.callback = callback;

    // make a event handler for click event
    this.evt = function (e) {
      var itsChildren = element.contains(e.target);
      if (e.target != element && !itsChildren) {
        return callback ? callback(e.target) : null;
      }
    };

    this.bind();
  }

  bind() {
    document.addEventListener('click', this.evt, false);
  }

  unbind() {
    document.removeEventListener('click', this.evt, false);
  }
}
