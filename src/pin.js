(function(global) {
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

  Pin.prototype._pin = function() {
    this.pin.className += ' ' + this.settings.pinnedClass;
  };

  Pin.prototype._unPin = function() {
    this.pin.className = this.pin.className.replace(' ' + this.settings.pinnedClass, '');
  };

  Pin.prototype.getOnScroll = function() {
    var _this = this;
    var onScroll = function() {
      window.requestAnimationFrame(function() {
        if (_this.wrapper.getBoundingClientRect().top <= _this.settings.offset) {
          if (!_hasClass(_this.pin, _this.settings.pinnedClass)) {
            _this._pin();
          }
        } else {
          _this._unPin();
        }
      });
    };
    return onScroll;
  };

  Pin.prototype.enable = function() {
    this.onScroll = this.getOnScroll();
    window.addEventListener('scroll', this.onScroll);
  };

  Pin.prototype.disable = function() {
    this._unPin();
    window.removeEventListener('scroll', this.onScroll);
  };

  if (typeof define === 'function' && define.amd) {
    define(Pin);
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = Pin;
  } else {
    global.Pin = Pin;
  }

}(this));
