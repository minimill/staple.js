(function(global) {
  'use strict';

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
      console.error('No staple element with ID ' + this.settings.stapleId);
    }

    if (!this.wrapper) {
      console.error('No wrapper element with ID ' + this.settings.wrapperId);
    }

    _injectStyle(this.settings.offset, this.settings.stapledClass, this.settings.mobileWidth);
    return this;
  }

  Staple.prototype._staple = function() {
    if (!_hasClass(this.staple, this.settings.stapledClass)) {
      this.staple.className += ' ' + this.settings.stapledClass + ' ';
    }
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
          if (_this.lastYOffset >= _this.lastWrapperOffset -  _this.settings.offset) {
            _this._staple();
          } else {
            _this._unStaple();
          }
          _this.inRAF = false;
        });
      }
    };
    return onScroll;
  };

  Staple.prototype.getOnResize = function() {
    var _this = this;
    var onResize = function() {
      _this.lastWrapperOffset = window.pageYOffset + _this.wrapper.getBoundingClientRect().top;
    };
    return onResize;
  };

  Staple.prototype.enable = function() {
    this.onScroll = this.getOnScroll();
    this.onResize = this.getOnResize();
    this.onResize();
    this.onScroll();
    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.onResize);
  };

  Staple.prototype.disable = function() {
    this._unStaple();
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
  };

  if (typeof define === 'function' && define.amd) {
    define(Staple);
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = Staple;
  } else {
    global.Staple = Staple;
  }

}(this));
