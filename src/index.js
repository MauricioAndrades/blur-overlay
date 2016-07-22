(function ($) {
  'use strict';

  var showing;
  var showDeferred;
  var hideDeferred;

  $.widget('custom.blurOverlay', {

    /*
    * Default options
    */
    options: {
      // Set to true to show the overlay on init
      autoShow: false,
      // Default content to display
      content: '<h1>Hello, blur overlay!</h1>',
      // Amount of pixels to blur by
      blurAmount: '12px'
    },

    /*
    * The "constructor"
    */
    _create: function () {
      showing = false;
      showDeferred = null;
      hideDeferred = null;
      this._initWrapper();
      this._initContent();
      this._initOverlay();
      this._initEvents();
      if (this.options.autoShow) {
        this.show();
      }
    },

    /*
    * Show the overlay
    */
    show: function () {
      showDeferred = $.Deferred();
      if (!showing) {
        this._beforeShow();
      }
      showing = true;
      return showDeferred.promise();
    },

    /*
    * Hide the overlay
    */
    hide: function () {
      hideDeferred = $.Deferred();
      if (showing) {
        this._beforeHide();
      }
      showing = false;
      return hideDeferred.promise();
    },

    /*
    * Update the contents of the overlay
    */
    content: function (newContent) {
      var isFunction = typeof newContent === 'function';
      this.options.content = isFunction ? newContent() : newContent;
      this.$content.html(this.options.content);
    },

    /*
    * Return true if overlay is showing, false otherwise
    */
    isShowing: function () {
      return showing;
    },

    /*
    * Destroy the plugin instance and clean up the DOM
    */
    // destroy: function () {
    //   this.element.unwrap();
    //   this.$overlay.remove();
    //   this.element.data('custom-blurOverlay', null);
    //   $('body').css('overflow', 'auto');
    // },

    /*
    * Private methods
    */

    _initWrapper: function () {
      this.$wrapper = $('<div>').attr('class', 'blur-overlay-wrapper');
      this.$wrapper.css({
        '-webkit-filter': 'blur(0px)',
        filter: 'blur(0px)',
        '-webkit-transition': '-webkit-filter 300ms linear, filter 300ms linear',
        transition: '-webkit-filter 300ms linear, filter 300ms linear'
      });
      this.element.wrapAll(this.$wrapper);
      this.$wrapper = this.element.closest('.blur-overlay-wrapper').first();
    },

    _initContent: function () {
      this.$content = $('<div>').attr('class', 'blur-overlay-content');
      this.$content.append(this.options.content);
      this.$content.hide();
    },

    _initOverlay: function () {
      this.$overlay = $('<div>').attr('class', 'blur-overlay-overlay');
      this.$overlay.css({
        'z-index': 1000,
        opacity: 0,
        '-webkit-transition': 'opacity 300ms linear',
        transition: 'opacity 300ms linear'
      });
      this.$overlay.appendTo('body');
      this.$overlay.append(this.$content);
    },

    _initEvents: function () {
      this.$overlay.on('transitionend webkitTransitionEnd', function () {
        if (!showing) {
          this._afterHide();
        } else {
          this._afterShow();
        }
      }.bind(this));
    },

    _beforeShow: function () {
      this.element.trigger($.Event('blurOverlay.beforeShow'));
      $('body').css('overflow', 'hidden');
      setTimeout(function () {
        this.$wrapper.css({
          '-webkit-filter': 'blur(' + this.options.blurAmount + ')',
          filter: 'blur(' + this.options.blurAmount + ')'
        });
        this.$overlay.css({
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          opacity: 1
        });
        this.$content.show();
      }.bind(this), 0);
      // this.$overlay.css({
      //   position: 'absolute',
      //   top: 0,
      //   bottom: 0,
      //   left: 0,
      //   right: 0
      //   // opacity: 1
      // });
      // setTimeout(function () {
      //   this.$wrapper.addClass('active');
      //   this.$overlay.addClass('active');
      //   this.$content.show();
      // }.bind(this), 0);
    },

    _afterShow: function () {
      this.element.trigger($.Event('blurOverlay.show'));
      showDeferred.resolve(true);
    },

    _beforeHide: function () {
      this.element.trigger($.Event('blurOverlay.beforeHide'));
      $('body').css('overflow', 'auto');
      setTimeout(function () {
        this.$wrapper.css({
          '-webkit-filter': 'blur(0px)',
          filter: 'blur(0px)'
        });
        this.$overlay.css({
          opacity: 0
        });
        // this.$wrapper.removeClass('active');
        // this.$overlay.removeClass('active');
      }.bind(this), 0);
    },

    _afterHide: function () {
      this.$overlay.css('position', 'relative');
      this.$content.hide();
      this.element.trigger($.Event('blurOverlay.hide'));
      hideDeferred.resolve(true);
    }

  });
}(jQuery));
