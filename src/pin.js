(function(window) {
  'use strict';

  function PinException(message) {
    this.message = message;
    this.name = 'PinException';
  }

  function _injectStyle(top, pinnedClass, mobileWidth) {
    var css =
      '.' + pinnedClass + ' {\n' +
      '  position: fixed;\n' +
      '  top: ' + top + 'px; }\n' +
      '@media screen and (max-width: ' + mobileWidth + 'px) {' +
      '  .' + pinnedClass + ' {\n' +
      '    position: relative;\n' +
      '    top: auto; } }';
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
  }

  function _hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
  }

  function Pin(options) {
    var opts = options || {};
    this.settings = {
      pinId: opts.pinId || 'pin',
      wrapperId: opts.wrapperId || 'pin-wrapper',
      offset: opts.offset || 0,
      pinnedClass: opts.pinnedClass || 'pinned',
      mobileWidth: opts.mobileWitdth || 640,
    };
    this.pin = document.getElementById(this.settings.pinId);
    this.wrapper = document.getElementById(this.settings.wrapperId);

    if (!this.pin) {
      throw new PinException('No pin element with ID ' + this.settings.pinId);
    }

    if (!this.wrapper) {
      throw new PinException('No wrapper element with ID ' +
                             this.settings.wrapperId);
    }

    _injectStyle(this.settings.offset, this.settings.pinnedClass, this.settings.mobileWidth);
    return this;
  }

  Pin.prototype.enable = function() {
    var _this = this;

    var onScroll = function() {
      if (_this.wrapper.getBoundingClientRect().top <= _this.settings.offset) {
        if (!_hasClass(_this.pin, _this.settings.pinnedClass)) {
          _this.pin.className += ' ' + _this.settings.pinnedClass;
        }
      } else {
        _this.pin.className = _this.pin.className.replace(' ' + _this.settings.pinnedClass, '');
      }
    };

    window.addEventListener('scroll', onScroll);
  };

  window.Pin = Pin;

}(window));
