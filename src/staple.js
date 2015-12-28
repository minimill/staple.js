(function(global) {
  'use strict';

  function StapleException(message) {
    this.message = message;
    this.name = 'StapleException';
  }

  function _injectStyle(top, stapledClass, mobileWidth) {
    var css =
      '.' + stapledClass + ' {\n' +
      '  position: fixed;\n' +
      '  top: ' + top + 'px; }\n' +
      '@media screen and (max-width: ' + mobileWidth + 'px) {' +
      '  .' + stapledClass + ' {\n' +
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

  function Staple(options) {
    var opts = options || {};
    this.settings = {
      stapleId: opts.stapleId || 'staple',
      wrapperId: opts.wrapperId || 'staple-wrapper',
      offset: opts.offset || 0,
      stapledClass: opts.stapledClass || 'stapled',
      mobileWidth: opts.mobileWidth || 640,
    };
    this.staple = document.getElementById(this.settings.stapleId);
    this.wrapper = document.getElementById(this.settings.wrapperId);
    this.inRAF = false;
    this.lastYOffset = 0;

    if (!this.staple) {
      throw new StapleException('No staple element with ID ' + this.settings.stapleId);
    }

    if (!this.wrapper) {
      throw new StapleException('No wrapper element with ID ' +
                             this.settings.wrapperId);
    }

    _injectStyle(this.settings.offset, this.settings.stapledClass, this.settings.mobileWidth);
    return this;
  }

  Staple.prototype._staple = function() {
    this.staple.className += ' ' + this.settings.stapledClass + ' ';
  };

  Staple.prototype._unStaple = function() {
    this.staple.className = this.staple.className.replace(' ' + this.settings.stapledClass, '');
  };

  Staple.prototype.getOnScroll = function() {
    var _this = this;
    var onScroll = function() {
      _this.lastYOffset = window.pageYOffset;
      if (!_this.inRAF) {
        _this.inRAF = true;
        window.requestAnimationFrame(function() {
          if (_this.wrapper.offsetTop <= _this.settings.offset + _this.lastYOffset) {
            if (!_hasClass(_this.staple, _this.settings.stapledClass)) {
              _this._staple();
            }
          } else {
            _this._unStaple();
          }
          _this.inRAF = false;
        });
      }
    };
    return onScroll;
  };

  Staple.prototype.enable = function() {
    this.onScroll = this.getOnScroll();
    window.addEventListener('scroll', this.onScroll);
  };

  Staple.prototype.disable = function() {
    this._unStaple();
    window.removeEventListener('scroll', this.onScroll);
  };

  if (typeof define === 'function' && define.amd) {
    define(Staple);
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = Staple;
  } else {
    global.Staple = Staple;
  }

}(this));
