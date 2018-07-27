(function ($) {
  "use strict"
  
  /**
   * Oops!! No JQuery, I'm out.
   */
  if (!$) {
    return;
  }
  
  /**
   * simplebox is already initialized.
   */
  if ($.fn.simplebox) {
    return;
  }

  /**
   * Defaults options
   */
  var defaults = {
    modalClass: '',
    fadeDuration: 200,
    loading: true,
    slideShow: true,
    infinityLoop: false
  }

  /**
   * Implement slide show function
   * @param {Object} options 
   * @param {JQuery} $items List of JQuery elements of the current gallery
   * @param {JQuery} $current Current JQuery element in the current gallery
   */
  function slideShow(simpleboxRef, options, $items, $current) {
    var disableClass = 'simplebox-disable';

    function updateNavBtn(simpleboxRef, length, rel) {
      rel === 0
        ? simpleboxRef.$back.addClass(disableClass)
        : simpleboxRef.$back.removeClass(disableClass);

      rel === length - 1
        ? simpleboxRef.$next.addClass(disableClass)
        : simpleboxRef.$next.removeClass(disableClass);
    }

    /**
     * update content of the modal
     * @param {number} rel Position of the item in $items, which is used to update simpleboxRef.$modalTarget
     */
    function updateItem(simpleboxRef, options, $items, rel) {
      if (!options.infinityLoop) {
        updateNavBtn(simpleboxRef, $items.length, rel);
      }
      simpleboxRef.$modalTarget.fadeOut({
        duration: 100,
        complete: function() {
          if (options.loading) {
            simpleboxRef.$loader.fadeIn(200);
          }
          simpleboxRef.$modalTarget
            .attr('rel', rel)
            .attr('src', $items[rel].getAttribute('src') || $items[rel].getAttribute('href'));
        }
      });
    }

    simpleboxRef.$next.appendTo(simpleboxRef.$modalContent);
    simpleboxRef.$back.prependTo(simpleboxRef.$modalContent);

    var rel = $items.index($current);
    simpleboxRef.$modalTarget.attr('rel', rel);
    if (!options.infinityLoop) {
      updateNavBtn(simpleboxRef, $items.length, rel);
    }

    simpleboxRef.$next.off('click');
    simpleboxRef.$next.click(function(e) {
      e.preventDefault();
      if (rel === $items.length - 1 && options.infinityLoop) {
        rel = 0;
      } else if (rel === $items.length - 1) {
        return;
      } else {
        rel += 1;
      }
      updateItem(simpleboxRef, options, $items, rel);
    });
    simpleboxRef.$back.off('click');
    simpleboxRef.$back.click(function(e) {
      e.preventDefault();
      if (rel === 0 && options.infinityLoop) {
        rel = $items.length - 1;
      } else if (rel === 0) {
        return;
      } else {
        rel -= 1;
      }
      updateItem(simpleboxRef, options, $items, rel);
    })
  }

  /**
   * initilize dom structure
   * @param {object} options 
   */
  function initialize(options, $items, $current) {
    var simpleboxRef = {
      $modal: $('<div class="simplebox-modal ' + options.modalClass + '" style="display: none;"></div>'),
      $modalContent: $('<div class="simplebox-content"></div>'),
      $modalTarget: $('<img class="simplebox-img" src="" alt="" style="display: none;">'),
      $loader: $('<div class="simplebox-loader" style="display: none;"></div>'),
      $next: options.slideShow
        ? $('<a class="simplebox-nav-btn simplebox-next" href="#"><svg class="simplebox-icon icon-keyboard_arrow_right" viewBox="0 0 24 24">'
          + '<path d="M8.578 16.359l4.594-4.594-4.594-4.594 1.406-1.406 6 6-6 6z"></path>'
          + '</svg></a>')
        : '',
      $back: options.slideShow
        ? $('<a class="simplebox-nav-btn simplebox-back" href="#"><svg class="simplebox-icon icon-keyboard_arrow_left" viewBox="0 0 24 24">'
          + '<path d="M15.422 16.078l-1.406 1.406-6-6 6-6 1.406 1.406-4.594 4.594z"></path>'
          + '</svg></a>')
        : '',
    };
    simpleboxRef.$modalTarget.appendTo(simpleboxRef.$modalContent);
    simpleboxRef.$loader.appendTo(simpleboxRef.$modal);
    simpleboxRef.$modalContent.appendTo(simpleboxRef.$modal);
    if (options.slideShow) {
      slideShow(simpleboxRef, options, $items, $current);
    };
    simpleboxRef.$modal.appendTo('body');

    simpleboxRef.$modal.click(function(e) {
      simpleboxRef.$modal.fadeOut({
        duration: options.fadeDuration,
        complete: function() {
          simpleboxRef.$modal.remove();
        }
      });
      simpleboxRef.$modalTarget.attr('src', '');
    });
    
    simpleboxRef.$modalContent.click(function(e) {
      e.stopPropagation();
    });

    simpleboxRef.$modalTarget.on('load', function() {
      if (options.loading) {
        simpleboxRef.$loader.fadeOut(100);
        simpleboxRef.$modalTarget.fadeIn({
          duration: 200,
          complete: function() {
            simpleboxRef.$modalTarget.removeAttr('style');
          }
        });
      } else {
        simpleboxRef.$modalTarget.fadeIn({
          duration: 200,
          complete: function() {
            simpleboxRef.$modalTarget.removeAttr('style');
          }
        });
      }
    });

    $.simplebox = {};
    $.simplebox.defaults = defaults;
    $.simplebox.$modal = simpleboxRef.$modal;
    $.simplebox.$modalTarget = simpleboxRef.$modalTarget;
    $.simplebox.$loader = simpleboxRef.$loader;
    $.simplebox.$next = simpleboxRef.$next;
    $.simplebox.$back = simpleboxRef.$back;
  };

  /**
   * open the modal
   * @param {Event} e 
   * @param {Object} options 
   */
  function open(e, options, $items, $target) {

    /**
     * This item is already opened by another handler
     */
    if (e && e.isDefaultPrevented()) {
      return;
    };
    e.preventDefault();
    
    initialize(defaults, $items, $target);
    $.simplebox.$modal.fadeIn({
      duration: options.fadeDuration,
      complete: function() {
        $.simplebox.$modalTarget.removeAttr('style');
        options.complete && options.complete();
      } 
    });
    $.simplebox.$modalTarget.attr('src', $target.attr('src') || $target.attr('href'));
    if (options.loading) {
      $.simplebox.$loader.removeAttr('style');
    } else {
      $.simplebox.$modalTarget.removeAttr('style');
    }
    
  };
  
  $.fn.simplebox = function(options) {
    var settings = $.extend(defaults, options);
    var $this = this;
    $this.off('click');
    return $this.click(function(e) {
      open(e, settings, $this, $(e.currentTarget));
    });
  };
  
  $(document).on('click', '[data-simplebox]', function(e) {
    var $target = $(e.currentTarget);
    var value = $target.attr("data-simplebox") || "";
    var $items;

    if (value) {
      $items = $('[data-simplebox="' + value + '"]');
    } else {
      $items = $('[data-simplebox]');
    }

    open(e, defaults, $items, $target);
  });

}(jQuery));
